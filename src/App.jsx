import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useInView, animate } from 'framer-motion';
import { 
  Zap, X, Monitor, Mail, ExternalLink, 
  ShieldCheck, Users, Terminal, BookOpen,
  MessageSquare, ShieldAlert, Activity,
  Code2, Rocket, Link2, Cpu
} from 'lucide-react';

/**
 * ============================================================================
 * 1. FALLBACK ICONS (Mencegah Error Import)
 * ============================================================================
 */
const InstagramIcon = ({ size = 20, color = "currentColor" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/**
 * ============================================================================
 * 2. DATA KONSTANTA
 * ============================================================================
 */
const PROJECTS = [
  {
    id: 1,
    title: "Modul Ajar Otomatis",
    type: "Digital Revolution",
    shortDesc: "Sistem cerdas yang mengubah jam administrasi guru menjadi hitungan detik.",
    problem: "Guru terjebak dalam urusan administrasi, bukan di depan siswa.",
    impact: "Efisiensi waktu hingga 95% bagi tenaga pengajar.",
    tech: ["AI Core", "React"],
    url: "https://modul-ajar-otomatis.vercel.app/",
    color: "#00ff41"
  },
  {
    id: 2,
    title: "Katrolinaja",
    type: "Visual Masterpiece",
    shortDesc: "Simulator fisika interaktif yang menghidupkan rumus mati menjadi pengalaman nyata.",
    problem: "Rumus fisika sulit dibayangkan secara visual oleh siswa.",
    impact: "Meningkatkan pemahaman visual siswa sebesar 80%.",
    tech: ["Physics API", "Canvas"],
    url: "https://katrolinaja.vercel.app/",
    color: "#ff0055"
  },
  {
    id: 3,
    title: "Brief Klient System",
    type: "Communication Tool",
    shortDesc: "Jembatan logika antara ide klien dan eksekusi kode.",
    problem: "Miskomunikasi requirement sering menghancurkan proyek.",
    impact: "Zero Miskomunikasi & efisiensi revisi maksimal.",
    tech: ["UX Logic", "Next.js"],
    url: "https://brief-klient.vercel.app/",
    color: "#00d4ff"
  },
  {
    id: 4,
    title: "Dinar KR Ponorogo",
    type: "Digital Credibility",
    shortDesc: "Wajah digital premium untuk meningkatkan kasta UMKM lokal.",
    problem: "Bisnis lokal terlihat kurang profesional di platform digital.",
    impact: "Transformasi citra lokal menjadi standar global.",
    tech: ["UI/UX", "Branding"],
    url: "https://dinar-kr-ponorogo.vercel.app/",
    color: "#ffff00"
  },
  {
    id: 5,
    title: "Premium Web Demo",
    type: "Future Concept",
    shortDesc: "Eksperimen interaksi web modern yang menembus batas standar browser.",
    problem: "Website standar saat ini terlalu kaku dan membosankan.",
    impact: "Mendefinisikan ulang standar interaksi digital masa depan.",
    tech: ["Framer Motion", "Vibe"],
    url: "https://demo-website-premium1.vercel.app/",
    color: "#ff8800"
  },
  {
    id: 6,
    title: "Chaerunisa Official",
    type: "Corporate Portal",
    shortDesc: "Arsitektur web yang kokoh untuk identitas bisnis profesional.",
    problem: "Identitas digital korporasi yang kurang memiliki otoritas.",
    impact: "Kehadiran digital yang stabil, aman, dan berwibawa.",
    tech: ["Security", "SEO"],
    url: "https://www.chaerunisa.co.id/",
    color: "#aa00ff"
  }
];

const HEADLINES = [
  { 
    top: "STOP WASTING TIME.", 
    bottom: "START AUTOMATING.", 
    sub: "Waktu adalah aset termahal Anda. Jangan habiskan untuk administrasi sampah. Biarkan mesin saya yang bekerja.",
    color: "#00ff41",
    shadow: "4px 4px 0px #004411"
  },
  { 
    top: "TEACHER LOGIC.", 
    bottom: "CODE EXECUTOR.", 
    sub: "Saya mengerti manusia lebih baik dari developer biasa, dan saya menulis kode lebih tajam dari imajinasi Anda.",
    color: "#ff0055",
    shadow: "4px 4px 0px #440011"
  },
  { 
    top: "FROM CHAOS.", 
    bottom: "TO SOLUTION.", 
    sub: "Masalah Anda mungkin rumit, tapi solusinya tidak harus begitu. Mari bedah dan rakit kembali sistem Anda.",
    color: "#00d4ff",
    shadow: "4px 4px 0px #002244"
  }
];

/**
 * ============================================================================
 * 3. SUB-COMPONENTS
 * ============================================================================
 */

const Counter = ({ value, duration = 2 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const suffix = value.replace(/[0-9.]/g, '');
      const controls = animate(0, numericValue, {
        duration: duration,
        onUpdate(v) { node.textContent = v.toFixed(v % 1 === 0 ? 0 : 1) + suffix; }
      });
      return () => controls.stop();
    }
  }, [value, isInView, duration]);
  return <span ref={nodeRef}>0</span>;
};

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText(text.slice(0, i)); i++;
          if (i > text.length) clearInterval(interval);
        }, 20);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);
  return <span ref={nodeRef}>{displayText}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-5 bg-[#00ff41] ml-1 align-middle" /></span>;
};

const MetricCard = ({ label, val, icon, color, delay }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay }} whileHover={{ y: -5, borderColor: color }} className="border border-white/5 p-8 bg-neutral-950 flex flex-col items-center group transition-all">
    <div style={{ color }} className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
    <div className="text-4xl font-black italic tracking-tighter mb-1"><Counter value={val} /></div>
    <div className="text-[10px] uppercase font-bold text-white/30 tracking-[0.3em]">{label}</div>
  </motion.div>
);

// SOCIAL DOCK: Sekarang Muncul di HP (Mobile Responsive)
const SocialSignalDock = () => (
  <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-6 lg:gap-10 pr-2 lg:pr-6 scale-90 lg:scale-100">
    <div className="flex flex-col gap-6 lg:gap-8">
      <motion.a href="https://www.tiktok.com/@nugas.id99" target="_blank" whileHover={{ x: -10, scale: 1.1 }} className="group relative flex items-center justify-end">
        <span className="absolute right-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all text-white bg-black px-3 py-1 border border-white/20 whitespace-nowrap hidden lg:block">SIGNAL_A: TIKTOK</span>
        <div className="p-2 lg:p-3 border-2 border-white/10 bg-black group-hover:border-[#00f2ea] transition-all"><TikTokIcon size={18} /></div>
      </motion.a>
      <motion.a href="https://www.instagram.com/wachid_amiruddin" target="_blank" whileHover={{ x: -10, scale: 1.1 }} className="group relative flex items-center justify-end">
        <span className="absolute right-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all text-white bg-black px-3 py-1 border border-white/20 whitespace-nowrap hidden lg:block">SIGNAL_B: INSTAGRAM</span>
        <div className="p-2 lg:p-3 border-2 border-white/10 bg-black group-hover:border-[#e1306c] transition-all"><InstagramIcon size={18} /></div>
      </motion.a>
    </div>
    <div className="h-16 lg:h-24 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
    <div className="rotate-90 text-[7px] lg:text-[8px] font-black tracking-[0.5em] lg:tracking-[0.8em] uppercase opacity-20 whitespace-nowrap">EXTERNAL_SIGNAL_ACTIVE</div>
  </div>
);

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
          <h2 className="text-5xl md:text-8xl lg:text-7xl font-black mb-8 leading-[0.85] uppercase italic tracking-tighter">
            <span className="block text-white mb-2">{HEADLINES[headlineIndex].top}</span>
            <span className="block transition-all duration-500" style={{ color: HEADLINES[headlineIndex].color, textShadow: HEADLINES[headlineIndex].shadow }}>{HEADLINES[headlineIndex].bottom}</span>
          </h2>
        </motion.div>
      </AnimatePresence>
      <div className="h-[120px] border-l-2 border-white/10 pl-8 mb-10">
        <AnimatePresence mode="wait"><motion.p key={`sub-${headlineIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg text-white/50 italic leading-relaxed font-bold">"{HEADLINES[headlineIndex].sub}"</motion.p></AnimatePresence>
      </div>
      <div className="flex gap-2">
        <button onClick={() => window.open('https://wa.me/6282228398585')} className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#00ff41] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">Initialize_WA</button>
        <button className="px-8 py-4 border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] hover:border-white transition-all">Documentation</button>
      </div>
    </div>
    <div className="relative h-[300px] md:h-[500px]">
      <AdvancedNexusVisualizer color={HEADLINES[headlineIndex].color} />
      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: HEADLINES[headlineIndex].color }} />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: HEADLINES[headlineIndex].color }} />
    </div>
  </section>
);

const Philosophy = () => (
  <section className="mb-60 grid grid-cols-1 lg:grid-cols-3 gap-20 border-y border-white/5 py-24 bg-neutral-950/40 relative overflow-hidden">
    <div className="space-y-6">
      <Rocket size={50} className="text-[#00ff41]" />
      <h3 className="text-5xl font-black uppercase italic leading-tight tracking-tighter">Architecture <br/> is Logic.</h3>
    </div>
    <div className="lg:col-span-2 space-y-10 min-h-[250px]">
        <p className="text-xl text-white/50 leading-relaxed italic"><TypewriterText text="Saya membangun dengan dua dimensi: Empati sebagai Guru untuk mengerti masalah Anda, dan Logika sebagai Developer untuk memusnahkannya. Setiap baris kode adalah solusi, bukan sekadar dekorasi." delay={0.5} /></p>
        <div className="p-8 border-l-4 border-[#ff0055] bg-white/5 text-white/80">
          <TypewriterText text='"Masalah digital hari ini adalah tentang sistem yang gagal memanusiakan penggunanya. Saya di sini untuk memperbaikinya."' delay={6} />
        </div>
    </div>
  </section>
);

/**
 * ============================================================================
 * 4. MAIN APP COMPONENT
 * ============================================================================
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const whatsappNumber = "6282228398585";
  const emailAddress = "w.amiruddin@gmail.com";

  const bootLogs = [
    "MOUNTING_NEXUS_KERNEL...",
    "IDENTIFYING_SYSTEM_ID: WAHID_AMIRUDDIN",
    "DECRYPTING_TEACHER_XP_BLOCKS...",
    "ACTIVATING_RADAR_SENTINEL...",
    "ACCESS_GRANTED."
  ];

  useEffect(() => {
    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < bootLogs.length) { 
        setLoadingText(bootLogs[logIdx]); 
        logIdx++; 
      } else { 
        setLoading(false); 
        clearInterval(interval); 
      }
    }, 300);

    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const cycleHeadline = setInterval(() => {
      setHeadlineIndex(prev => (prev + 1) % HEADLINES.length);
    }, 6000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      clearInterval(cycleHeadline);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-[#00ff41] z-[200] p-10">
        <div className="max-w-md w-full relative">
          <div className="text-[10px] font-black tracking-[0.5em] mb-4 opacity-40 uppercase text-center">Protocol_v6.2_Booting</div>
          <div className="bg-neutral-900 border-l-2 border-[#00ff41] p-6 space-y-4 shadow-[0_0_50px_rgba(0,255,65,0.1)]">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00ff41] animate-ping" />
                <AnimatePresence mode="wait">
                  <motion.div key={loadingText} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} className="font-bold text-sm uppercase">
                    {">"} {loadingText}
                  </motion.div>
                </AnimatePresence>
             </div>
             <div className="flex gap-1 h-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div key={i} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }} className="flex-grow bg-[#00ff41]" />
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[#ff0055] overflow-x-hidden">
      
      <SocialSignalDock />

      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-[90] bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter italic leading-none">WAHID AMIRUDDIN MUHLISH</h1>
            <div className="flex gap-4 mt-2 text-[8px] uppercase tracking-widest text-white/40">
                <span className="flex items-center gap-1"><Cpu size={10} className="text-[#00ff41]"/> Neural_Dev</span>
                <span className="flex items-center gap-1"><BookOpen size={10} className="text-[#ff0055]"/> Human_Logic</span>
            </div>
          </div>
          <a href={`mailto:${emailAddress}`} className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-4 py-2 hover:bg-[#00ff41] transition-all">Direct_Uplink</a>
      </nav>

      <main className="relative pt-40 px-4 md:px-6 max-w-7xl mx-auto pb-20">
        
        <Hero headlineIndex={headlineIndex} />

        <section className="mb-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: "Proyek_Selesai", val: "10+", icon: <Activity size={24}/>, color: "#00ff41" },
             { label: "Waktu_Terhemat", val: "1000h+", icon: <Terminal size={24}/>, color: "#00d4ff" },
             { label: "Reliability_Rate", val: "99.9%", icon: <ShieldCheck size={24}/>, color: "#ff0055" },
             { label: "Kepuasan_Klien", val: "100%", icon: <Users size={24}/>, color: "#ffff00" }
           ].map((m, i) => (
             <MetricCard key={i} {...m} delay={i * 0.1} />
           ))}
        </section>

        <section className="mb-40">
           <div className="flex items-center gap-6 mb-20">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Mission_Log ({PROJECTS.length})</h3>
              <div className="h-[1px] flex-grow bg-white/5" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PROJECTS.map((p) => (
                <motion.div 
                  key={p.id} 
                  layoutId={`p-${p.id}`}
                  onClick={() => setActiveProject(p)} 
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: p.color,
                    boxShadow: `0 0 30px ${p.color}33` 
                  }} 
                  className="cursor-pointer bg-neutral-900/30 border border-white/5 p-8 md:p-10 relative overflow-hidden group transition-all duration-300"
                >
                  <div style={{ color: p.color }} className="text-[9px] font-black uppercase tracking-[0.4em] mb-4">Task_Report_0{p.id}</div>
                  <h4 className="text-2xl md:text-3xl font-black uppercase italic leading-none mb-6 group-hover:text-white transition-colors">{p.title}</h4>
                  <p className="text-[12px] text-white/30 italic mb-10 leading-relaxed pr-6">{p.shortDesc}</p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{p.tech[0]} // STABLE</span>
                    <div style={{ color: p.color }} className="text-[10px] font-black flex items-center gap-2 underline uppercase">View_Case</div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        <Philosophy />

        <footer className="relative mt-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-20 overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                <motion.a 
                    href={`https://wa.me/${whatsappNumber}`} 
                    target="_blank"
                    className="relative p-10 md:p-20 bg-black hover:bg-[#00ff41] hover:text-black transition-all group overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10"><div className="w-12 h-12 border-2 border-current flex items-center justify-center"><MessageSquare size={24} /></div><span className="text-[10px] font-black uppercase tracking-[0.5em]">Command_01: WhatsApp</span></div>
                        <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-none mb-8 tracking-tighter">SIAP_ <br/>EKSEKUSI.</h2>
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100"><span className="animate-pulse">●</span> ONLINE_NOW // TAP_TO_UPLINK</div>
                    </div>
                    <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity"><ShieldAlert size={300} /></div>
                </motion.a>

                <motion.a 
                    href={`mailto:${emailAddress}`}
                    className="relative p-10 md:p-20 bg-black hover:bg-[#ff0055] hover:text-white transition-all group overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10"><div className="w-12 h-12 border-2 border-current flex items-center justify-center"><Mail size={24} /></div><span className="text-[10px] font-black uppercase tracking-[0.5em]">Command_02: Email</span></div>
                        <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-none mb-8 tracking-tighter">KIRIM_ <br/>BRIEF.</h2>
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">ENCRYPTED_SIGNAL // SEND_TO_CORE</div>
                    </div>
                    <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity"><Terminal size={300} /></div>
                </motion.a>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10 pt-10 md:pt-20 pb-40 text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
                <div className="flex flex-col gap-2"><span>© WAHID_NEXUS_ENGINE_v6.2</span><span>SYSTEM_ID: AMIRUDDIN_MASTER_CORE</span></div>
                <h2 className="text-3xl md:text-6xl font-black italic opacity-5 cursor-default">SCALE_BEYOND</h2>
                <span>ARCHITECTED_IN_INDONESIA // 2024</span>
            </div>
        </footer>
      </main>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)} className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[150] cursor-crosshair" />
            <motion.div layoutId={`p-${activeProject.id}`} className="fixed inset-2 md:inset-10 lg:inset-20 bg-neutral-950 border border-white/10 z-[151] p-6 md:p-20 overflow-y-auto shadow-[0_0_100px_rgba(0,255,65,0.1)]">
               <button onClick={() => setActiveProject(null)} className="absolute top-6 right-6 md:top-10 md:right-10 hover:rotate-90 transition-transform"><X size={32} /></button>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                  <div className="space-y-8 md:space-y-12">
                     <div>
                        <div className="text-[#ff0055] font-black text-[10px] tracking-[0.6em] mb-4 uppercase">Mission_Summary</div>
                        <h2 className="text-4xl md:text-8xl font-black uppercase italic leading-none mb-6 tracking-tighter">{activeProject.title}</h2>
                     </div>
                     <div className="space-y-8 md:space-y-10">
                        <section><h3 className="text-[#00ff41] text-[10px] font-black uppercase mb-4 tracking-[0.4em] flex items-center gap-4"><span className="w-10 h-[1px] bg-[#00ff41]" /> Friction</h3><p className="text-2xl md:text-3xl text-white/80 italic font-bold leading-tight">"{activeProject.problem}"</p></section>
                        <section><h3 className="text-[#ff8800] text-[10px] font-black uppercase mb-4 tracking-[0.4em] flex items-center gap-4"><span className="w-10 h-[1px] bg-[#ff8800]" /> Evolution</h3><p className="text-2xl md:text-3xl text-white/80 italic font-bold leading-tight">"{activeProject.impact}"</p></section>
                     </div>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 flex flex-col h-[300px] md:h-[500px]">
                      <div className="p-4 border-b border-white/5 flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /><div className="w-2 h-2 rounded-full bg-green-500" /></div>
                      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-10 text-center relative overflow-hidden">
                        <Activity size={60} className="text-white opacity-5 mb-10 md:size-[100px]" />
                        <a href={activeProject.url} target="_blank" rel="noopener noreferrer" className="relative z-10 px-8 md:px-12 py-4 md:py-6 bg-white text-black font-black uppercase text-xs hover:bg-[#00ff41] transition-all shadow-2xl tracking-widest">Deploy_Live_Mission</a>
                      </div>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div animate={{ x: mousePos.x - 16, y: mousePos.y - 16, rotate: mousePos.x / 40, scale: activeProject ? 1.5 : 1 }} transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }} className="fixed top-0 left-0 w-8 h-8 border-2 border-[#00ff41] z-[999] pointer-events-none mix-blend-difference hidden md:block" />
    </div>
  );
}
