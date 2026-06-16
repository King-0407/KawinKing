/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Design", "Build", "Innovate"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // High-precision requestAnimationFrame counter
  useEffect(() => {
    const duration = 2700; // ms
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Count reached 100, wait 400ms then complete
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Word rotator every 900ms matching transition intervals (2700 total / 3 words = 900ms each)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Top Left: Portfolio Label */}
      <div className="flex items-center">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio &bull; Kawin King C
        </motion.span>
      </div>

      {/* Center: Rotator Words */}
      <div className="flex justify-center items-center h-40">
        <AnimatePresence mode="wait">
          <motion.h2
            key={WORDS[wordIndex]}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary text-center"
          >
            {WORDS[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Layout: Counter & Progress bar */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-xs tracking-[0.2em] uppercase max-w-[200px]"
          >
            UI/UX DESIGNER
          </motion.div>
          <div className="text-7xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none select-none">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-[3px] bg-stroke/30 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full accent-gradient rounded-full"
            style={{
              width: `${count}%`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.45)',
            }}
            layoutId="loading-bar-tracker"
          />
        </div>
      </div>
    </motion.div>
  );
}
