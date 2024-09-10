"use client"
import React, { useState } from "react";
import { Web3 } from "web3";
import { Chain, EnsPlugin } from "@namespace-ens/web3-plugin-ens";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Initialize RPC endpoint
const web3 = new Web3(); 

// Register plugin
web3.registerPlugin(new EnsPlugin(Chain.Mainnet));

export default function NamespacePlayground() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const ensName = `${searchTerm}.eth`;
      const address = await web3.ens.getAddress(ensName);
      if (address === "0x0000000000000000000000000000000000000000") {
        setResult(`🎉 The ENS name "${ensName}" is available.`);
      } else {
        setResult(`❌ The ENS name "${ensName}" is taken by: ${address}`);
      }
      setError(null);
    } catch (error) {
      console.error("Error searching ENS name:", error);
      setError("Failed to search ENS name. Please try again later.");
      setResult(null);
    }
    setIsSearching(false);
  };

  return (
    <section className="col-span-1 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Playground (Namespace Plugin)</CardTitle>
          <CardDescription className="text-base">Search for availability of ENS names on Mainnet 🔍</CardDescription>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter ENS name without .eth"
              className="flex-grow text-lg"
            />
            <Button onClick={handleSearch} className={`ml-2 ${isSearching ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSearching}>
              {isSearching ? "Searching..." : <SearchIcon className="h-5 w-5" />}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Note: .eth is automatically added to the search term.</p>
          {result && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline text-2xl">{result}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function SearchIcon(props) {
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
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

