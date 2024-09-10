"use client"
import React, { useState, useEffect } from "react";
import { Web3 } from "web3";
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
  const [balance, setBalance] = useState(null);
  const [allowance, setAllowance] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null);
  const [approveStatus, setApproveStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

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

  const fetchBalance = async (address) => {
    try {
      const myContract = new web3.eth.Contract(ABI, contractAddress);
      const balance = await myContract.methods.balanceOf(address).call();
      setBalance(balance);
      setError(null);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Failed to fetch balance. Please try again later.");
      setBalance(null);
    }
  };

  const fetchAllowance = async (owner, spender) => {
    try {
      const myContract = new web3.eth.Contract(ABI, contractAddress);
      const allowance = await myContract.methods.allowance(owner, spender).call();
      setAllowance(allowance);
      setError(null);
    } catch (error) {
      console.error("Error fetching allowance:", error);
      setError("Failed to fetch allowance. Please try again later.");
      setAllowance(null);
    }
  };

  const handleTransfer = async (from, to, value) => {
    setIsTransferring(true);
    try {
      const myContract = new web3.eth.Contract(ABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
      await myContract.methods.transferFrom(from, to, value).send({ from: accounts[0] });
      setTransferStatus("Transfer successful");
      setError(null);
    } catch (error) {
      console.error("Error transferring tokens:", error);
      setError("Failed to transfer tokens. Please try again later.");
      setTransferStatus(null);
    }
    setIsTransferring(false);
  };

  const handleApprove = async (spender, value) => {
    setIsApproving(true);
    try {
      const myContract = new web3.eth.Contract(ABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
      await myContract.methods.approve(spender, value).send({ from: accounts[0] });
      setApproveStatus("Approval successful");
      setError(null);
    } catch (error) {
      console.error("Error approving tokens:", error);
      setError("Failed to approve tokens. Please try again later.");
      setApproveStatus(null);
    }
    setIsApproving(false);
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <section className="col-span-1 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Playground (Swisstronik Plugin)</CardTitle>
          <CardDescription>Interact with Swisstronik smart contracts</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
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
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Enter address to fetch balance"
              className="flex-grow text-lg"
              onBlur={(e) => fetchBalance(e.target.value)}
            />
            {balance && (
              <div className="ml-4">
                <strong>Balance:</strong> {balance}
              </div>
            )}
          </div>
          <div className="flex items-center mb-4">
            
            {allowance && (
              <div className="ml-4">
                <strong>Allowance:</strong> {allowance}
              </div>
            )}
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Enter from address"
              className="flex-grow text-lg"
              id="fromAddress"
            />
            <Input
              type="text"
              placeholder="Enter to address"
              className="flex-grow text-lg ml-2"
              id="toAddress"
            />
            <Input
              type="number"
              placeholder="Enter value"
              className="flex-grow text-lg ml-2"
              id="transferValue"
            />
            <Button onClick={() => handleTransfer(document.getElementById('fromAddress').value, document.getElementById('toAddress').value, document.getElementById('transferValue').value)} className={`ml-2 ${isTransferring ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isTransferring}>
              {isTransferring ? "Transfering..." : "Transfer"}
            </Button>
            {transferStatus && (
              <div className="ml-4">
                <strong>Status:</strong> {transferStatus}
              </div>
            )}
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Enter spender address"
              className="flex-grow text-lg"
              id="approveSpender"
            />
            <Input
              type="number"
              placeholder="Enter value"
              className="flex-grow text-lg ml-2"
              id="approveValue"
            />
            <Button onClick={() => handleApprove(document.getElementById('approveSpender').value, document.getElementById('approveValue').value)} className={`ml-2 ${isApproving ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isApproving}>
              {isApproving ? "Approving..." : "Approve"}
            </Button>
            {approveStatus && (
              <div className="ml-4">
                <strong>Status:</strong> {approveStatus}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// function Spinner() {
//   return (
//     <svg
//       className="animate-spin h-5 w-5 text-white"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       ></circle>
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//       ></path>
//     </svg>
//   );
// }