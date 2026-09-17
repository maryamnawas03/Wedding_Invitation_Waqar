"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Navigation } from "lucide-react";

export default function Venue() {
  return (
    <section
      id="venue"
      className="relative py-24 bg-nude border-b border-gold/10 overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-rosegold-gradient tracking-[0.15em] uppercase mb-4"
          >
            The Venue & Time
          </motion.h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Venue details column */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 rounded-sm border border-gold/25 glass-card bg-white/40 shadow-luxury"
          >
            <div className="space-y-8">
              <h3 className="font-serif text-2xl text-rosegold-dark tracking-wide mb-6">
                Wedding Dinner Venue
              </h3>

              {/* Detail Items */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-rosegold/10 text-rosegold mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-widest text-gold-dark font-semibold">
                    Address
                  </h4>
                  <p className="font-sans text-sm text-secondary-dark/80 mt-1 leading-relaxed">
                    Oak Ray Regency, <br />
                    Deveni Rajasinghe Mawatha, <br />
                    Kandy, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-rosegold/10 text-rosegold mt-1">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-widest text-gold-dark font-semibold">
                    Date
                  </h4>
                  <p className="font-sans text-sm text-secondary-dark/80 mt-1">
                    Saturday, 8th August 2026
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-rosegold/10 text-rosegold mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-widest text-gold-dark font-semibold">
                    Time
                  </h4>
                  <p className="font-sans text-sm text-secondary-dark/80 mt-1">
                    7:30 PM onwards
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Link Action */}
            <div className="mt-12 pt-6 border-t border-gold/15">
              <a
                href="https://maps.app.goo.gl/z5sRL5zxRMMW3xmJ8?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-rosegold hover:bg-rosegold-dark text-white rounded-full font-serif text-xs uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:-translate-y-0.5 cursor-pointer"
              >
                <Navigation className="w-4 h-4 fill-white" />
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 h-[350px] lg:h-auto min-h-[350px] relative rounded-sm overflow-hidden border border-gold/25 shadow-luxury"
          >
            <iframe
              title="Google Map location of Oak Ray Regency"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.568478491759!2d80.6030999!3d7.289871799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368a52e90f235%3A0xe10433299778ee69!2sOak%20Ray%20Regency!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              className="absolute inset-0 w-full h-full border-0 grayscale-[10%] contrast-[105%]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
