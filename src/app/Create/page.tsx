"use client";
import { SiSolana } from "react-icons/si";
import { useState } from "react";
import {
  Keypair,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_2022_PROGRAM_ID,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import toast, { Toaster } from "react-hot-toast";
import { HoverEffect } from "../components/ui/card-hover-effect";

interface TokenMetadata {
  mint: PublicKey;
  name: string;
  symbol: string;
  uri: string;
  additionalMetadata: [];
}

export default function TokenLaunchpad() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    imageURL: "",
    initialSupply: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenData({ ...tokenData, [e.target.name]: e.target.value });
  };

  const createToken = async () => {
    if (!wallet.publicKey) {
      toast.error("❌ Wallet not connected.");
      return;
    }

    if (!tokenData.name || !tokenData.symbol || !tokenData.initialSupply) {
      toast.error("⚠️ Please fill all fields.");
      return;
    }

    try {
      const mintKeypair = Keypair.generate();
      const metadata: TokenMetadata = {
        mint: mintKeypair.publicKey,
        name: tokenData.name.trim(),
        symbol: tokenData.symbol.trim(),
        uri: tokenData.imageURL.trim() || "https://cdn.100xdevs.com/metadata.json",
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9,
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash())
        .blockhash;
      transaction.partialSign(mintKeypair);

      await wallet.sendTransaction(transaction, connection);
      toast.success(`✅ Token Mint Created at ${mintKeypair.publicKey.toBase58()}`, { position: "bottom-right" });

      // Create Associated Token Account
      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction2, connection);
      toast.success(`✅ Associated Token Account Created!`, { position: "bottom-right" });

      // Mint Initial Supply
      const mintAmount = parseFloat(tokenData.initialSupply) || 1000;
      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          mintAmount * 10 ** 9,
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction3, connection);
      toast.success(`✅ Minted ${mintAmount} Tokens!`, { position: "bottom-right" });

    } catch (error) {
      console.error("❌ Token Creation Failed:", error);
      toast.error("❌ Token Creation Failed. Check console for details.", { position: "bottom-right" });
    }
  };

  return (
    <HoverEffect>
    <div className="flex flex-col items-center justify-center gap-4 text-white p-6">
      <Toaster position="bottom-right" />
      <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold flex items-center gap-2 whitespace-nowrap text-purple-500">
  <SiSolana color="white" />olana Token Launchpad
</h1>

      <style jsx>{`
            .custom-input {
              width: 100%;
              padding: 12px;
              border: 1px solid #374151;
              border-radius: 8px;
              background: ;
              color: white;
              text-align: center;
              outline: none;
            }
            .custom-input:focus {
              border-color: #3b82f6;
              box-shadow: 0 0 5px #3b82f6;
            }
          `}</style>

      <input
        type="text"
        name="name"
        placeholder="Token Name"
        className="custom-input"
        value={tokenData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="symbol"
        placeholder="Symbol"
        className="custom-input"
        value={tokenData.symbol}
        onChange={handleChange}
      />
      <input
        type="text"
        name="imageURL"
        placeholder="Image URL"
        className="custom-input"
        value={tokenData.imageURL}
        onChange={handleChange}
      />
      <input
        type="number"
        name="initialSupply"
        placeholder="Initial Supply"
        className="custom-input"
        value={tokenData.initialSupply}
        onChange={handleChange}
      />

      <button
        onClick={createToken}
        className="px-6 py-3 mt-4 font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition"
      >
        Create Token
      </button>
    </div>
    </HoverEffect>
  );
}
