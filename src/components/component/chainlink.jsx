import React from "react";
import Header from "@/components/component/Header";
import Playground from "@/components/component/chainlinkPlayground";
import CodeDisplay from "@/components/component/CodeDisplay";
import AIResponse from "@/components/component/AIResponse";

export default function Chainlink() {
  const codeResponse = ` 
    // Array of cryptocurrency coins with their names and Chainlink price feed symbols
const coins = [
  { name: "Bitcoin", symbol: "BtcUsd" },
  { name: "Ethereum", symbol: "EthUsd" },
  { name: "Aave", symbol: "AaveUsd" },
  { name: "Uniswap", symbol: "UniUsd" },
  { name: "Dai", symbol: "DaiUsd" },
  { name: "USD Coin", symbol: "UsdcUsd" }
];

// Main component for the Chainlink Game
export default function ChainlinkGame() {
  // State variables to store fetched prices, selected pairs, error messages, game results, and client rendering status
  const [prices, setPrices] = useState([]);
  const [selectedPairs, setSelectedPairs] = useState({});
  const [error, setError] = useState(null);
  const [results, setResults] = useState({});
  const [isClient, setIsClient] = useState(false);

  // useEffect hook to fetch price data when the component mounts
  useEffect(() => {
    setIsClient(true); // Ensure the code is running on the client side

    // Function to fetch prices from Chainlink data feeds
    const fetchPrices = async () => {
      try {
        console.log("Fetching prices...");

        // Initialize Web3 with a public Ethereum RPC node
        const web3 = new Web3('https://ethereum-rpc.publicnode.com');
        web3.registerPlugin(new ChainlinkPlugin()); // Register the Chainlink plugin for fetching data feeds

        // Prepare a list of promises to fetch prices for each coin using Chainlink price feeds
        const pricePromises = [
          web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.AaveUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.UniUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.DaiUsd),
          web3.chainlink.getPrice(MainnetPriceFeeds.UsdcUsd),
        ];

        // Fetch all prices asynchronously
        const prices = await Promise.all(pricePromises);
        console.log("Prices fetched:", prices);

        // Map fetched prices to options format for easy selection in UI
        const priceOptions = prices.map((price, index) => ({
          value: parseFloat(price.answer) / 1e8, // Convert price to a readable number format
          label: // Format the price to 2 decimal places
        }));

        setPrices(priceOptions); // Update state with fetched prices
        console.log("Price options set:", priceOptions);
      } catch (error) {
        // Error handling if price fetching fails
        console.error("Error fetching prices:", error);
        setError("Failed to fetch prices. Please try again later.");
      }
    };

    fetchPrices(); // Call the function to fetch prices
  }, []); // Dependency array is empty, so this effect runs only once when the component mounts

  // Handler to update selectedPairs state when a user selects a coin and its price
  const handleSelect = (coin, price) => {
    setSelectedPairs({ ...selectedPairs, [coin]: price });
  };

  // Handler to compute and display results when the user submits their selection
  const handleSubmit = () => {
    const newResults = {}; // Object to store the results

    // Loop through each coin to compare the user's selected price with the actual fetched price
    coins.forEach((coin, index) => {
      const actualPrice = prices[index].value; // Get the actual price from the fetched prices
      // Check if the user's selected price matches the actual price
      newResults[coin.symbol] = selectedPairs[coin.symbol] === actualPrice;
    });

    setResults(newResults); // Update state with the results
  };

  // (Further component implementation can go here, e.g., UI rendering)
}
  `;


  const prompt = "as an expert in web3js chainlink plugin explain: ";


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
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