"use client";
import { DotPattern } from "../dot-pattern";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

export const HoverEffect = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  let [hovered, setHovered] = useState(false);

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        className="relative group block p-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative">
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-500/10 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1.02, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
              />
            )}
          </AnimatePresence>

          {/* Card with DotPattern inside */}
          <Card className="border-gray-500/35">{children}</Card>
        </div>
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-6 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative",
        "w-[300px] h-[720px] sm:w-[400px] sm:h-[720px] md:w-[500px] md:h-[780px] lg:w-[900px] lg:h-[620px]",
        className
      )}
      whileHover={{ transition: { duration: 0.3 } }}
    >
      {/* Dot Pattern covering the entire card */}
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]",
        )}
      />

      {/* Ensure content stays above Dot Pattern */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
};
