"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Heart } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
      alt: "Wedding Rings",
      category: "Details"
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      alt: "Traditional Mehendi and Flowers",
      category: "Mehndi"
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      alt: "Luxury Floral Reception Backdrop",
      category: "Decoration"
    },
    {
      src: "https://images.unsplash.com/photo-1543157148-f7936385b678?q=80&w=800&auto=format&fit=crop",
      alt: "Elegant Bridal Bouquet",
      category: "Details"
    },
    {
      src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      alt: "Ornate Bridal Dress Details",
      category: "Attire"
    },
    {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop",
      alt: "Romantic Wedding Reception Setup",
      category: "Decoration"
    }
  ];

  return (
    <section
      id="gallery"
      className="relative py-24 bg-nude border-b border-gold/10"
    >
      {/* Background floral overlays */}
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
            Captured Moments
          </motion.h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              onClick={() => setSelectedImg(img)}
              className="relative aspect-[4/3] rounded-sm overflow-hidden group cursor-pointer border border-gold/10 shadow-luxury"
            >
              {/* Image element */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay masking */}
              <div className="absolute inset-0 bg-rosegold-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center gap-2">
                <div className="p-3 rounded-full bg-white/80 text-rosegold shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Search className="w-5 h-5" />
                </div>
                <span className="font-serif text-xs uppercase tracking-[0.2em] text-white mt-2">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all rounded-full cursor-pointer z-50"
              aria-label="Close Gallery Image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
              className="relative max-w-4xl max-h-[85vh] w-full aspect-auto rounded-sm overflow-hidden border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImg.src}
                alt={selectedImg.alt}
                className="w-full h-full max-h-[85vh] object-contain mx-auto"
              />
              
              {/* Floating metadata info */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-center">
                <h4 className="font-serif text-lg tracking-wide flex justify-center items-center gap-2">
                  <Heart className="w-4 h-4 text-rosegold fill-rosegold" />
                  {selectedImg.alt}
                </h4>
                <p className="font-sans text-xs text-white/60 uppercase tracking-widest mt-1">
                  {selectedImg.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
