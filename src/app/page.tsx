"use client";

import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { OpeningEnvelope } from "@/components/OpeningEnvelope";
import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { VenueSection } from "@/components/VenueSection";
import { DressThemeSection } from "@/components/DressThemeSection";
import { RsvpSection } from "@/components/RsvpSection";
import { FooterSection } from "@/components/FooterSection";
import { FloatingActions } from "@/components/FloatingActions";

export default function Home() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [hasStartedOpening, setHasStartedOpening] = useState(false);

  // Framer Motion Scroll Progress Line at top of screen
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative min-h-screen bg-cream selection:bg-salmon-200 selection:text-brown-dark">
      {/* Top Scroll Progress Indicator Line */}
      {isEnvelopeOpened && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-salmon z-50 origin-left"
          style={{ scaleX }}
        />
      )}

      {/* Interactive Envelope Overlay */}
      <OpeningEnvelope 
        onStartOpen={() => setHasStartedOpening(true)}
        onOpen={() => setIsEnvelopeOpened(true)} 
      />

      {/* Full Digital Invitation Page Journey */}
      <div
        className={`transition-opacity duration-1000 ${
          isEnvelopeOpened ? "opacity-100" : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        <HeroSection />
        <TimelineSection />
        <VenueSection />
        <DressThemeSection />
        <RsvpSection />
        <FooterSection />
        <FloatingActions autoPlayAudio={hasStartedOpening} />
      </div>
    </main>
  );
}
