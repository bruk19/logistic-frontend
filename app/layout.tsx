import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Logistic Supply Chain',
  description:
    'This is a decentralized supply chain management application built with Next.js and Solidity Ethereum smart contracts. It allows tracking of products through various stages of the supply chain, from raw material supply to retail sale.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
