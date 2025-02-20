import type { Metadata } from "next";
import RootLayout from "./root-layout";

export const metadata: Metadata = {
  title: "Solspher | Solana Token Launchpad",
  description:
    "Solspher is a powerful Solana Token Launchpad that enables seamless token creation, fundraising, and management on the Solana blockchain.",
  openGraph: {
    title: "Solspher | Solana Token Launchpad",
    description:
      "Create and launch your Solana-based token effortlessly with Solspher. Secure, fast, and user-friendly.",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/solspher-preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solspher | Solana Token Launchpad",
    description:
      "Solspher makes launching Solana-based tokens easy and secure. Start your crypto journey today!",
    images: ["https://yourwebsite.com/solspher-preview.jpg"],
  },
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
