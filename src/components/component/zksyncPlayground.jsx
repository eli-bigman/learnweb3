"use client"
import React, { useState } from "react";
import { Web3 } from "web3";
import { ZKsyncPlugin } from "web3-plugin-zksync";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Initialize RPC endpoint
const web3 = new Web3();
web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

export default function ZKSyncPlayground() {
  const [blockNumber, setBlockNumber] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [blockData, setBlockData] = useState(null);
  const [accountBalances, setAccountBalances] = useState(null);
  const [error, setError] = useState(null);
  const [isBlockSearching, setIsBlockSearching] = useState(false);
  const [isAccountSearching, setIsAccountSearching] = useState(false);

  const handleBlockSearch = async () => {
    setIsBlockSearching(true);
    try {
      const result = await web3.ZKsync.rpc.getBlockDetails(parseInt(blockNumber));
      if (result.timestamp) {
        result.timestamp = new Date(result.timestamp * 1000).toLocaleString();
      }
      setBlockData(result);
      setError(null);
    } catch (error) {
      console.error("Error fetching block data:", error);
      setError("Failed to fetch block data. Please try again later.");
      setBlockData(null);
    }
    setIsBlockSearching(false);
  };

  const handleAccountSearch = async () => {
    setIsAccountSearching(true);
    try {
      const result = await web3.ZKsync.rpc.getAllAccountBalances(accountAddress);
      setAccountBalances(result);
      setError(null);
    } catch (error) {
      console.error("Error fetching account balances:", error);
      setError("Failed to fetch account balances. Please try again later.");
      setAccountBalances(null);
    }
    setIsAccountSearching(false);
  };

  return (
    <section className="col-span-1 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Playground (ZKSync Plugin)</CardTitle>
          <CardDescription>Explore ZKSync blocks and account balances</CardDescription>
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
              type="number"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
              placeholder="Enter block number"
              className="flex-grow text-lg"
            />
            <Button onClick={handleBlockSearch} className={`ml-2 ${isBlockSearching ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isBlockSearching}>
              {isBlockSearching ? "Searching..." : "Search Block"}
            </Button>
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              placeholder="Enter account address"
              className="flex-grow text-lg"
            />
            <Button onClick={handleAccountSearch} className={`ml-2 ${isAccountSearching ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isAccountSearching}>
              {isAccountSearching ? "Searching..." : "Search Account"}
            </Button>
          </div>
          {blockData && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(blockData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {accountBalances && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(accountBalances).map(([token, balance]) => (
                  <TableRow key={token}>
                    <TableCell>{token}</TableCell>
                    <TableCell>{balance.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

