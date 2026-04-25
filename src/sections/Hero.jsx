import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

/**
 * Data HEADLINES didefinisikan secara lokal di sini untuk memastikan 
 * file dapat dikompilasi dengan benar di lingkungan pratinjau. 
 * Di VS Code, Anda bisa memindahkan ini ke src/utils/constants.js
 */
const HEADLINES = [
  { 
    top: "STOP WASTING TIME.", 
    bottom: "MULAI OTOMATISASI.", 
    sub: "Waktu adalah aset termahal Anda. Jangan habiskan untuk administrasi sampah. Biarkan kode saya yang bekerja.",
    color: "#00ff41",
    shadow: "4px 4px 0px #004411"
  },
  { 
    top: "LOGIKA GURU.", 
    bottom: "KODE EKSEKUTOR.", 
    sub: "Saya mengerti manusia lebih baik dari developer biasa, dan saya menulis kode lebih tajam dari imajinasi Anda.",
    color: "#ff0055",
    shadow: "4px 4px 0px #440011"
  },
  { 
    top: "DARI CHAOS.", 
    bottom: "JADI SOLUSI.", 
    sub: "Masalah Anda mungkin rumit, tapi solusinya tidak harus begitu. Mari bedah dan rakit kembali sistem Anda.",
    color: "#00d4ff",
    shadow: "4px 4px 0px #002244"
  }
];

/**
 * Komponen Hero
 * Menampilkan headline yang berganti secara otomatis dengan animasi halus.
 * @param {number} headlineIndex - Index headline saat ini yang dikontrol dari App.jsx
 */
const Hero = ({ headlineIndex = 0 }) => {
  return (
    <section className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="h-[350px] md:h-[450px] flex flex-col justify-center">
        {/* Animasi Headline Utama */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`headline-${headlineIndex}`} 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: 20, opacity: 0 }} 
            transition={{ duration: 0.6, ease: "circOut" }}
          >
            <div className="mb-4">
              <span className="text-sm font-black text-white/20 uppercase tracking-[0.8em]">
                Current_Focus:
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[clamp(3.5rem,8vw,7rem)] font-black mb-6 leading-[0.9] uppercase italic tracking-tighter">
              <span className="text-white block">
                {HEADLINES[headlineIndex].top}
              </span>
              <span 
                className="block transition-all duration-500" 
                style={{ 
                  color: HEADLINES[headlineIndex].color,
                  textShadow: HEADLINES[headlineIndex].shadow 
                }}
              >
                {HEADLINES[headlineIndex].bottom}
              </span>
            </h2>
          </motion.div>
        </AnimatePresence>
        
        {/* Indikator Progress Durasi Headline */}
        <div className="flex gap-1 mb-8">
          {HEADLINES.map((_, i) => (
            <div key={i} className="h-1.5 flex-grow bg-white/5">
              {i === headlineIndex && (
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 6, ease: "linear" }} 
                  className="h-full bg-white" 
                />
              )}
            </div>
          ))}
        </div>

        {/* Sub-headline / Deskripsi Storytelling */}
        <div className="h-[100px]">
          <AnimatePresence mode="wait">
            <motion.p 
              key={`sub-${headlineIndex}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }} 
              className="text-lg text-white/50 max-w-md border-l-4 border-white/10 pl-6 py-2 leading-relaxed font-bold italic"
            >
              "{HEADLINES[headlineIndex].sub}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Elemen Visual Samping (Dekoratif) */}
      <div className="relative h-[300px] md:h-[450px] border border-white/10 flex items-center justify-center bg-neutral-900/5 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-1000" />
        <Code2 size={180} className="text-white opacity-5 group-hover:opacity-10 transition-all duration-1000" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-white/5 absolute rotate-45" />
          <div className="w-full h-[1px] bg-white/5 absolute -rotate-45" />
        </div>
      </div>
    </section>
  );
};

export default Hero;