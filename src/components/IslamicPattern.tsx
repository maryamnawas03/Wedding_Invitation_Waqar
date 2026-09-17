import React from "react";

export function IslamicDivider() {
  return (
    <div className="flex items-center justify-center my-12 w-full max-w-lg mx-auto opacity-75">
      {/* Tapered line leading to emblem */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-gold" />
      
      {/* Beautiful Islamic Geometric Star Emblem */}
      <svg
        viewBox="0 0 40 40"
        className="w-10 h-10 mx-4 text-gold fill-transparent"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Eight-pointed star (Rub el Hizb) interlocking squares */}
        <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 20 20)" />
        <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 20 20)" />
        
        {/* Inner detail rings */}
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />

        {/* Small corner leaf accents */}
        <circle cx="20" cy="4" r="1.5" fill="currentColor" />
        <circle cx="20" cy="36" r="1.5" fill="currentColor" />
        <circle cx="4" cy="20" r="1.5" fill="currentColor" />
        <circle cx="36" cy="20" r="1.5" fill="currentColor" />
      </svg>

      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/30 to-gold" />
    </div>
  );
}

export function IslamicBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden" aria-hidden="true">
      {/* Detailed interlocking Islamic grid overlay using SVG patterns */}
      <svg width="100%" height="100%">
        <defs>
          <pattern id="islamic-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <g stroke="#D4AF37" strokeWidth="1" fill="none">
              {/* Central star lines */}
              <path d="M 60 0 L 60 120 M 0 60 L 120 60" />
              <path d="M 0 0 L 120 120 M 0 120 L 120 0" />
              
              {/* Geometric squares */}
              <rect x="30" y="30" width="60" height="60" transform="rotate(0 60 60)" />
              <rect x="30" y="30" width="60" height="60" transform="rotate(45 60 60)" />
              
              {/* Outer boundary circles */}
              <circle cx="60" cy="60" r="42" />
              <circle cx="60" cy="60" r="15" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-grid)" />
      </svg>
    </div>
  );
}
