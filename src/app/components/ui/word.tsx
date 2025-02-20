"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "../../lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2000,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.05, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false); // State to handle initial delay

  useEffect(() => {
    // Wait 3 seconds before showing text
    const delayTimeout = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(delayTimeout);
  }, []);

  useEffect(() => {
    if (!show) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [show, words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        {show && ( // Only render after 3 seconds
          <motion.h1
            key={words[index]}
            className={cn(className)}
            {...motionProps}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {words[index]}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}
