"use client"
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import ABI from "./ABI";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Initialize RPC endpoint
const web3 = new Web3("https://json-rpc.testnet.swisstronik.com/");

// Register plugin
web3.registerPlugin(new SwisstronikPlugin());

export default function SwisstronikPlayground() {
  const [contractAddress, setContractAddress] = useState("0xb652af511905b871953928a93c1d2e31ad31da00");
  const [contractData, setContractData] = useState({});
  const [allowance, setAllowance] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("ETH"); // New state variable for unit
  const [accounts, setAccounts] = useState([]);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [isConnecting, setIsConnecting] = useState(false); // New state variable for connecting

  const fetchContractData = async () => {
    setIsFetching(true);
    try {
      const myContract = new web3.eth.Contract(ABI, contractAddress);
      const name = await myContract.methods.name().call();
      const symbol = await myContract.methods.symbol().call();
      const totalSupply = await myContract.methods.totalSupply().call();
      const decimals = await myContract.methods.decimals().call();

      setContractData({ name, symbol, totalSupply, decimals });
      setError(null);
    } catch (error) {
      console.error("Error fetching contract data:", error);
      setError("Failed to fetch contract data. Please try again later.");
      setContractData({});
    }
    setIsFetching(false);
  };

  const switchToSwisstronikNetwork = async () => {
    const swisstronikChainId = '0x50B'; // Chain ID for Swisstronik testnet (1291 in hexadecimal)
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: swisstronikChainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: swisstronikChainId,
                chainName: 'Swisstronik Testnet',
                rpcUrls: ['https://json-rpc.testnet.swisstronik.com/'],
                nativeCurrency: {
                  name: 'Swisstronik',
                  symbol: 'SWTR',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://explorer-evm.testnet.swisstronik.com'],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Swisstronik network:", addError);
        }
      } else {
        console.error("Failed to switch to Swisstronik network:", switchError);
      }
    }
  };

  const connect = async () => {
    console.log("Connect button clicked");
    setIsConnecting(true); // Set connecting state to true
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await web3.eth.requestAccounts();
        console.log("Accounts retrieved:", accounts);
        if (accounts.length > 0) {
          console.log('You are already connected to wallet');
          setAccounts(accounts);
          setConnectedAccount(accounts[0]);

          // Check if the user is on the Swisstronik network
          const currentChainId = await web3.eth.getChainId();
          const swisstronikChainId = 1291; 
          if (currentChainId !== swisstronikChainId) {
            await switchToSwisstronikNetwork();
          }

          await updateBalance(accounts[0]);
          setIsConnecting(false); // Set connecting state to false
        } else {
          console.log('You are not connected to wallet');
          alert('Please connect to MetaMask');
          setIsConnecting(false); // Set connecting state to false
        }
      } catch (error) {
        alert('Something went wrong with wallet or internet connection');
        console.log("Error:", error);
        setIsConnecting(false); // Set connecting state to false
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
      console.log("No Ethereum provider detected");
      setIsConnecting(false); // Set connecting state to false
    }
  };

  const updateBalance = async (account) => {
    try {
      const balance = await web3.eth.getBalance(account);
      setBalance(parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(3));
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Failed to fetch balance. Please try again later.");
    }
  };

  const handleSendSWTR = async () => {
    setIsTransferring(true); // Set transferring state to true
    try {
      // Check if the user is on the Swisstronik network
      const currentChainId = await web3.eth.getChainId();
      const swisstronikChainId = 1291; 
      if (currentChainId !== swisstronikChainId) {
        await switchToSwisstronikNetwork();
      }
  
      // Validate recipient address
      if (!web3.utils.isAddress(recipientAddress)) {
        setError("Invalid recipient address.");
        setIsTransferring(false); // Set transferring state to false
        return;
      }
  
      // Check sender's balance
      if (accounts.length === 0 || !accounts[0]) {
        setError("No accounts found. Please connect to MetaMask.");
        setIsTransferring(false); // Set transferring state to false
        return;
      }
  
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log("Balance:", balance);
  
      // Parse the amount entered by the user and divide by 1000
      const parsedAmount = parseFloat(amount) / 1000;
      const amountInWei = unit === "ETH" ? web3.utils.toWei(parsedAmount.toString(), "ether") : parsedAmount.toString();
  
      if (BigInt(balance) < BigInt(amountInWei)) {
        setError("Insufficient funds.");
        setIsTransferring(false); // Set transferring state to false
        return;
      }
  
      // Estimate gas
      const tx = {
        to: recipientAddress,
        from: accounts[0],
        value: amountInWei,
      };
  
      const gasEstimate = await web3.eth.estimateGas(tx);
      console.log("Estimated Gas:", gasEstimate);
  
      // Use MetaMask to send the transaction with gas estimate
      const transactionParameters = {
        ...tx,
        gas: web3.utils.toHex(gasEstimate),
      };
  
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  
      console.log("Transaction Hash:", txHash);
  
      if (txHash) {
        setTimeout(async () => {
          await updateBalance(accounts[0]); // Update balance after 3 seconds
          setTransferStatus("Transaction successful 🎉");
          setError(null);
        }, 4000); 
      } else {
        setError("Transaction failed. Please try again later.");
        setTransferStatus(null);
      }
    } catch (error) {
      console.error("Error sending SWTR:", error);
      setError("Failed to send SWTR. Please try again later.");
      setTransferStatus(null);
    }
    setIsTransferring(false); // Set transferring state to false
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <section className="col-span-1 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Playground (Swisstronik Plugin)</CardTitle>
          <CardDescription>Interact with any Swisstronik smart contracts or send some SWTR</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert" style={{ backgroundColor: '#ffcccc', border: '2px solid red' }}>
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          {transferStatus && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert" style={{ backgroundColor: '#ccffcc', border: '2px solid green' }}>
              <strong className="font-bold">Success:</strong>
              <span className="block sm:inline"> {transferStatus}</span>
            </div>
          )}
          <div className="flex items-center mb-4">
            <Input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Enter contract address"
              className="flex-grow text-lg"
            />
            <Button onClick={fetchContractData} className={`ml-2 ${isFetching ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isFetching}>
              {isFetching ? "Fetching..." : "Fetch Data"}
            </Button>
          </div>
          {contractData.name && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(contractData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <hr className="my-4" />
          <h2 className="text-xl font-bold mb-2">Send Some SWTR</h2>
          <div className="flex items-center justify-between mb-4">
            {connectedAccount && (
              <div className="p-2 bg-gray-100 rounded">
                <strong>Balance:</strong> <span className="text-green-600 font-bold">{balance} SWTR</span>
              </div>
            )}
            <Button onClick={connect} className="ml-auto">
              {isConnecting ? "Connecting..." : connectedAccount ? "Connected" : "Connect to Swisstronik"}
            </Button>
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Enter recipient address"
              className="flex-grow text-lg"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Enter amount"
              className="flex-grow text-lg ml-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleSendSWTR} className={`ml-2 ${isTransferring || !connectedAccount ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isTransferring || !connectedAccount}>
              {isTransferring ? "Sending..." : !connectedAccount ? "Connect Account" : "Send SWTR"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}