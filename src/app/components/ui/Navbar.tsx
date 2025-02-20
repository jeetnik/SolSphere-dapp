"use client";
import { useState } from "react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu

export default function Navbar({ network, setNetwork }: { network: string; setNetwork: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black text-white border-b-2 shadow-md">
      <div className="flex items-center justify-between p-3 w-full max-w-[95%] mx-auto">
        {/* Left - Wallet Button */}
        <div className="flex-shrink-0">
          <WalletMultiButton />
        </div>

        {/* Navigation Links (Hidden on Small Screens) */}
        <div className="hidden lg:flex items-center gap-3 text-sm lg:text-lg font-semibold">
          <ul className="flex gap-2 lg:gap-8 flex-nowrap">
            <li className="p-2 rounded-full hover:bg-slate-900 transition duration-300">
              <Link href="/Airdrop">Airdrop</Link>
            </li>
            <li className="p-2 rounded-full hover:bg-slate-900 transition duration-300">
              <Link href="/Create">Create Token</Link>
            </li>
            <li className="p-2 rounded-full hover:bg-slate-900  transition duration-300">
              <Link href="/Send">Send Token</Link>
            </li>
           
          </ul>
        </div>

        {/* Right - Wallet Disconnect Button */}
        <div className="hidden lg:block">
          <WalletDisconnectButton className="whitespace-nowrap px-3 py-1 text-xs sm:text-sm lg:text-base" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="lg:hidden bg-black text-white flex flex-col gap-2 p-4 w-full">
          <Link className="p-3 rounded-md hover:bg-slate-900 text-center" href="/Airdrop">
            Airdrop
          </Link>
          <Link className="p-3 rounded-md hover:bg-slate-900 text-center" href="/Create">
            Create Token
          </Link>
          <Link className="p-3 rounded-md hover:bg-slate-900 text-center" href="/Send">
            Send Token
          </Link>
         
       
        </div>
      )}
    </nav>
  );
}
