"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Share2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleWhatsAppShare = () => {
    const textMessage = `Assalamu Alaikum! 🌸\n\nYou are cordially invited to celebrate the Wedding Dinner of *Akram & Maryam*.\n\n📅 *Date:* Saturday, 8th August 2026 at 7:30 PM\n📍 *Venue:* Oak Ray Regency, Kandy\n\nPlease view details and RSVP online here:\n${shareUrl}`;
    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const contacts = [
    {
      role: "Groom's Family Contacts",
      phone: "+94 77 123 4567",
      label: "Akram's Family",
    },
    {
      role: "Bride's Family Contacts",
      phone: "+94 77 765 4321",
      label: "Maryam's Family",
    }
  ];

  return (
    <section
      id="contact"
      className="relative py-24 bg-nude text-center overflow-hidden border-b border-gold/10"
    >
      <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-rosegold-gradient tracking-[0.15em] uppercase mb-4"
          >
            Family Contacts & Share
          </motion.h2>
          <p className="font-sans text-sm text-secondary-dark/65 tracking-widest uppercase max-w-md mx-auto mb-8">
            For queries and greetings, please feel free to reach out to our families
          </p>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
        </div>

        {/* Share Section Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 p-8 md:p-10 border border-gold/25 glass-card bg-white/40 shadow-luxury max-w-xl mx-auto rounded-sm relative"
        >
          <div className="absolute inset-2 border border-gold/5 pointer-events-none rounded-sm" />
          
          <h3 className="font-serif text-xl text-rosegold-dark tracking-wide mb-3">
            Share the Invitation
          </h3>
          <p className="font-sans text-sm text-secondary-dark/75 leading-relaxed mb-8">
            Forward this premium digital invitation to friends and family through WhatsApp to invite them to celebrate our wedding.
          </p>
          
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-serif text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5 mx-auto cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share via WhatsApp
          </button>
        </motion.div>

        {/* Contacts details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {contacts.map((contact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded-sm border border-gold/15 glass-card bg-white/30 flex flex-col items-center shadow-luxury"
            >
              <h4 className="font-serif text-base text-rosegold-dark tracking-wider mb-1">
                {contact.role}
              </h4>
              <p className="font-sans text-xs text-secondary-dark/50 tracking-widest uppercase mb-4">
                {contact.label}
              </p>
              
              <div className="font-serif text-lg text-secondary-dark font-medium mb-6">
                {contact.phone}
              </div>

              <div className="flex gap-4 w-full">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/60 hover:bg-white border border-gold/15 hover:border-gold text-gold-dark text-xs uppercase font-serif tracking-widest rounded-full transition-all duration-300 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/60 hover:bg-white border border-gold/15 hover:border-gold text-gold-dark text-xs uppercase font-serif tracking-widest rounded-full transition-all duration-300 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
