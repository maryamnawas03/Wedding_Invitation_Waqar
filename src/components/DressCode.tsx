"use client";

import React from "react";
import { motion } from "framer-motion";

interface ColorSwatch {
  name: string;
  hex: string;
}

export default function DressCode() {
  const ladiesColors: ColorSwatch[] = [
    { name: "Champagne", hex: "#EED4B6" },
    { name: "Beige", hex: "#D5C0AB" },
    { name: "Ivory", hex: "#F4EFE0" },
    { name: "Taupe", hex: "#B69882" },
    { name: "Mauve", hex: "#B18F8A" },
    { name: "Dusty Rose", hex: "#C59B93" },
    { name: "Blush Pink", hex: "#ECC1B9" },
    { name: "Warm Nude", hex: "#DABBA3" },
    { name: "Sage Grey", hex: "#B3BCB3" },
    { name: "Silver Grey", hex: "#D1D3D4" },
    { name: "Pearl Grey", hex: "#C5C9CD" },
    { name: "Soft Lilac", hex: "#C8BCC9" },
    { name: "Rose Gold", hex: "#C99E92" },
    { name: "Mocha", hex: "#8C6F5E" },
    { name: "Greige", hex: "#AD9D8F" }
  ];

  const gentsColors: ColorSwatch[] = [
    { name: "Charcoal Grey", hex: "#3B3E42" },
    { name: "Graphite Grey", hex: "#585A5E" },
    { name: "Dark Steel Grey", hex: "#4A525A" },
    { name: "Black", hex: "#1E1E1E" },
    { name: "Navy Blue", hex: "#2B3B4C" },
    { name: "Deep Midnight Blue", hex: "#182230" }
  ];

  return (
    <section
      id="dresscode"
      className="relative py-24 bg-nude border-b border-gold/10 overflow-hidden"
    >
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Main Outer Card mimicking premium paper stock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative bg-[#FAF8F5] border border-[#E6D7C8] p-8 md:p-16 rounded-sm shadow-luxury max-w-3xl mx-auto"
        >
          {/* Subtle textured paper overlay effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_15%,transparent_16%)] bg-[size:10px_10px] opacity-40 pointer-events-none" />

          {/* Double narrow border frame */}
          <div className="absolute inset-3 border border-[#E6D7C8]/40 pointer-events-none rounded-sm" />
          <div className="absolute inset-4 border border-[#E6D7C8]/20 pointer-events-none rounded-sm" />

          {/* Leaf-embossed details in top-right and bottom-left corners */}
          <div className="absolute top-6 right-6 text-[#E6D7C8]/40 pointer-events-none hidden md:block">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,90 Q40,60 80,80 Q50,40 90,10 Q60,50 10,90" />
            </svg>
          </div>
          <div className="absolute bottom-6 left-6 text-[#E6D7C8]/40 rotate-180 pointer-events-none hidden md:block">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
              <path d="M10,90 Q40,60 80,80 Q50,40 90,10 Q60,50 10,90" />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            {/* Elegant Calligraphic Title */}
            <h2 className="font-script text-5xl md:text-7xl text-[#8E4450] py-2 mb-2 select-none tracking-wide">
              dress instructions
            </h2>

            <p className="font-serif text-[10px] tracking-[0.25em] text-[#8C7C6D] uppercase mb-8">
              Each family may pick one nude colour
            </p>

            {/* General Attire Rules list matching layout of image */}
            <div className="max-w-lg mx-auto space-y-3 font-serif text-[#6B5A4B] text-xs md:text-sm tracking-wider uppercase mb-12 border-b border-[#E6D7C8]/50 pb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                <p>Ladies may wear either an abaya or Pakistani Shalwar</p>
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                <p>Kids may wear anything you prefer</p>
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                <p>Gents are encouraged to wear a blazer</p>
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
              </div>
            </div>

            {/* Colors Section Grid Split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-center">
              
              {/* Nude colors for Ladies & Kids */}
              <div className="md:col-span-7 p-6 border border-[#E6D7C8]/30 rounded-lg bg-white/30">
                <h3 className="font-serif text-xs md:text-sm uppercase tracking-widest text-[#8E4450] font-semibold mb-6">
                  Nude Colours For Ladies & Kids
                </h3>
                
                {/* 15 Swatches Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                  {ladiesColors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center group">
                      <div
                        style={{ backgroundColor: color.hex }}
                        className="w-10 h-10 rounded-full border border-white shadow-sm transition-transform duration-500 group-hover:scale-105 relative"
                      >
                        {/* Shimmer/metallic gradient overlay specifically for Rose Gold */}
                        {color.name === "Rose Gold" && (
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent mix-blend-overlay" />
                        )}
                      </div>
                      <span className="font-sans text-[9px] text-[#8C7C6D]/80 tracking-wider mt-1.5 whitespace-nowrap">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors for Gents */}
              <div className="md:col-span-5 p-6 border border-[#E6D7C8]/30 rounded-lg bg-white/30 h-full flex flex-col">
                <h3 className="font-serif text-xs md:text-sm uppercase tracking-widest text-[#8E4450] font-semibold mb-6">
                  Colours For Gents
                </h3>

                {/* 6 Swatches Grid */}
                <div className="grid grid-cols-2 gap-6 justify-items-center my-auto">
                  {gentsColors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center group">
                      <div
                        style={{ backgroundColor: color.hex }}
                        className="w-10 h-10 rounded-full border border-white shadow-sm transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="font-sans text-[9px] text-[#8C7C6D]/80 tracking-wider mt-1.5 whitespace-nowrap">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer thank you note */}
            <div className="mt-16 pt-8 border-t border-[#E6D7C8]/50">
              <p className="font-serif text-[10px] tracking-[0.25em] text-[#8C7C6D] uppercase mb-2">
                Thank you for celebrating with us
              </p>
              <p className="font-script text-3xl md:text-4xl text-[#8E4450]">
                We can&apos;t wait to see you!
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
