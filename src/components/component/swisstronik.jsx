import React from "react";
import Playground from "@/components/component/swisstronikPlayground";
import CodeDisplay from "@/components/component/CodeDisplay";
import AIResponse from "@/components/component/AIResponse";

export default function Swisstronik() {
  const codeResponse = ` 
    // import web3 and swisstronik pluging
import { Web3 } from "web3";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import ABI from "./ABI"
// initialize the RPC endpoint
const web3 = new Web3("https://json-rpc.testnet.swisstronik.com/");

// register plugin
web3.registerPlugin(new SwisstronikPlugin());

async function main() {
  // initialize the contract object
  const ADDRESS = "0xb652af511905b871953928a93c1d2e31ad31da00";
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  // interact with the contract
  const name = await myContract.methods.name().call();

  const totalS = await myContract.methods.totalSupply().call();

  const decimals = await myContract.methods.decimals().call();

  console.log(name);
  console.log(totalSupply);
  console.log(decimals);
}

main();
  `;



  const prompt = "As an expert in web3js @swisstronik/web3-plugin-swisstronik plugin explain and you have the code to build a simple swisstronik dapp to fetch and perform action in a contract: ";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
        <div className="col-span-1 lg:col-span-2 pl-5">
          <Playground />
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-8">
          <CodeDisplay codeResponse={codeResponse} />
          <AIResponse promptPrefix={prompt}/>
        </div>
      </main>
    </div>
  );
}