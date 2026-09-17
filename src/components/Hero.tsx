"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import Bismillah from "./Bismillah";
import { IslamicBackground } from "./IslamicPattern";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  
  // Create beautiful parallax hooks linked to window scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToWelcome = () => {
    const welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden bg-luxury-gradient px-6"
      id="hero"
    >
      {/* Parallax background geometric grid pattern */}
      <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-0">
        <IslamicBackground />
        
        {/* Soft elegant gradient glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rosegold-light/20 blur-[100px]" />
      </motion.div>

      {/* Elegant double gold borders around the hero area */}
      <div className="absolute inset-6 md:inset-10 border border-gold/15 pointer-events-none rounded-sm z-10">
        <div className="absolute inset-1 border border-gold/5 rounded-sm" />
      </div>

      {/* Floating flower elements in corner frames */}
      <div className="absolute top-10 left-10 text-gold/30 z-10 hidden sm:block">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="10" />
          <path d="M50,0 C35,25 65,25 50,0 Z M50,100 C35,75 65,75 50,100 Z M0,50 C25,35 25,65 0,50 Z M100,50 C75,35 75,65 100,50 Z" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 text-gold/30 z-10 hidden sm:block rotate-180">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="10" />
          <path d="M50,0 C35,25 65,25 50,0 Z M50,100 C35,75 65,75 50,100 Z M0,50 C25,35 25,65 0,50 Z M100,50 C75,35 75,65 100,50 Z" />
        </svg>
      </div>

      {/* Hero content container */}
      <motion.div
        style={{ y: textY, opacity }}
        className="z-10 flex flex-col items-center text-center max-w-3xl"
      >
        {/* Calligraphy header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <Bismillah className="w-60 md:w-80 h-auto" />
        </motion.div>

        {/* Invitation Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mb-6"
        >
          <p className="font-serif tracking-[0.3em] text-xs uppercase text-secondary-dark">
            In the Name of Allah, the Most Beneficent, the Most Merciful
          </p>
        </motion.div>

        {/* Couples name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
          className="font-script text-7xl md:text-9xl text-rosegold-gradient py-4 mb-4 select-none drop-shadow-sm leading-tight"
        >
          Akram & Maryam
        </motion.h1>

        {/* Small Heart divider */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center gap-4 my-2 w-full justify-center"
        >
          <div className="w-12 h-[1px] bg-gold/30" />
          <Heart className="w-4 h-4 text-gold fill-gold/10" />
          <div className="w-12 h-[1px] bg-gold/30" />
        </motion.div>

        {/* Date and Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-6"
        >
          <p className="font-serif text-lg md:text-xl text-secondary-dark/80 tracking-[0.2em] uppercase">
            Saturday, 8th August 2026
          </p>
          <p className="font-serif text-xs md:text-sm text-gold-dark tracking-[0.25em] uppercase mt-3 font-semibold">
            Oak Ray Regency, Kandy
          </p>
        </motion.div>
      </motion.div>

      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer"
        onClick={scrollToWelcome}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-secondary-dark/70 mb-2">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-rosegold" />
        </motion.div>
      </motion.div>
    </div>
  );
}
