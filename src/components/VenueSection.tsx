"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { MapPin, Navigation, Phone, CalendarPlus } from "lucide-react";

export const VenueSection: React.FC = () => {
  // Generate Google Calendar event link dynamically
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `Wedding Reception: ${weddingData.groomName} & ${weddingData.brideName}`
    );
    const details = encodeURIComponent(
      `Join us in celebrating the Wedding Reception of ${weddingData.groomName} and ${weddingData.brideName} at ${weddingData.venue.name}, ${weddingData.venue.city}.`
    );
    const location = encodeURIComponent(
      `${weddingData.venue.name}, ${weddingData.venue.address}, ${weddingData.venue.city}`
    );
    // 2026-08-08 19:30 to 22:30 Sri Lanka Time (UTC+5:30 -> 14:00Z to 17:00Z)
    const dates = "20260808T140000Z/20260808T170000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section className="py-20 px-4 bg-cream overflow-hidden">
      <div className="max-w-xl mx-auto text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-brown-400 font-sans font-semibold mb-2">
          Location & Details
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-brown-dark font-normal">
          The Venue
        </h2>
        <div className="w-16 h-[2px] bg-salmon mx-auto mt-4 rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto glass-card rounded-3xl p-8 sm:p-10 border border-salmon-200/50 shadow-luxury text-center"
      >
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-salmon-100/70 text-salmon flex items-center justify-center">
          <MapPin className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-2xl text-brown-dark font-medium mb-2">
          {weddingData.venue.name}
        </h3>
        <p className="text-sm font-sans text-gray leading-relaxed mb-1">
          {weddingData.venue.address}
        </p>
        <p className="text-sm font-sans font-semibold text-brown-400 mb-6">
          {weddingData.venue.city}, Sri Lanka
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={weddingData.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-salmon text-white font-sans text-sm font-medium shadow-salmon-glow hover:bg-salmon-dark transition-all duration-300"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions on Google Maps</span>
          </a>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cream-dark text-brown-dark border border-brown-200/50 font-sans text-sm font-medium hover:bg-salmon-100 transition-all duration-300"
          >
            <CalendarPlus className="w-4 h-4 text-salmon" />
            <span>Add to Google Calendar</span>
          </a>

          {weddingData.venue.phone && (
            <a
              href={`tel:${weddingData.venue.phone}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-gray hover:text-brown-dark font-sans text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Venue: {weddingData.venue.phone}</span>
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};
