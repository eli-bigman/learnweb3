'use client'
import { Web3 } from "web3";
import { ORAPlugin, Chain, Models } from "@ora-io/web3-plugin-ora";

const MODEL = Models.LLMA2;
const PROMPT = "As an expert in web3js explain web3 rpc:";

function App() {
  // initialize provider (RPC endpoint or injected provider)
  const web3 = new Web3();

  // register plugin
  web3.registerPlugin(new ORAPlugin(Chain.SEPOLIA));

  async function usePlugin() {
    try {
      const estimateFee = await web3.ora.estimateFee(MODEL);
      console.log("fee", estimateFee);

      // connect metamask
      const accounts = await web3.eth.requestAccounts();
      console.log("accounts connected:", accounts);

      // send tx
      const receipt = await web3.ora.calculateAIResult(accounts[0], MODEL, PROMPT, estimateFee);
      console.log(receipt.transactionHash);
    } catch (error) {
      console.error("Error in usePlugin:", error);
    }
  }

  async function fetchResult() {
    try {
      // fetch result
      const result = await web3.ora.getAIResult(MODEL, PROMPT);
      console.log(result);
    } catch (error) {
      console.error("Error in fetchResult:", error);
    }
  }

  return (
    <div className="App">
      <header >
        <button onClick={usePlugin}>generate AI</button>
        <button onClick={fetchResult}>fetch result</button>
      </header>
    </div>
  );
}

export default App;