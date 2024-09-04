import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import Select from 'react-select';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const coins = [
  { name: "Bitcoin", symbol: "BtcUsd" },
  { name: "Ethereum", symbol: "EthUsd" },
  { name: "Aave", symbol: "AaveUsd" },
  { name: "Uniswap", symbol: "UniUsd" },
  { name: "Dai", symbol: "DaiUsd" },
  { name: "USD Coin", symbol: "UsdcUsd" }
];

export default function Chainlink() {
  const [prices, setPrices] = useState([]);
  const [selectedPairs, setSelectedPairs] = useState({});
  const [error, setError] = useState(null);
  const [gameStatus, setGameStatus] = useState("");
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        web3.registerPlugin(new ChainlinkPlugin());

        const pricePromises = [
          web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.AaveUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.UniUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.DaiUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.UsdcUsd),
        ];

        const prices = await Promise.all(pricePromises);

        const priceOptions = prices.map((price, index) => ({
          value: parseFloat(price.answer) / 1e8,
          label: `$${(parseFloat(price.answer) / 1e8).toFixed(2)}`
        }));

        setPrices(priceOptions);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setError("Failed to fetch prices. Please try again later.");
      }
    };

    fetchPrices();
  }, []);

  const handleSelect = (coin, price) => {
    setSelectedPairs({ ...selectedPairs, [coin]: price });
  };

  const handleSubmit = () => {
    let allCorrect = true;
    const newResults = {};

    coins.forEach((coin, index) => {
      const actualPrice = prices[index].value;
      if (selectedPairs[coin.symbol] !== actualPrice) {
        allCorrect = false;
        newResults[coin.symbol] = false;
      } else {
        newResults[coin.symbol] = true;
      }
    });

    setResults(newResults);

    if (allCorrect) {
      setGameStatus("Congratulations! You matched all the coins correctly.");
    } else {
      setGameStatus("Some matches are incorrect. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
              <LinkIcon className="h-6 w-6" />
              <span>Chainlink Playground</span>
            </Link>
          </div>
          <Button className="hidden sm:inline-flex">Connect to MetaMask/Wallet</Button>
          <Button size="icon" className="sm:hidden">
            <WalletIcon className="h-5 w-5" />
            <span className="sr-only">Connect Wallet</span>
          </Button>
        </div>
      </header>
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
        <section className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Playground</CardTitle>
              <CardDescription>Guess the price of cryptocurrencies using Web3.js</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline"> {error}</span>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cryptocurrency</TableHead>
                    <TableHead>Your Guess</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coins.map((coin, index) => (
                    <TableRow key={coin.symbol}>
                      <TableCell>{coin.name}</TableCell>
                      <TableCell>
                        <Select
                          value={prices.find(price => price.value === selectedPairs[coin.symbol])}
                          onChange={(option) => handleSelect(coin.symbol, option.value)}
                          options={prices}
                          className="w-64"
                          menuPortalTarget={document.body}
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: "0.375rem",
                              borderColor: "#d1d5db",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "#9ca3af",
                              },
                            }),
                            menu: (base) => ({
                              ...base,
                              borderRadius: "0.375rem",
                              overflow: "hidden",
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected ? "#4b5563" : "#ffffff",
                              color: state.isSelected ? "#ffffff" : "#000000",
                              "&:hover": {
                                backgroundColor: "#e5e7eb",
                              },
                            }),
                            menuPortal: base => ({ ...base, zIndex: 9999 })
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {results[coin.symbol] !== undefined && (
                          results[coin.symbol] ? "✅" : "❌"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end pt-4">
                <Button onClick={handleSubmit}>Submit Guesses</Button>
              </div>
              {gameStatus && (
                <div className={`mt-4 p-4 rounded ${gameStatus.includes("Congratulations") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {gameStatus}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
        <section className="col-span-1 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Code Display</CardTitle>
              <CardDescription>View the code for the Playground app</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                rows={15}
                value={`
// Import Web3.js
import Web3 from 'web3';

// Connect to Ethereum network
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');

// Get current prices of cryptocurrencies
async function getCryptoPrices() {
  const btcPrice = await web3.eth.getBalance('0x1BdE23A5d32Ad6A9CC02Ca1393b2CaB1f2f79Ec1');
  const ethPrice = await web3.eth.getBalance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
  const linkPrice = await web3.eth.getBalance('0x514910771af9ca656af840dff83e8264ecf986ca');

  return {
    btcPrice: web3.utils.fromWei(btcPrice, 'ether'),
    ethPrice: web3.utils.fromWei(ethPrice, 'ether'),
    linkPrice: web3.utils.fromWei(linkPrice, 'ether'),
  };
}

// Handle user guesses
async function handleGuesses(btcGuess, ethGuess, linkGuess) {
  const prices = await getCryptoPrices();

  let score = 0;
  if (Math.abs(btcGuess - prices.btcPrice) < 1000) score += 1;
  if (Math.abs(ethGuess - prices.ethPrice) < 100) score += 1;
  if (Math.abs(linkGuess - prices.linkPrice) < 5) score += 1;

  return score;
}
                `}
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}