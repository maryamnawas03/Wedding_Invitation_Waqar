"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Users, User, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { RsvpFormData } from "@/types/wedding";

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: "",
    phoneNumber: "",
    attending: "yes",
    guestCount: 1,
    specialNote: "",
  });

  // Separate display value so the field can be fully cleared during typing
  const [guestCountInput, setGuestCountInput] = useState("1");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E89D93", "#8C6D58", "#FAF7F2", "#FFFFFF"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
        triggerConfetti();
      } else {
        setErrorMessage(data.message || "Failed to submit RSVP.");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-cream overflow-hidden scroll-mt-10">
      <div className="max-w-xl mx-auto text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-brown-400 font-sans font-semibold mb-2">
          Kindly Respond
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-brown-dark font-normal">
          RSVP
        </h2>
        <p className="text-xs font-sans text-gray mt-2">
          Please let us know if you will be joining us for our special day
        </p>
        <div className="w-16 h-[2px] bg-salmon mx-auto mt-4 rounded-full" />
      </div>

      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card-deep rounded-3xl p-8 sm:p-10 border border-salmon-300/40 text-center shadow-luxury"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-salmon-100/80 text-salmon flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-brown-dark font-medium mb-2">
                Thank You!
              </h3>
              <p className="text-sm font-sans text-gray leading-relaxed mb-6">
                Your response has been recorded. We look forward to celebrating with you!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-sans text-salmon-dark hover:underline font-medium"
              >
                Update your response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card-deep rounded-3xl p-6 sm:p-8 border border-salmon-200/50 shadow-luxury space-y-5"
            >
              {errorMessage && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-sans border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name Field */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-brown-400 font-semibold mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ahamed Farook"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-salmon-200/50 text-sm font-sans text-brown-dark placeholder-brown-300 focus:outline-none focus:border-salmon transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-brown-400 font-semibold mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-salmon-200/50 text-sm font-sans text-brown-dark placeholder-brown-300 focus:outline-none focus:border-salmon transition-colors"
                  />
                </div>
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-brown-400 font-semibold mb-1.5">
                  Will You Attend? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "yes" })}
                    className={`py-3 rounded-xl text-xs font-sans font-semibold transition-all ${
                      formData.attending === "yes"
                        ? "bg-salmon text-white shadow-salmon-glow"
                        : "bg-cream text-brown-dark border border-salmon-200/50 hover:bg-salmon-100/50"
                    }`}
                  >
                    Yes, Joyfully Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: "no" })}
                    className={`py-3 rounded-xl text-xs font-sans font-semibold transition-all ${
                      formData.attending === "no"
                        ? "bg-brown-dark text-white"
                        : "bg-cream text-brown-dark border border-salmon-200/50 hover:bg-brown-100/50"
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {/* Number of Guests (Only if attending) */}
              {formData.attending === "yes" && (
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-brown-400 font-semibold mb-1.5">
                    Number of Guests Attending
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                    <input
                      type="number"
                      min="1"
                      value={guestCountInput}
                      onChange={(e) => {
                        // Allow free typing — store raw string so field can be cleared
                        setGuestCountInput(e.target.value);
                        const parsed = parseInt(e.target.value);
                        if (!isNaN(parsed) && parsed >= 1) {
                          setFormData({ ...formData, guestCount: parsed });
                        }
                      }}
                      onBlur={() => {
                        // On focus loss, snap to minimum 1 if empty or invalid
                        const parsed = parseInt(guestCountInput);
                        const safe = isNaN(parsed) || parsed < 1 ? 1 : parsed;
                        setGuestCountInput(String(safe));
                        setFormData({ ...formData, guestCount: safe });
                      }}
                      placeholder="e.g. 4"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-salmon-200/50 text-sm font-sans text-brown-dark placeholder-brown-300 focus:outline-none focus:border-salmon transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Special Note */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-brown-400 font-semibold mb-1.5">
                  Message / Warm Wish (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-brown-300" />
                  <textarea
                    rows={3}
                    value={formData.specialNote}
                    onChange={(e) => setFormData({ ...formData, specialNote: e.target.value })}
                    placeholder="Leave a message for Akram & Maryam..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-salmon-200/50 text-sm font-sans text-brown-dark placeholder-brown-300 focus:outline-none focus:border-salmon transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-salmon text-white font-sans text-sm font-semibold shadow-salmon-glow hover:bg-salmon-dark transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Submitting..." : "Submit RSVP"}</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
