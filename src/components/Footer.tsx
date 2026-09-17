"use client";

import React from "react";
import { ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-12 bg-nude text-center border-t border-gold/10 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.005] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 bg-white/50 hover:bg-white border border-gold/20 hover:border-gold text-gold-dark rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 mb-8 cursor-pointer"
          aria-label="Scroll to top of invitation"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <div className="font-script text-2xl text-rosegold mb-2">
          Akram & Maryam
        </div>

        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary-dark/50">
          Saturday, August 8, 2026 • Oak Ray Regency, Kandy
        </p>

        <div className="h-[1px] w-24 bg-gold/20 my-6" />

        <p className="font-sans text-xs text-secondary-dark/60 flex items-center justify-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-rosegold fill-rosegold" /> for Akram & Maryam
        </p>
        
        <p className="font-sans text-[9px] text-secondary-dark/40 uppercase tracking-widest mt-2">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
