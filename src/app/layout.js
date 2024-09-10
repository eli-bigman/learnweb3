import { Inter, Libre_Franklin, Chivo } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const libreFranklin = Libre_Franklin({ subsets: ['latin'], display: 'swap' });
const chivo = Chivo({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'LearnWeb3JS',
  description: 'Learn web3js plugin with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${libreFranklin.className} ${chivo.className}`}>
        {children}
      </body>
    </html>
  );
}