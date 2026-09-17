"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface RSVPData {
  name: string;
  attending: string;
  guests: string;
  message: string;
}

export default function RSVP() {
  const [formData, setFormData] = useState<RSVPData>({
    name: "",
    attending: "yes",
    guests: "1",
    message: ""
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already RSVP'd previously
    const existingRSVP = localStorage.getItem("akram_maryam_rsvp");
    if (existingRSVP) {
      setFormData(JSON.parse(existingRSVP));
      setHasSubmitted(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && value.trim()) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      localStorage.setItem("akram_maryam_rsvp", JSON.stringify(formData));
      setIsSubmitting(false);
      setHasSubmitted(true);

      // Trigger premium celebration confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F8A0A0", "#B76E79", "#D4AF37", "#E0A899", "#FAF7F2"]
      });
    }, 800);
  };

  const handleReset = () => {
    localStorage.removeItem("akram_maryam_rsvp");
    setFormData({ name: "", attending: "yes", guests: "1", message: "" });
    setHasSubmitted(false);
  };

  return (
    <section
      id="rsvp"
      className="relative py-24 bg-nude border-b border-gold/10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#B76E79_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-rosegold-gradient tracking-[0.15em] uppercase mb-4"
          >
            Kindly RSVP
          </motion.h2>
          <p className="font-sans text-xs text-secondary-dark/65 tracking-widest uppercase mb-4">
            Please respond by July 15, 2026
          </p>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
        </div>

        <motion.div
          layout
          className="relative p-8 md:p-10 rounded-sm border border-gold/25 glass-card bg-white/40 shadow-luxury overflow-hidden"
        >
          {/* Double line border overlay */}
          <div className="absolute inset-2 border border-gold/5 pointer-events-none rounded-sm" />

          <AnimatePresence mode="wait">
            {!hasSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Guest Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-serif text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gold/15 focus:border-rosegold focus:outline-none rounded-sm font-sans text-sm text-secondary-dark transition-all duration-300"
                  />
                  {error && <span className="text-xs text-rosegold mt-1 font-medium">{error}</span>}
                </div>

                {/* Attendance */}
                <div className="flex flex-col">
                  <label className="font-serif text-xs uppercase tracking-widest text-gold-dark font-semibold mb-3">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative flex items-center justify-center p-4 border rounded-sm cursor-pointer transition-all duration-300 font-serif text-sm tracking-wider ${formData.attending === "yes" ? "border-rosegold bg-rosegold/10 text-rosegold-dark" : "border-gold/15 bg-white/40 hover:border-gold/35"}`}>
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.attending === "yes"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      Joyfully Attend
                    </label>
                    <label className={`relative flex items-center justify-center p-4 border rounded-sm cursor-pointer transition-all duration-300 font-serif text-sm tracking-wider ${formData.attending === "no" ? "border-rosegold bg-rosegold/10 text-rosegold-dark" : "border-gold/15 bg-white/40 hover:border-gold/35"}`}>
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formData.attending === "no"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      Regretfully Decline
                    </label>
                  </div>
                </div>

                {/* Number of Guests (Only show if attending) */}
                {formData.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col"
                  >
                    <label htmlFor="guests" className="font-serif text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
                      Number of Guests (including yourself)
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gold/15 focus:border-rosegold focus:outline-none rounded-sm font-sans text-sm text-secondary-dark transition-all duration-300"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                    </select>
                  </motion.div>
                )}

                {/* Message / Well wishes */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="font-serif text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">
                    Well Wishes & Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Send your blessings & wishes to the couple"
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gold/15 focus:border-rosegold focus:outline-none rounded-sm font-sans text-sm text-secondary-dark transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-rosegold hover:bg-rosegold-dark text-white disabled:bg-rosegold/50 rounded-full font-serif text-xs uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:-translate-y-0.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send RSVP
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-6"
              >
                {/* Animated checkmark circle */}
                <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                
                <h3 className="font-serif text-2xl text-rosegold-dark font-medium">
                  {formData.attending === "yes"
                    ? "Thank You for Accepting!"
                    : "Thank You for letting us know!"}
                </h3>
                
                <p className="font-sans text-sm text-secondary-dark/75 leading-relaxed max-w-sm mx-auto">
                  {formData.attending === "yes"
                    ? `We are delighted to know that you will join our celebration. We look forward to seeing you at Oak Ray Regency, Kandy!`
                    : `We are sorry that you cannot join us on our special day. Your blessings and well wishes are highly appreciated.`}
                </p>

                {formData.message && (
                  <div className="p-4 bg-white/50 border border-gold/10 rounded-sm italic text-xs text-secondary-dark/65 max-w-xs mx-auto">
                    &ldquo;{formData.message}&rdquo;
                  </div>
                )}

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 border border-rosegold/30 hover:border-rosegold text-rosegold text-xs uppercase font-serif tracking-widest rounded-full hover:bg-white/50 transition-all cursor-pointer"
                  >
                    Change RSVP Status
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
