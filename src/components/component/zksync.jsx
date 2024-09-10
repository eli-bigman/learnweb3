import React from "react";
import Playground from "@/components/component/zksyncPlayground";
import CodeDisplay from "@/components/component/CodeDisplay";
import AIResponse from "@/components/component/AIResponse";

export default function Namespace() {
  const codeResponse = ` 
    code
  `;



  const prompt = "You are an expert in web3js web3-plugin-zksync plugin and you have built a simple dapp which fetches the block number or transaction details from zksync now explain: ";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
        <div className="col-span-1 lg:col-span-2">
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