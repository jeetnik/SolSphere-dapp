"use client";
import React, { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Balance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchBalance = async () => {
    if (publicKey) {
      try {
        const balanceInLamports = await connection.getBalance(publicKey);
        setBalance(balanceInLamports / LAMPORTS_PER_SOL);
        console.log("Updated SOL Balance:", balanceInLamports / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  useEffect(() => {
    if (!publicKey) return;

    fetchBalance(); 

   
    const subscriptionId = connection.onAccountChange(publicKey, async () => {
 
      await fetchBalance();
    });

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [publicKey, connection]);

  return (
    <>
      {publicKey && (
        <p className="text-center text-lg text-gray-400">
          Current Balance: <span className="text-green-400">{balance ?? "Loading..."} SOL</span>
        </p>
      )}
    </>
  );
}
