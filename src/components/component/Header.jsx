"use client"
import React, { useState } from "react";
import Link from "next/link";
import Web3 from "web3";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [account, setAccount] = useState(null);

  async function connect() {
    console.log("Connect button clicked");
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await web3.eth.requestAccounts();
        console.log("Accounts retrieved:", accounts);
        if (accounts.length > 0) {
          console.log('You are already connected to wallet');
          alert('You are connected');
          setAccount(accounts[0]);
        } else {
          console.log('You are not connected to wallet');
          alert('Please connect to MetaMask');
        }
      } catch (error) {
        alert('Something went wrong with wallet or internet connection');
        console.log("Error:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
      console.log("No Ethereum provider detected");
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-3 shadow-sm sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <LinkIcon className="h-6 w-6" />
            <span>Home</span>
          </Link>
        </div>
        {account ? (
          <span className="hidden sm:inline-flex">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
        ) : (
          <Button className="hidden sm:inline-flex" onClick={connect}>Connect</Button>
        )}
      </div>
    </header>
  );
}

function LinkIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}