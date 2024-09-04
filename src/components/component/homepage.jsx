import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Homepage() {
  return (
    (<div className="bg-background text-foreground">
      <header className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            Learn Web3JS
          </Link>
          {/* <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Plugins
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav> */}
          {/* <Button>Pla</Button> */}
        </div>
      </header>
      <main>
        <section className="container mx-auto py-16 px-4 md:px-6 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Master Web3.js with our AI-powered tutorials</h1>
              <p className="text-muted-foreground text-lg">
                Learn how to use the most popular Web3.js plugins with the help of an on-chain AI assistant.
              </p>
              <div className="flex gap-2">
                <Button>Get Started</Button>
                <Button variant="secondary">Enter Playground</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/web3js.svg"
                alt="Learn Web3JS"
                width="500"
                height="500"
                className="rounded-xl"
                style={{ aspectRatio: "400/400", objectFit: "cover" }} />
            </div>
          </div>
        </section>
        <section className="bg-muted py-16 px-4 md:px-6 lg:py-24">
          <div className="container mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Explore our Web3.js Plugins</h2>
              <p className="text-muted-foreground text-lg">
                Learn how to use the most popular Web3.js plugins with the help of an on-chain AI assistant.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <NavigationIcon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Namespace</h3>
                  </div>
                  <p className="text-muted-foreground">
                    The Namespace plugin from ChainSafe provides a simple and intuitive way to manage your Web3.js
                    namespaces.
                  </p>
                  <Link
                    href="chainlink"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    prefetch={false}>
                    Enter Playground
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <PhoneCallIcon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Multicall</h3>
                  </div>
                  <p className="text-muted-foreground">
                    The Multicall plugin from ChainSafe allows you to batch multiple Ethereum calls into a single
                    request.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    prefetch={false}>
                    Enter Playground
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Chainlink</h3>
                  </div>
                  <p className="text-muted-foreground">
                    The Chainlink plugin from ChainSafe provides a simple way to interact with Chainlink oracles in your
                    Web3.js applications.
                  </p>
                  <Link
                    href="chainlink"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    prefetch={false}>
                    Enter Playground
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <FolderSyncIcon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">ZKSync</h3>
                  </div>
                  <p className="text-muted-foreground">
                    The ZKSync plugin provides a seamless way to interact with the ZKSync layer 2 scaling solution using
                    Web3.js.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    prefetch={false}>
                    Enter Playground
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <SwissFrancIcon className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Swisstronik</h3>
                  </div>
                  <p className="text-muted-foreground">
                    The Swisstronik plugin provides a set of utilities for working with the Swisstronik blockchain using
                    Web3.js.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                    prefetch={false}>
                    Enter Playground
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-8 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; 2024 Learn Web3JS. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>)
  );
}

function ArrowRightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>)
  );
}


function FolderSyncIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
      <path d="M12 10v4h4" />
      <path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
      <path d="M22 22v-4h-4" />
      <path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
    </svg>)
  );
}


function LinkIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>)
  );
}


function NavigationIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>)
  );
}


function PhoneCallIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </svg>)
  );
}


function SwissFrancIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M10 21V3h8" />
      <path d="M6 16h9" />
      <path d="M10 9.5h7" />
    </svg>)
  );
}
