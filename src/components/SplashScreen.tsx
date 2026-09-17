"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Bismillah from "./Bismillah";

interface SplashScreenProps {
  onOpen: () => void;
}

export default function SplashScreen({ onOpen }: SplashScreenProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isAnimating || isOpened) return;
    setIsAnimating(true);
    setIsOpened(true);

    // Timeline durations: Flap takes 0.6s, Card slides up in 0.8s
    // We let the whole sequence complete and fade out after 1.8 seconds
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  // Framer Motion animation variants
  const flapVariants = {
    closed: {
      rotateX: 0,
      borderBottomColor: "rgba(212,175,55,0.2)",
      zIndex: 30,
    },
    open: {
      rotateX: 180,
      borderBottomColor: "rgba(212,175,55,0)",
      zIndex: 10,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const cardVariants = {
    closed: {
      y: 40,
      opacity: 0.8,
      scale: 0.95,
    },
    open: {
      y: -140,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom elegant ease-out
      },
    },
  };

  const sealVariants = {
    closed: {
      scale: 1,
      opacity: 1,
    },
    open: {
      scale: 0.2,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="splash-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-nude text-secondary-dark px-4 overflow-hidden"
      >
        {/* Subtle Islamic Geometric BG pattern */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Double narrow border frame */}
        <div className="absolute inset-4 md:inset-8 border border-gold/15 pointer-events-none rounded-sm">
          <div className="absolute inset-1 border border-gold/5 rounded-sm" />
        </div>

        {/* Center Container representing the envelope layout */}
        <div className="relative z-10 flex flex-col items-center select-none w-full max-w-sm md:max-w-md">
          
          {/* Header label before envelope */}
          <motion.div
            animate={isOpened ? { opacity: 0, y: -20 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="font-serif tracking-[0.25em] text-[10px] uppercase text-[#8C7C6D]">
              You are invited to the Wedding of
            </p>
          </motion.div>

          {/* Envelope Wrapper */}
          <div className="relative w-72 h-56 md:w-80 md:h-64 bg-[#FAF7F2] border border-gold/20 rounded-sm shadow-luxury flex items-center justify-center perspective-1000">
            
            {/* 1. Envelope Flap (Top Fold) */}
            <motion.div
              variants={flapVariants}
              initial="closed"
              animate={isOpened ? "open" : "closed"}
              className="absolute top-0 inset-x-0 h-1/2 bg-[#F4ECE1] border-b border-gold/25 origin-top rounded-t-sm shadow-sm flex items-end justify-center pb-2 cursor-pointer"
              onClick={handleOpen}
            >
              {/* Back side of flap showing Calligraphy decoration when open */}
              <div className="rotate-180 transform opacity-10 font-serif text-[10px] uppercase tracking-widest text-gold select-none pointer-events-none">
                BISMILLAH
              </div>
            </motion.div>

            {/* 2. Invitation Card inside envelope that slides upwards */}
            <motion.div
              variants={cardVariants}
              initial="closed"
              animate={isOpened ? "open" : "closed"}
              className="absolute inset-x-4 bottom-4 top-4 bg-[#FAF8F5] border border-gold/15 shadow-md rounded-sm p-4 md:p-6 text-center flex flex-col justify-between z-20 pointer-events-none"
            >
              {/* Small Bismillah on card */}
              <div className="opacity-80 scale-75 transform origin-top mb-1 flex justify-center">
                <Bismillah className="w-40 h-auto" />
              </div>

              {/* Bride & Groom names */}
              <div className="my-auto py-2">
                <p className="font-serif text-[8px] tracking-widest uppercase text-secondary-dark/60 mb-1">
                  Wedding Celebration
                </p>
                <h2 className="font-script text-3xl md:text-4xl text-rosegold-gradient py-1">
                  Akram & Maryam
                </h2>
              </div>

              <div className="border-t border-gold/15 pt-2">
                <p className="font-serif text-[9px] tracking-widest text-[#8C7C6D] uppercase font-semibold">
                  Saturday, 08.08.2026
                </p>
                <p className="font-sans text-[7px] tracking-widest text-secondary-dark/50 uppercase mt-0.5">
                  Oak Ray Regency, Kandy
                </p>
              </div>
            </motion.div>

            {/* 3. Envelope Front Side (Pockets / Bottom Fold) */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#FAF7F2] border-t border-gold/15 rounded-b-sm z-25 flex items-center justify-center pointer-events-none">
              {/* Subtle gold line accent outlining envelope pocket folds */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 text-gold/10 fill-none stroke-current stroke-1">
                <path d="M0,100 L50,50 L100,100" />
              </svg>
            </div>

            {/* 4. Gold Wax Seal Button (in the center, overlapping flap and front) */}
            <motion.button
              variants={sealVariants}
              initial="closed"
              animate={isOpened ? "open" : "closed"}
              onClick={handleOpen}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-rosegold via-rosegold-dark to-rosegold text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gold/30 cursor-pointer"
              aria-label="Break Seal & Open Wedding Invitation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing ring wrapper around seal */}
              <span className="absolute inset-0 rounded-full border-2 border-gold/30 animate-pulse-slow pointer-events-none" />
              
              {/* Organic seal edges */}
              <div className="absolute -inset-0.5 rounded-full border border-rosegold/20 opacity-80" />
              
              <Heart className="w-5 h-5 fill-white text-white drop-shadow-sm animate-pulse" />
            </motion.button>

          </div>

          {/* Hint Label underneath */}
          <motion.div
            animate={isOpened ? { opacity: 0, y: 10 } : { opacity: 0.7 }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex flex-col items-center"
          >
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#8C7C6D] animate-pulse">
              Click the Wax Seal to Unlock
            </span>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
