import React from "react";
import Playground from "@/components/component/zksyncPlayground";
import CodeDisplay from "@/components/component/CodeDisplay";
import AIResponse from "@/components/component/AIResponse";

export default function Namespace() {
  const codeResponse = ` 
    // import web3 and zksync plugin
import { Web3 } from "web3";
import { ZKsyncPlugin, ZKsyncWallet } from "web3-plugin-zksync";

// initialize RPC endpoint
const web3 = new Web3();

// register plugin
web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

// using the plugin
async function main() {
  // initialize a wallet

  const result = await web3.ZKsync.rpc.getRawBlockTransactions(300);
  // console.log(result);

  // const result = await web3.ZKsync.rpc.getTestnetPaymasterAddress()
  //const result = await web3.ZKsync.rpc.getTransactionDetails("0x394bdb2f028bf11adee1f7fa52936c1ce967c878f265420e182190c4faea686d")
  console.log(result);
}

main();

  `;



  const prompt = "You are an expert in web3js web3-plugin-zksync plugin and you have built a simple dapp which fetches the block number or transaction details from zksync now explain: ";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
        <div className="col-span-1 lg:col-span-2 pl-5">
          <Playground />
          {/* <Playground /> */}
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-8">
          <CodeDisplay codeResponse={codeResponse} />
          <AIResponse promptPrefix={prompt}/>
        </div>
      </main>
    </div>
  );
}