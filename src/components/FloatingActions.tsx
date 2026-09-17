"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageCircle, CalendarCheck, Volume2, VolumeX } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface FloatingActionsProps {
  autoPlayAudio?: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ autoPlayAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!(window as any).weddingAudio) {
        (window as any).weddingAudio = new Audio(
          "/assets/bgm_nasheed.mp3"
        );
        (window as any).weddingAudio.loop = true;
        (window as any).weddingAudio.volume = 0.5;
      }
      audioRef.current = (window as any).weddingAudio;
      if (!(window as any).weddingAudio.paused) {
        setIsPlaying(true);
      }
    }
  }, []);

  useEffect(() => {
    if (autoPlayAudio && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Audio autoplay prevented by browser:", err));
      } else {
        setIsPlaying(true);
      }
    }
  }, [autoPlayAudio]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `You are invited to the Wedding Reception of ${weddingData.groomName} & ${weddingData.brideName} on ${weddingData.displayDate} at ${weddingData.venue.name}, ${weddingData.venue.city}.`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2.5 items-center bg-cream/90 backdrop-blur-md p-2 rounded-full border border-salmon-200/50 shadow-luxury"
        >
          {/* Circular Floating Audio Toggle Button (matching reference site) */}
          <button
            onClick={toggleAudio}
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            className={`p-3.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-brown-dark text-white shadow-salmon-glow"
                : "bg-cream-dark text-brown-dark hover:bg-salmon-100"
            }`}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 animate-pulse text-salmon-200" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray" />
            )}
          </button>

          {/* Directions Button */}
          <a
            href={weddingData.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Get Directions"
            className="p-3 rounded-full bg-cream-dark text-brown-dark hover:bg-salmon hover:text-white transition-all duration-300"
          >
            <MapPin className="w-5 h-5" />
          </a>

          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            title="Share via WhatsApp"
            className="p-3 rounded-full bg-cream-dark text-brown-dark hover:bg-salmon hover:text-white transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* RSVP Quick Jump Button */}
          <button
            onClick={() => scrollToSection("rsvp")}
            title="RSVP Now"
            className="p-3.5 rounded-full bg-salmon text-white shadow-salmon-glow hover:bg-salmon-dark transition-all duration-300"
          >
            <CalendarCheck className="w-5 h-5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
