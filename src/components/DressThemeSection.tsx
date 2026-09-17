"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Shirt, Sparkles } from "lucide-react";

export const DressThemeSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-cream-light overflow-hidden">
      <div className="max-w-xl mx-auto text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-brown-400 font-sans font-semibold mb-2">
          Attire Guide
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-brown-dark font-normal">
          Dress Theme
        </h2>
        <div className="w-16 h-[2px] bg-salmon mx-auto mt-4 rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {weddingData.dressThemes.map((theme, index) => (
          <motion.div
            key={theme.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="glass-card rounded-3xl p-7 border border-salmon-200/40 text-center shadow-luxury flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-salmon-100/60 text-salmon flex items-center justify-center">
                {theme.category === "Ladies" ? (
                  <Sparkles className="w-6 h-6" />
                ) : (
                  <Shirt className="w-6 h-6" />
                )}
              </div>

              <h3 className="font-serif text-2xl text-brown-dark font-medium mb-2">
                {theme.category}
              </h3>
              <p className="text-xs font-sans text-gray leading-relaxed mb-6">
                {theme.description}
              </p>
            </div>

            {/* Visual Color Swatches Grid */}
            <div className={`grid ${
              theme.category.includes("Ladies") 
                ? "grid-cols-3 min-[380px]:grid-cols-4 sm:grid-cols-5" 
                : "grid-cols-3"
            } gap-x-3 gap-y-5 pt-6 border-t border-salmon-100/60 justify-items-center`}>
              {theme.colors.map((color) => (
                <div
                  key={color.name}
                  title={color.name}
                  className="group relative flex flex-col items-center cursor-pointer"
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-md"
                    style={{
                      backgroundColor: color.hex,
                      border: `2px solid ${color.borderHex || color.hex}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
