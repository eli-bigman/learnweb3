'use client'
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Web3 } from "web3";
import { ORAPlugin, Chain, Models } from "@ora-io/web3-plugin-ora";

// Define the AI model and prompt prefix
const MODEL = Models.OPENLM;
const PROMPT_PREFIX = "as an expert in web3js chainlink plugin explain: ";

export default function AIResponse() {
  // State variables to manage user input, AI response, loading state, and waiting state
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);

  // Initialize the Web3 provider (RPC endpoint or injected provider)
  const web3 = new Web3('https://singapore.rpc.blxrbdn.com');

  // Register the ORA plugin with the specified chain
  web3.registerPlugin(new ORAPlugin(Chain.SEPOLIA));

  // Function to handle sending the message to the ORA AI
  const handleSend = async () => {
    setLoading(true);
    setResponse("Estimating fee and sending transaction...");
    try {
      // Estimate the fee for the AI model
      const estimateFee = await web3.ora.estimateFee(MODEL);
      console.log("fee", estimateFee);

      // Connect to MetaMask and get the user's accounts
      const accounts = await web3.eth.requestAccounts();
      console.log("accounts connected:", accounts);

      // Send the transaction with the full prompt (prefix + user message)
      const fullPrompt = PROMPT_PREFIX + message;
      const receipt = await web3.ora.calculateAIResult(accounts[0], MODEL, fullPrompt, estimateFee);
      console.log(receipt.transactionHash);

      // Set the response and wait for 30 seconds before fetching the result
      setResponse("Transaction sent. Waiting 30 seconds before fetching the result...");
      setWaiting(true);
      setTimeout(async () => {
        await fetchResult(fullPrompt);
      }, 30000);
    } catch (error) {
      console.error("Error in handleSend:", error);
      setResponse("Failed to send transaction. Please try again later.");
      setLoading(false);
    }
  };

  // Function to fetch the AI result
  const fetchResult = async (fullPrompt) => {
    try {
      // Fetch the AI result using the full prompt
      const result = await web3.ora.getAIResult(MODEL, fullPrompt);
      console.log(result);
      setResponse(result);
    } catch (error) {
      console.error("Error in fetchResult:", error);
      setResponse("Failed to fetch AI response. Please try again later.");
    } finally {
      setLoading(false);
      setWaiting(false);
    }
  };

  return (
    <section className="col-span-1 lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Explain Code with ORA AI</CardTitle>
          <CardDescription>Ask Ora Ai any question about the code and get a response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="prose">
              <p>{response || "The AI has not responded yet. Please enter a message and click 'Send' to get a response."}</p>
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter your message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={handleSend} disabled={loading || waiting}>
                {loading ? "Processing..." : "Send"}
              </Button>
              <Button onClick={() => fetchResult(PROMPT_PREFIX + message)} disabled={loading || !waiting}>
                {waiting ? "Waiting..." : "Fetch Result"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}