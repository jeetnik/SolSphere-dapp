"use client";

import {  Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/ui/Navbar";
import { ThemeProvider } from "../app/components/theme-provider"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import Fotter from "./components/fotter"

import"@solana/wallet-adapter-react-ui/styles.css"



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <Navbar />
              
                {children}
                <Fotter/>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
