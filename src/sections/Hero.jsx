import React, { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Code2 } from 'lucide-react';

/**
 * Data HEADLINES disertakan di sini untuk menghindari error "Could not resolve" 
 * di lingkungan pratinjau. Di VS Code, Anda bisa menghapus ini dan menggunakan 
 * import dari ../utils/constants.js kembali.
 */
const HEADLINES = [
  { 
    top: "STOP WASTING TIME.", 
    bottom: "MULAI OTOMATISASI.", 
    sub: "Waktu adalah aset termahal Anda. Jangan habiskan untuk administrasi sampah. Biarkan mesin saya bekerja.",
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

// Komponen Visualizer Inti (3D Scanning Engine)
const AdvancedNexusVisualizer = ({ color }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [20, -20]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-20, 20]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-neutral-950/40 border border-white/10"
      style={{ perspective: "1000px" }}
    >
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] z-50 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 20px ${color}` }}
      />
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative flex items-center justify-center w-full h-full">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
        {[0, 1, 2].map((i) => (
          <motion.div key={i} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 2.5, opacity: [0, 0.4, 0] }} transition={{ repeat: Infinity, duration: 4, delay: i * 1.3 }} className="absolute border-2 rounded-full" style={{ width: '100px', height: '100px', borderColor: color, translateZ: '-50px' }} />
        ))}
        <motion.div className="relative z-20 p-10 border-2 bg-black/80 backdrop-blur-sm" style={{ borderColor: color, boxShadow: `0 0 60px ${color}33`, translateZ: '150px' }}>
          <Code2 size={100} style={{ color: color }} strokeWidth={1.5} />
        </motion.div>
        <div className="absolute inset-0 p-8 font-mono text-[7px] uppercase tracking-[0.4em] opacity-40 flex flex-col justify-between pointer-events-none" style={{ color: color, translateZ: '200px' }}>
          <div className="flex justify-between"><span>SYNC_STATUS: ACTIVE</span><span>FREQ_OSC: 80.56 MHz</span></div>
          <div className="flex justify-between items-end"><div className="flex flex-col gap-1"><span>CORE_TEMP: OPTIMAL</span><span>LOGIC_GATES: OPEN</span></div><span>WAHID_NEXUS_v6.2</span></div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = ({ headlineIndex }) => (
  <section className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    <div>
      <AnimatePresence mode="wait">
        <motion.div key={`head-${headlineIndex}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.5 }}>
          <div className="mb-4 flex items-center gap-3">
            <span className="w-10 h-[1px] bg-white/20" />
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.8em]">Core_Task_0{headlineIndex + 1}</span>
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-7xl font-black mb-8 leading-[0.85] uppercase italic tracking-tighter">
            <span className="block text-white mb-2">{HEADLINES[headlineIndex].top}</span>
            <span className="block transition-all duration-500" style={{ color: HEADLINES[headlineIndex].color, textShadow: HEADLINES[headlineIndex].shadow }}>{HEADLINES[headlineIndex].bottom}</span>
          </h2>
        </motion.div>
      </AnimatePresence>
      <div className="h-[120px] border-l-2 border-white/10 pl-8 mb-10">
        <AnimatePresence mode="wait"><motion.p key={`sub-${headlineIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg text-white/50 italic leading-relaxed font-bold">"{HEADLINES[headlineIndex].sub}"</motion.p></AnimatePresence>
      </div>
      <div className="flex gap-2">
         <button onClick={() => window.open('https://wa.me/6282228398585')} className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#00ff41] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">Start_Evolve</button>
         <button className="px-8 py-4 border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white transition-all">Documentation</button>
      </div>
    </div>
    <div className="relative h-[400px] md:h-[500px]">
      <AdvancedNexusVisualizer color={HEADLINES[headlineIndex].color} />
      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: HEADLINES[headlineIndex].color }} />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: HEADLINES[headlineIndex].color }} />
    </div>
  </section>
);

export default Hero;