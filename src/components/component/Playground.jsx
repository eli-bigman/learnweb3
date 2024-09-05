"use client"
import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import Select from 'react-select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const coins = [
  { name: "Bitcoin", symbol: "BtcUsd" },
  { name: "Ethereum", symbol: "EthUsd" },
  { name: "Aave", symbol: "AaveUsd" },
  { name: "Uniswap", symbol: "UniUsd" },
  { name: "Dai", symbol: "DaiUsd" },
  { name: "USD Coin", symbol: "UsdcUsd" }
];

export default function ChainlinkGame() {
  const [prices, setPrices] = useState([]);
  const [selectedPairs, setSelectedPairs] = useState({});
  const [error, setError] = useState(null);
  const [results, setResults] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchPrices = async () => {
      try {
        console.log("Fetching prices...");
        const web3 = new Web3('https://ethereum-rpc.publicnode.com');
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
        console.log("Prices fetched:", prices);

        const priceOptions = prices.map((price, index) => ({
          value: parseFloat(price.answer) / 1e8,
          label: `$${(parseFloat(price.answer) / 1e8).toFixed(2)}`
        }));

        setPrices(priceOptions);
        console.log("Price options set:", priceOptions);
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
    const newResults = {};

    coins.forEach((coin, index) => {
      const actualPrice = prices[index].value;
      newResults[coin.symbol] = selectedPairs[coin.symbol] === actualPrice;
    });

    setResults(newResults);
  };

  return (
    <section className="col-span-1 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Playground (Chainlink Plugin)</CardTitle>
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
                      menuPortalTarget={isClient ? document.body : null}
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
        </CardContent>
      </Card>
    </section>
  );
}