import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkIcon, WalletIcon } from "@/components/icons";

const Topper = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-3 shadow-sm sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <LinkIcon className="h-6 w-6" />
            <span>Chainlink Playground</span>
          </Link>
        </div>
        <Button className="hidden sm:inline-flex">Connect to MetaMask/Wallet</Button>
        <Button size="icon" className="sm:hidden">
          <WalletIcon className="h-5 w-5" />
          <span className="sr-only">Connect Wallet</span>
        </Button>
      </div>
    </header>
  );
}
export default Topper;