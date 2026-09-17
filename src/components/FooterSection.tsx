"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Heart } from "lucide-react";

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-cream-light text-center border-t border-salmon-200/40 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Quranic Verse Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-salmon-200/40"
        >
          <p className="font-serif text-lg sm:text-xl text-brown-dark leading-relaxed mb-3">
            {weddingData.quranVerse.arabic}
          </p>
          <p className="text-xs font-sans text-gray italic leading-relaxed mb-2">
            "{weddingData.quranVerse.english}"
          </p>
          <p className="text-[10px] font-sans uppercase tracking-widest text-brown-400 font-semibold">
            — {weddingData.quranVerse.reference}
          </p>
        </motion.div>

        {/* Watercolor Couple Illustration – Transparent Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-52 h-56 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/couple_img_2.png"
            alt="Akram & Maryam Illustration"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </motion.div>

        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3"
        >
          <p className="text-sm font-serif text-brown-dark italic">
            We look forward to celebrating our special day with you.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-brown-dark">
            <span className="font-serif text-xl sm:text-2xl tracking-tight">
              {weddingData.groomName.split(" ").slice(-1)[0]}
            </span>
            <Heart className="w-4 h-4 text-salmon fill-salmon animate-pulse" />
            <span className="font-serif text-xl sm:text-2xl tracking-tight">
              {weddingData.brideName}
            </span>
          </div>

          <p className="text-[10px] font-sans text-brown-300 uppercase tracking-widest pt-4">
            08 August 2026 • Oak Ray Regency, Kandy
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
