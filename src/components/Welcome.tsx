"use client";

import React from "react";
import { motion } from "framer-motion";
import { IslamicDivider } from "./IslamicPattern";

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="relative py-24 bg-nude text-center overflow-hidden border-b border-gold/10"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#B76E79_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative px-6 py-12 md:p-16 rounded-sm border border-gold/25 glass-card bg-white/30"
        >
          {/* Decorative corner brackets inside the welcome card */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40" />

          {/* Assalamu Alaikum Arabic Calligraphy Text */}
          <h3 className="font-serif text-lg tracking-[0.2em] uppercase text-gold-dark mb-2">
            Assalamu Alaikum
          </h3>
          <p className="font-sans text-[10px] tracking-[0.25em] text-secondary-dark/60 uppercase mb-8">
            Peace be upon you
          </p>

          {/* Qur'an Verse */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-8 px-4"
          >
            <p className="font-serif italic text-base md:text-lg text-secondary-dark/80 leading-relaxed max-w-2xl mx-auto">
              &ldquo;And among His signs is this, that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.&rdquo;
            </p>
            <p className="font-sans text-[10px] tracking-[0.2em] text-gold-dark uppercase mt-3">
              — Surah Ar-Rum [30:21]
            </p>
          </motion.div>

          <IslamicDivider />

          {/* Invitation text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 space-y-6 max-w-xl mx-auto"
          >
            <p className="font-script text-4xl text-rosegold">
              Dearest Family & Friends,
            </p>
            
            <p className="font-sans text-sm md:text-base text-secondary-dark/85 leading-relaxed">
              With the grace of Almighty Allah, we cordially invite you to share our joy as we, 
              <strong className="text-rosegold-dark font-medium block mt-1 font-serif tracking-wide">Akram & Maryam</strong>
              unite our hearts and lives. We would be honored by your presence to witness and bless our vows on this beautiful journey of love and commitment.
            </p>
            
            <p className="font-serif text-xs md:text-sm tracking-[0.15em] text-gold-dark uppercase mt-6">
              Please join us to celebrate our union.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
