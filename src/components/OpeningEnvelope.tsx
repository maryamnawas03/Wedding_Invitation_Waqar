"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningEnvelopeProps {
  onStartOpen?: () => void;
  onOpen: () => void;
}

/**
 * =========================================================================
 * HOW TO ADD YOUR ENVELOPE OPENING VIDEO:
 * =========================================================================
 * 
 * 1. PLACE YOUR VIDEO FILE:
 *    Put your video file (usually an .mp4 file) inside the public folder:
 *    --> /Users/maryamnawas/Desktop/Wedding invitation/public/assets/envelope_opening.mp4
 * 
 * 2. UPDATE THE VIDEO SOURCE LINK:
 *    Update the variable `VIDEO_SOURCE_PATH` below to match your video path.
 *    If placed as above, use: "/assets/envelope_opening.mp4".
 * 
 * 3. FALLBACK:
 *    If the video is missing, loading fails, or is not defined, this component
 *    will automatically use our high-fidelity 3D CSS fallback envelope animation
 *    so your website never breaks!
 * 
 * =========================================================================
 */
const VIDEO_SOURCE_PATH: string = "/assets/envelope_opening.mp4"; 

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onStartOpen, onOpen }) => {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Custom animation controls for the 3D CSS fallback
  const [cssPhase, setCssPhase] = useState<"idle" | "animating">("idle");
  const [topFlapRotate, setTopFlapRotate] = useState(0);
  const [sealGlowOpacity, setSealGlowOpacity] = useState(0);
  const [sealGlowScale, setSealGlowScale] = useState(0.8);
  const [innerLightOpacity, setInnerLightOpacity] = useState(0);
  const [edgeGlowOpacity, setEdgeGlowOpacity] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  // Double check if video is cached/loaded to avoid React event listener race conditions
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 2) {
        setIsVideoLoaded(true);
      }
      
      const handleLoaded = () => setIsVideoLoaded(true);
      video.addEventListener("canplay", handleLoaded);
      video.addEventListener("loadeddata", handleLoaded);
      video.addEventListener("loadedmetadata", handleLoaded);
      
      return () => {
        video.removeEventListener("canplay", handleLoaded);
        video.removeEventListener("loadeddata", handleLoaded);
        video.removeEventListener("loadedmetadata", handleLoaded);
      };
    }
  }, [useFallback]);

  // Triggered when user clicks to open
  const handleOpen = useCallback(async () => {
    if (phase !== "idle") return;

    // Start background audio synchronously in the exact same call stack as the user tap gesture
    if (typeof window !== "undefined") {
      if (!(window as any).weddingAudio) {
        (window as any).weddingAudio = new Audio(
          "/assets/bgm_nasheed.mp3"
        );
        (window as any).weddingAudio.loop = true;
        (window as any).weddingAudio.volume = 0.5;
      }
      (window as any).weddingAudio.play().catch((err: any) => {
        console.log("Global audio play failed:", err);
      });
    }

    // Trigger start of opening (starts state/UI transitions)
    if (onStartOpen) {
      onStartOpen();
    }

    if (!useFallback && videoRef.current) {
      setPhase("playing");
      try {
        // Keep video muted — BGM nasheed handles all audio
        videoRef.current.muted = true;
        // Play the pre-rendered envelope video (silent)
        await videoRef.current.play();
      } catch (err) {
        console.warn("Video playback blocked or failed, switching to 3D CSS fallback:", err);
        setUseFallback(true);
        triggerCssFallback();
      }
    } else {
      triggerCssFallback();
    }
  }, [phase, useFallback, onStartOpen]);

  // Fallback 3D CSS Animation Flow
  const triggerCssFallback = async () => {
    setCssPhase("animating");
    setPhase("playing");

    // 1. Warm seal glow lights up
    setSealGlowOpacity(1);
    setSealGlowScale(1.15);
    setInnerLightOpacity(1);
    setEdgeGlowOpacity(1);

    await new Promise((r) => setTimeout(r, 350));

    // 2. Unfold top flap (rotate 180 degrees upwards)
    // Animate smoothly over 1.8s
    const start = performance.now();
    const duration = 1800;
    
    const animateFlap = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setTopFlapRotate(-180 * ease);

      if (progress < 1) {
        requestAnimationFrame(animateFlap);
      }
    };
    requestAnimationFrame(animateFlap);

    await new Promise((r) => setTimeout(r, 2200));

    // 3. Smooth transition to main content
    onOpen();
    setOverlayOpacity(0);
    
    await new Promise((r) => setTimeout(r, 900));
    setPhase("done");
  };

  // Video finished playing
  const handleVideoEnded = () => {
    onOpen();
    // Fade out overlay
    setOverlayOpacity(0);
    setTimeout(() => {
      setPhase("done");
    }, 900);
  };

  // Handle video loading failure
  const handleVideoError = () => {
    console.log("Video source not found, enabling responsive 3D CSS animation fallback.");
    setUseFallback(true);
  };

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-screen"
        animate={{ opacity: overlayOpacity }}
        onClick={handleOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "#FAF7F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          touchAction: "none",
          WebkitTapHighlightColor: "transparent",
          cursor: "pointer"
        }}
      >
        {/* =========================================================================
            APPROACH A: PRE-RENDERED VIDEO PLAYER (DEFAULT)
            ========================================================================= */}
        {!useFallback && (
          <video
            ref={videoRef}
            src={VIDEO_SOURCE_PATH}
            poster="/assets/envelope_poster.png"
            playsInline
            muted // Required for video to autoplay correctly on mobile browsers
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              pointerEvents: "none",
              zIndex: 1
            }}
          />
        )}

        {/* Video loading overlay placeholder */}
        {!useFallback && !isVideoLoaded && (
          <div style={{ position: "absolute", color: "#8a7060", fontSize: "10px", letterSpacing: "0.2em" }}>
            LOADING INVITATION...
          </div>
        )}

        {/* =========================================================================
            APPROACH B: 3D CSS ENVELOPE FALLBACK (PLAYS IF VIDEO SOURCING NOT DETECTED)
            ========================================================================= */}
        {(useFallback || (VIDEO_SOURCE_PATH === "")) && (
          <div
            style={{
              position: "relative",
              width: "clamp(320px, 90vw, 420px)",
              height: "min(85vh, 630px)",
              perspective: "1500px",
              perspectiveOrigin: "50% 50%"
            }}
          >
            {/* Pocket Backing */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "4px",
                background: "#F5EFE2",
                boxShadow: "inset 0 10px 30px rgba(74, 59, 50, 0.08)",
                overflow: "hidden",
                zIndex: 1
              }}
            >
              {/* Pocket Interior Warm radial Glow */}
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  right: "10%",
                  height: "70%",
                  background: "radial-gradient(circle, rgba(255,223,162,0.7) 0%, rgba(255,183,115,0.25) 50%, transparent 80%)",
                  opacity: innerLightOpacity,
                  transition: "opacity 0.7s ease-out",
                  pointerEvents: "none"
                }}
              />
            </div>

            {/* Top Flap (3D folding triangle) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                transformOrigin: "center top",
                transformStyle: "preserve-3d",
                transform: `rotateX(${topFlapRotate}deg)`,
                zIndex: 4,
                willChange: "transform"
              }}
            >
              {/* Front side of top flap */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  clipPath: "polygon(0 0, 100% 0, 50% 48%)",
                  transform: "rotateX(0deg)"
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/envelope_front.png"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />
              </div>

              {/* Back side of top flap */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  clipPath: "polygon(0 0, 100% 0, 50% 48%)",
                  transform: "rotateX(180deg)",
                  background: "#EADDC6",
                  borderBottom: "1px solid rgba(212,175,55,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "12px",
                    border: "1px solid rgba(212,175,55,0.15)",
                    clipPath: "polygon(0 0, 100% 0, 50% 48%)",
                    opacity: 0.15,
                    backgroundImage: "url('/assets/envelope_front.png')",
                    backgroundSize: "cover"
                  }}
                />
              </div>
            </div>

            {/* Bottom pocket body */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 48%)",
                zIndex: 3,
                filter: "drop-shadow(0 -5px 15px rgba(74, 59, 50, 0.08))"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/envelope_front.png"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            </div>

            {/* Diagonal edge glowing gold lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 3,
                opacity: edgeGlowOpacity,
                transition: "opacity 0.9s ease-out",
                pointerEvents: "none"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "48%",
                  background: "linear-gradient(to bottom right, transparent 48%, #EADDC6 49%, #FFF3D6 50%, #EADDC6 51%, transparent 52%)",
                  opacity: 0.9,
                  filter: "drop-shadow(0 0 4px rgba(255,223,162,0.8))"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "50%",
                  height: "48%",
                  background: "linear-gradient(to bottom left, transparent 48%, #EADDC6 49%, #FFF3D6 50%, #EADDC6 51%, transparent 52%)",
                  opacity: 0.9,
                  filter: "drop-shadow(0 0 4px rgba(255,223,162,0.8))"
                }}
              />
            </div>

            {/* Wax seal glow halo ring */}
            <div
              style={{
                position: "absolute",
                top: "48%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(" + sealGlowScale + ")",
                opacity: sealGlowOpacity,
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "radial-gradient(circle, transparent 25%, rgba(255,225,140,0.95) 45%, rgba(255,180,80,0.6) 65%, rgba(212,175,55,0.1) 80%, transparent 100%)",
                zIndex: 8,
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                pointerEvents: "none"
              }}
            />

            {/* Idle Breathing Glow behind the seal */}
            {cssPhase === "idle" && (
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  top: "48%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,223,162,0.45) 0%, rgba(255,183,115,0.1) 50%, transparent 70%)",
                  zIndex: 5,
                  pointerEvents: "none"
                }}
              />
            )}
          </div>
        )}

        {/* Click Interaction overlay layer */}
        {phase === "idle" && (
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              pointerEvents: "none"
            }}
          >
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "8px", color: "#8a7060" }}
            >
              ∧
            </motion.span>
            <span
              style={{
                fontFamily: "var(--font-cinzel, Georgia, serif)",
                fontSize: "6px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8a7060"
              }}
            >
              tap to open
            </span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
