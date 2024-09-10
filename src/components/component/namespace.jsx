import React from "react";
import Playground from "@/components/component/namespacePlayground";
import CodeDisplay from "@/components/component/CodeDisplay";
import AIResponse from "@/components/component/AIResponse";

export default function Namespace() {
  const codeResponse = ` 
    // import web3 and plugin
import { Web3 } from "web3";
import { Chain, EnsPlugin } from "@namespace-ens/web3-plugin-ens";

// initialize rpc endpoint
const web3 = new Web3(); // mainnet by default

// register plugin
web3.registerPlugin(new EnsPlugin(Chain.Mainnet));

// use plugin
async function main() {
  const name = await web3.ens.getAddress("santiagodevrel.eth");

//Display th ename of the address of the ens owner
  console.log(name);
}

main();
  `;



  const prompt = "You are an expert in web3js @namespace-ens/web3-plugin-ens plugin and you have built a dapp which fetches the address given the ens now explain: ";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
        <div className="col-span-1 lg:col-span-2">
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