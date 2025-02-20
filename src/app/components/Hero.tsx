import React from "react";
import { cn } from "../lib/utils";
import { DotPattern } from "./dot-pattern";
import { TypewriterEffect } from "./ui/typewrite";
import { WordRotate } from "./ui/word";
let words = [
    {
      text: "Unlock",
      className: "text-white dark:text-white",
    },
    {
      text: "the",
      className: "text-white dark:text-white",
    },
    {
      text: "power",
      className: "text-white dark:text-white",
    },
    {
      text: "of",
      className: "text-white dark:text-white",
    },
    {
        text: "Solana",
        className: "text-white dark:text-white",
      },
      {
        text: "With",
        className: "text-white dark:text-white",
      },
    {
      text: "SolSphere",
      className: "text-purple-500 dark:text-purple-500",
    },
  ];
export default function Hero(){
    return(<>
    <div className=" relative flex h-[780px] w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]",
        )}
      >
        
      </DotPattern>
      <TypewriterEffect words={words} />
      <br></br>
      <WordRotate
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-transparent text-blue-600"
  words={["Airdrop", "Create Token", "Send Sol", "UserBalance"]}
/>

    </div>
    </>)
}