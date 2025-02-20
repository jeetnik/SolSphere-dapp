"use client";


import { useState, } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";
import { HoverEffect } from "../components/ui/card-hover-effect";
import Balance from "../Balance/page";

export default function RequestAirdrop() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  
  // ✅ Fetch wallet balance when component loads or after airdrop
 

  

  const requestAirdrop = async () => {
    if (!publicKey) {
      toast.error("⚠️ Connect your wallet first!", {
        style: { background: "#333", color: "#fff" },
      });
      return;
    }

    const solAmount = parseFloat(amount);
    if (isNaN(solAmount) || solAmount <= 0) {
      toast.error("❌ Enter a valid SOL amount.", {
        style: { background: "#ff4d4d", color: "#fff" },
      });
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("⏳ Requesting airdrop...");

      // 🔹 Request airdrop
      const txSignature = await connection.requestAirdrop(
        publicKey,
        solAmount * LAMPORTS_PER_SOL
      );

      // 🔹 Confirm transaction (ensure it's completed)
      const latestBlockHash = await connection.getLatestBlockhash();
      const confirmation = await connection.confirmTransaction(
        {
          signature: txSignature,
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        },
        "finalized" // Ensure it's finalized
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed! Please try again.");
      }

      
     

      // ✅ Show success message only if transaction was confirmed
      toast.success(
        <span>
          ✅ Airdrop successful!{" "}
          <a
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300"
          >
            View Transaction
          </a>
        </span>,
        {
          id: toastId,
          duration: 7000,
          style: { background: "#1f2937", color: "#fff" },
        }
      );

      setAmount(""); // Reset input after success
    } catch (err) {
      toast.error(`❌ Airdrop failed: ${err}`, {
        style: { background: "#ff4d4d", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HoverEffect className="">
        <div className="mt-16">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col gap-4 p-6 max-w-md mx-auto text-white rounded-lg shadow-lg relative">
              <Toaster position="bottom-right" reverseOrder={false} />
              <h2 className="text-4xl font-semibold  text-purple-500 text-center">Request Airdrop</h2>

              {/* ✅ Show updated balance */}
              <Balance />

              <input
                type="number"
                placeholder="Enter SOL amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-3 border border-gray-700 rounded-md text-white text-center outline-none focus:ring-2 focus:ring-blue-500"
                min="0.01"
                step="0.01"
              />
              <button
                onClick={requestAirdrop}
                disabled={loading}
                className={`px-5 py-3 rounded-md font-semibold transition ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Request Airdrop"}
              </button>
            </div>
          </div>
        </div>
      </HoverEffect>
    </>
  );
}
