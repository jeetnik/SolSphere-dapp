import type { Metadata } from "next";
import RootLayout from "./root-layout";

export const metadata: Metadata = {
  title: "Solspher | Solana Token Launchpad for Seamless Token Creation",
  description:
    "Launch Solana-based tokens effortlessly with Solspher. Secure, fast, and user-friendly platform for token creation, fundraising, and management.",
  openGraph: {
    title: "Solspher | Solana Token Launchpad for Seamless Token Creation",
    description:
      "Solspher makes launching Solana-based tokens easy and secure. Start your crypto journey today!",
    url: "https://solsphere-rosy.vercel.app/",
    images: [
      {
        url: "https://solsphere-rosy.vercel.app/solspher-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Solspher - The Best Solana Token Launchpad",
      },
    ],
    siteName: "Solspher",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solspher | Solana Token Launchpad for Seamless Token Creation",
    description:
      "Solspher makes launching Solana-based tokens easy and secure. Start your crypto journey today!",
    images: ["https://solsphere-rosy.vercel.app/solspher-preview.jpg"],
  },
  alternates: {
    canonical: "https://solsphere-rosy.vercel.app/",
  },
  other: {
    "google-site-verification": "M_46EfodvjRbZ_6fI9JmFbDgrVzKB20nO14B7b2D00o",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
