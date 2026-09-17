"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { UserCheck, Sparkles, Utensils, Cake, Heart, Clock, Coffee } from "lucide-react";

// Icon lookup dictionary
const iconMap: Record<string, React.ElementType> = {
  UserCheck,
  Sparkles,
  Utensils,
  Cake,
  Heart,
  Coffee,
};

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="relative py-20 px-4 bg-cream-light overflow-hidden scroll-mt-6">
      <div className="max-w-xl mx-auto text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-brown-400 font-sans font-semibold mb-2">
          Program Schedule
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-brown-dark font-normal">
          Event Timeline
        </h2>
        <div className="w-16 h-[2px] bg-salmon mx-auto mt-4 rounded-full" />
      </div>

      <div className="relative max-w-lg mx-auto">
        {/* Central Vertical Connector Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] bg-salmon-200/60 -translate-x-1/2" />

        <div className="space-y-8 sm:space-y-10">
          {weddingData.timeline.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Clock;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-4 ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Timeline Icon Badge */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-salmon text-white shadow-salmon-glow shrink-0 ml-0 sm:mx-auto">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Event Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2.5rem)] glass-card rounded-2xl p-5 border border-salmon-200/40 text-left ${
                    isEven ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  <span className="inline-block text-xs font-sans font-semibold tracking-wider text-salmon-dark bg-salmon-100/80 px-3 py-1 rounded-full mb-2">
                    {item.time}
                  </span>
                  <h3 className="font-serif text-xl text-brown-dark font-medium my-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs font-sans text-gray leading-relaxed mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
