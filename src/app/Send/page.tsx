"use client";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";
import { HoverEffect } from "../components/ui/card-hover-effect";
import Balance from "../Balance/page";

export default function SendTokens() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const sendTokens = async () => {
    if (!publicKey) {
      toast.error("⚠️ Connect your wallet first!");
      return;
    }

    if (!recipient || !PublicKey.isOnCurve(new PublicKey(recipient))) {
      toast.error("⚠️ Enter a valid Solana address!");
      return;
    }

    const solAmount = parseFloat(amount);
    if (isNaN(solAmount) || solAmount <= 0) {
      toast.error("⚠️ Enter a valid SOL amount!");
      return;
    }

    try {
      setLoading(true);
      toast.loading("⏳ Sending transaction...", { id: "tx" });

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: solAmount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      toast.success(
        <span>
          ✅ Transaction successful!{" "}
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300"
          >
            View on Explorer
          </a>
        </span>,
        { id: "tx", duration: 7000 }
      );

      // Reset form
      setRecipient("");
      setAmount("");
    } catch (error) {
      toast.error(`❌ Transaction failed: ${error}`, { id: "tx" });
      console.error("Transaction Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <HoverEffect>


  <div className="flex flex-col gap-4 p-6 max-w-md mx-auto text-white rounded-lg shadow-lg">
      <Toaster position="bottom-right" />

      <h2 className="text-3xl font-semibold text-center text-purple-500">Send SOL</h2>

      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="p-3  border border-gray-700 rounded-md text-white text-center outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-3  border border-gray-700 rounded-md text-white text-center outline-none focus:ring-2 focus:ring-blue-500"
        min="0.01"
        step="0.01"
      />

      <button
        onClick={sendTokens}
        disabled={loading}
        className={`px-5 py-3 rounded-md font-semibold transition ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Send SOL"}
      </button>
      <Balance/>
    </div>
  </HoverEffect>
  </>
  );
}
