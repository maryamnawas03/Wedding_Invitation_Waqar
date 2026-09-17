"use client";

import React, { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("Audio playback blocked or failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Invisible HTML5 Audio tag playing a premium, romantic instrumental piano track */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-2931.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-md border border-rosegold/30 hover:border-rosegold text-rosegold hover:text-rosegold-dark hover:bg-white shadow-luxury hover:shadow-luxury-hover transition-all duration-500 transform hover:scale-105 cursor-pointer"
        aria-label={isPlaying ? "Mute Background Music" : "Unmute Background Music"}
      >
        {isPlaying ? (
          <>
            {/* Pulsing visual soundwave ripples */}
            <span className="absolute inset-0 rounded-full bg-rosegold/20 animate-ping opacity-75" />
            <Volume2 className="w-5 h-5 relative z-10" />
          </>
        ) : (
          <VolumeX className="w-5 h-5 relative z-10 text-secondary-dark/60" />
        )}
      </button>

      {/* Helper caption that slides in briefly to prompt the user */}
      {isPlaying && (
        <div className="absolute right-14 top-1/2 -translate-y-1/2 hidden md:block whitespace-nowrap bg-white/80 backdrop-blur-sm border border-rosegold/20 py-1 px-3 rounded-md text-xs font-serif text-rosegold shadow-sm animate-fade-in-up">
          Music Playing
        </div>
      )}
    </div>
  );
}
