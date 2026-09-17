"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { weddingData } from "@/data/weddingData";
import { Countdown } from "./Countdown";
import { ChevronDown, MapPin } from "lucide-react";

export const HeroSection: React.FC = () => {
  const scrollToNextSection = () => {
    const timelineElement = document.getElementById("timeline");
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 overflow-hidden bg-[#FAF6EE]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle,_rgba(244,197,190,0.3)_0%,_rgba(250,246,238,0)_70%)] pointer-events-none" />

      {/* Main Architectural Arch Background Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] min-h-[85vh] my-auto rounded-3xl shadow-[0_20px_60px_rgba(74,59,50,0.16)] border border-[#E8DCC4] flex flex-col justify-between items-center overflow-hidden p-6 sm:p-8"
      >
        {/* Photorealistic Arch Background Image */}
        <Image
          src="/assets/wedding_arch_background.png"
          alt="Architectural Islamic Arch Frame"
          fill
          priority
          className="object-cover object-center pointer-events-none opacity-95"
        />

        {/* Soft Contrast Overlay for Gold Typography Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE]/80 via-transparent to-[#FAF6EE]/90 pointer-events-none" />

        {/* Top Header Content: Bismillah & Wedding Day */}
        <div className="relative z-10 space-y-1.5 pt-4">
          <p className="font-serif text-xl sm:text-2xl text-brown-dark tracking-wide font-medium">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          <p className="font-script text-3xl sm:text-4xl text-[#A07B33] font-normal pt-1">
            Wedding Day
          </p>

          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-brown-dark font-bold">
            08.08.26
          </p>
        </div>

        {/* Center Couple Names Gold Calligraphy (Matching User Image 2) */}
        <div className="relative z-10 my-auto py-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl font-normal tracking-tight"
            style={{
              background: "linear-gradient(135deg, #4A3B32 0%, #B87A46 50%, #7A5722 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {weddingData.groomName}
          </motion.h1>

          <div className="flex items-center justify-center gap-3 my-2">
            <span className="h-[1px] w-12 bg-[#B87A46]/50" />
            <span className="font-script text-4xl sm:text-5xl text-[#A07B33]">&</span>
            <span className="h-[1px] w-12 bg-[#B87A46]/50" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl font-normal tracking-tight"
            style={{
              background: "linear-gradient(135deg, #4A3B32 0%, #B87A46 50%, #7A5722 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {weddingData.brideName}
          </motion.h1>

          {/* Location Badge */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-sans text-brown-dark font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#A07B33]" />
            <span>{weddingData.venue.name}, {weddingData.venue.city}</span>
          </div>
        </div>

        {/* Live Countdown Component */}
        <div className="relative z-10 w-full">
          <Countdown targetDateIso={weddingData.isoDate} />
        </div>

        {/* Bottom Scroll Down Chevron Indicator */}
        <div
          onClick={scrollToNextSection}
          className="relative z-10 cursor-pointer pt-1 pb-2 flex flex-col items-center gap-1 group"
        >
          <span className="font-script text-lg text-[#A07B33] group-hover:text-brown-dark transition-colors">
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#A07B33]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
