import Link from 'next/link';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export default function Sidebar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-10 flex w-full flex-row border-t bg-background pt-4 sm:inset-y-0 sm:top-[63px] sm:left-0 sm:w-14 sm:flex-col sm:border-r sm:border-t-0 sm:mt-0 mt-2.5">
      <nav className="flex flex-row items-center justify-around gap-4 px-2 sm:flex-col sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/namespace"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <NavigationIcon className="h-5 w-5" />
                <span className="sr-only">Namespace</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="sm:side-right">Namespace</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/zksync"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <FolderSyncIcon className="h-5 w-5" />
                <span className="sr-only">ZKSync</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="sm:side-right">ZKSync</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/swisstronik"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <SwissFrancIcon className="h-5 w-5" />
                <span className="sr-only">Swisstronik</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="sm:side-right">Swisstronik</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/chainlink"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <LinkIcon className="h-5 w-5" />
                <span className="sr-only">Chainlink</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="sm:side-right">Chainlink</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

function NavigationIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

function FolderSyncIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
      <path d="M12 10v4h4" />
      <path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
      <path d="M22 22v-4h-4" />
      <path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
    </svg>
  );
}

function SwissFrancIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 21V3h8" />
      <path d="M6 16h9" />
      <path d="M10 9.5h7" />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 1 7 7l-1.5-1.5a3 3 0 0 0-4.5-4.5L10 13z" />
      <path d="M14 10a5 5 0 0 1-7-7l1.5 1.5a3 3 0 0 0 4.5 4.5L14 10z" />
    </svg>
  );
}