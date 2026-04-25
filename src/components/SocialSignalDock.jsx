import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const TikTokIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SocialSignalDock = () => (
  <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-10 pr-6">
    <div className="flex flex-col gap-8">
      {/* TIKTOK SIGNAL */}
      <motion.a 
        href="https://www.tiktok.com/@nugas.id99" 
        target="_blank" 
        whileHover={{ x: -10, scale: 1.1 }} 
        className="group relative flex items-center justify-end"
      >
        <span className="absolute right-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all text-white bg-black px-3 py-1 border border-white/20 whitespace-nowrap">
          SIGNAL_A: TIKTOK
        </span>
        <div className="p-3 border-2 border-white/10 bg-black group-hover:border-[#00f2ea] group-hover:shadow-[4px_0_0_#ff0050] transition-all">
          <TikTokIcon size={20} />
        </div>
      </motion.a>

      {/* INSTAGRAM SIGNAL */}
      <motion.a 
        href="https://www.instagram.com/wachid_amiruddin" 
        target="_blank" 
        whileHover={{ x: -10, scale: 1.1 }} 
        className="group relative flex items-center justify-end"
      >
        <span className="absolute right-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all text-white bg-black px-3 py-1 border border-white/20 whitespace-nowrap">
          SIGNAL_B: INSTAGRAM
        </span>
        <div className="p-3 border-2 border-white/10 bg-black group-hover:border-[#e1306c] group-hover:shadow-[0_0_15px_#e1306c44] transition-all">
          <Instagram size={20} />
        </div>
      </motion.a>
    </div>

    {/* Dekorasi Garis Antena */}
    <div className="h-24 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
    <div className="rotate-90 text-[8px] font-black tracking-[0.8em] uppercase opacity-20 whitespace-nowrap">
      EXT_BROADCAST_ACTIVE
    </div>
  </div>
);

export default SocialSignalDock;