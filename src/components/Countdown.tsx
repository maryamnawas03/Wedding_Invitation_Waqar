"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDateIso: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDateIso }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDateIso) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
      setIsLoaded(true);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  if (!isLoaded) return null;

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4">
      <p className="text-xs uppercase tracking-[0.3em] text-brown-400 font-sans font-semibold text-center mb-5">
        Wedding Begins In
      </p>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-3 sm:p-5 border border-salmon-200/40 shadow-luxury"
          >
            <span className="block font-serif text-2xl sm:text-4xl text-brown-dark font-semibold tracking-tight">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="block text-[10px] sm:text-xs font-sans uppercase tracking-wider text-salmon-dark font-medium mt-1">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
