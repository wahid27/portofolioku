import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { 
  Terminal, Cpu, BookOpen, Zap, X, Monitor, 
  Globe, Mail, Phone, ExternalLink, ArrowUpRight, 
  Code2, Rocket, ShieldCheck, Users 
} from 'lucide-react';

/**
 * DATA CONSTANTS
 * Bagian ini berisi semua data proyek dan konten teks.
 */
const PROJECTS = [
  {
    id: 1,
    title: "Modul Ajar Otomatis",
    type: "Digital Revolution",
    shortDesc: "Sistem cerdas yang mengubah jam administrasi guru menjadi hitungan detik.",
    problem: "Guru menghabiskan separuh hidupnya di depan kertas administrasi, bukan di depan siswa.",
    impact: "Ribuan jam kerja terselamatkan. Fokus kembali ke manusia, bukan dokumen.",
    tech: ["AI Core", "React"],
    url: "https://modul-ajar-otomatis.vercel.app/",
    color: "#00ff41",
    shadow: "4px 4px 0px #004411"
  },
  {
    id: 2,
    title: "Katrolinaja",
    type: "Visual Masterpiece",
    shortDesc: "Simulator fisika interaktif yang menghidupkan rumus mati menjadi pengalaman nyata.",
    problem: "Rumus fisika seringkali hanya menjadi deretan angka mati yang membosankan.",
    impact: "Visualisasi instan yang mengubah kebingungan menjadi pemahaman mendalam.",
    tech: ["Physics API", "Canvas"],
    url: "https://katrolinaja.vercel.app/",
    color: "#ff0055",
    shadow: "4px 4px 0px #440011"
  },
  {
    id: 3,
    title: "Brief Klient System",
    type: "Communication Tool",
    shortDesc: "Eliminasi miskomunikasi. Jembatan logika antara ide klien dan eksekusi kode.",
    problem: "Proyek hancur bukan karena kode yang buruk, tapi karena instruksi yang kabur.",
    impact: "Zero Miskomunikasi. Efisiensi revisi hingga level maksimal.",
    tech: ["UX Logic", "Next.js"],
    url: "https://brief-klient.vercel.app/",
    color: "#00d4ff",
    shadow: "4px 4px 0px #002244"
  },
  {
    id: 4,
    title: "Dinar KR Ponorogo",
    type: "Digital Credibility",
    shortDesc: "Wajah digital premium untuk meningkatkan kasta UMKM lokal di pasar global.",
    problem: "Banyak bisnis hebat mati perlahan karena wajah digital mereka terlihat amatir.",
    impact: "Transformasi citra lokal menjadi standar global dalam satu malam.",
    tech: ["UI/UX", "Branding"],
    url: "https://dinar-kr-ponorogo.vercel.app/",
    color: "#ffff00",
    shadow: "4px 4px 0px #444400"
  },
  {
    id: 5,
    title: "Premium Web Demo",
    type: "Future Concept",
    shortDesc: "Eksperimen interaksi web modern yang menembus batas standar browser saat ini.",
    problem: "Standar website saat ini terlalu datar. Tidak ada jiwa, tidak ada interaksi.",
    impact: "Mendefinisikan ulang apa yang mungkin dilakukan di dalam browser.",
    tech: ["Framer Motion", "Vibe"],
    url: "https://demo-website-premium1.vercel.app/",
    color: "#ff8800",
    shadow: "4px 4px 0px #442200"
  },
  {
    id: 6,
    title: "Chaerunisa Official",
    type: "Corporate Portal",
    shortDesc: "Arsitektur web yang kokoh dan berwibawa untuk identitas bisnis profesional.",
    problem: "Perusahaan besar seringkali kaku dan sulit diakses secara digital.",
    impact: "Kehadiran digital yang otoriter namun tetap user-friendly.",
    tech: ["Security", "SEO"],
    url: "https://www.chaerunisa.co.id/",
    color: "#aa00ff",
    shadow: "4px 4px 0px #220044"
  },
  {
    id: 7,
    title: "Family Design Hub",
    type: "Creative Portfolio",
    shortDesc: "Galeri minimalis tempat setiap piksel desain berbicara tanpa distraksi UI.",
    problem: "Karya seni kehilangan nilainya jika dipajang di galeri yang berantakan.",
    impact: "Fokus penuh pada estetika dan detail tanpa distraksi UI.",
    tech: ["Clean Code", "Visual Focus"],
    url: "https://family-design.vercel.app/",
    color: "#00ffcc",
    shadow: "4px 4px 0px #004433"
  },
  {
    id: 8,
    title: "English Hub Kisi-Kisi",
    type: "Exam Accelerator",
    shortDesc: "Satu komando materi persiapan ujian yang ringkas dan mudah diakses.",
    problem: "Kepanikan ujian muncul karena sumber belajar yang tercecer.",
    impact: "Kesiapan mental siswa meningkat melalui kemudahan akses data.",
    tech: ["Content Mgmt", "Mobile"],
    url: "https://kisi-kisi-b-inggris.vercel.app/",
    color: "#ff0088",
    shadow: "4px 4px 0px #440022"
  },
  {
    id: 9,
    title: "UAMNU English Portal",
    type: "Academic Ecosystem",
    shortDesc: "Digitalisasi total alur persiapan ujian untuk sinkronisasi guru dan siswa.",
    problem: "Metode lama persiapan ujian sudah tidak relevan dengan kecepatan informasi.",
    impact: "Sinkronisasi akademik yang instan dan tanpa celah.",
    tech: ["Database", "Sync Engine"],
    url: "https://kisi2-bing-uamnu26.vercel.app/",
    color: "#44ff00",
    shadow: "4px 4px 0px #114400"
  }
];

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
 * REUSABLE COMPONENTS
 */
const TypewriterText = ({ text, delay = 0 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText(text.slice(0, i));
          i++;
          if (i > text.length) clearInterval(interval);
        }, 20); 
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return (
    <span ref={nodeRef} className="relative">
      {displayText}
      {isInView && displayText.length < text.length && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-2 h-5 bg-[#00ff41] ml-1 align-middle" />
      )}
    </span>
  );
};

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

const MetricCard = ({ label, val, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, rotateY: 10, borderColor: color, boxShadow: `0 0 30px ${color}22` }}
    className="relative border border-white/5 p-8 bg-neutral-950 flex flex-col items-center text-center group cursor-default transition-all duration-500"
    style={{ perspective: "1000px" }}
  >
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/40 transition-all" />
    <motion.div animate={{ filter: ["drop-shadow(0 0 0px transparent)", `drop-shadow(0 0 5px ${color})`, "drop-shadow(0 0 0px transparent)"] }} transition={{ repeat: Infinity, duration: 2 }} className="mb-4 text-white/40 group-hover:text-white transition-colors" style={{ color: color }}>
      {icon}
    </motion.div>
    <div className="text-4xl font-black italic mb-1 tracking-tighter"><Counter value={val} /></div>
    <div className="text-[10px] uppercase font-bold text-white/30 group-hover:text-white/60 tracking-[0.3em] transition-colors">{label}</div>
  </motion.div>
);

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const loadingSequence = [
    "INITIALIZING_SYSTEM_SCAN...",
    "MATCH_FOUND: WAHID_AMIRUDDIN_MUHLISH",
    "DECRYPTING_TEACHER_XP_DATA...",
    "INJECTING_DEVELOPER_LOGIC...",
    "ESTABLISHING_SECURE_NEXUS_LINK...",
    "ACCESS_GRANTED."
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < loadingSequence.length) {
        setLoadingText(loadingSequence[currentIdx]);
        currentIdx++;
      } else {
        setLoading(false);
        clearInterval(interval);
      }
    }, 700);

    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const headlineTimer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 6000);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      clearInterval(headlineTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const whatsappNumber = "6282228398585"; 
  const emailAddress = "w.amiruddin@gmail.com"; 
  const waLink = `https://wa.me/${whatsappNumber}?text=Halo%20Wahid,%20saya%20punya%20masalah%20yang%20perlu%20Anda%20bedah%20dan%20selesaikan%20lewat%20kode.`;
  const mailLink = `mailto:${emailAddress}?subject=Tawaran%20Kolaborasi%20Nexus`;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-[#00ff41] z-50 p-6 overflow-hidden">
        <div className="max-w-md w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-xs font-bold uppercase tracking-[0.4em] flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#00ff41]" /> SYSTEM_BOOT_SEQUENCE
          </motion.div>
          <div className="bg-neutral-900 border border-white/10 p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.1)]">
             <div className="text-[16px] font-bold text-[#00ff41] flex items-center gap-3">
               <span className="animate-pulse">{">"}</span>
               <AnimatePresence mode="wait">
                 <motion.span key={loadingText} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                   {loadingText}
                 </motion.span>
               </AnimatePresence>
             </div>
             <div className="mt-10 flex gap-2">
               {Array.from({ length: 15 }).map((_, i) => (
                 <motion.div key={i} animate={{ backgroundColor: ["#004411", "#00ff41", "#004411"] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="flex-grow h-1.5" />
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[#ff0055] selection:text-white overflow-x-hidden">
      {/* Visual Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <nav className="fixed top-0 w-full p-6 flex justify-between items-start z-[90] bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">WAHID AMIRUDDIN MUHLISH</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">
            <span className="flex items-center gap-1"><BookOpen size={10} className="text-[#00ff41]"/> Human Strategist</span>
            <span className="flex items-center gap-1"><Terminal size={10} className="text-[#ff0055]"/> Full-Stack Executor</span>
          </div>
        </div>
      </nav>

      <main className="relative pt-40 px-6 pb-20 z-10 max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <section className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-[350px] md:h-[450px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={`headline-${headlineIndex}`} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.6, ease: "circOut" }}>
                <div className="mb-4"><span className="text-sm font-black text-white/20 uppercase tracking-[0.8em]">Current_Focus:</span></div>
                <h2 className="text-6xl md:text-8xl lg:text-[clamp(3.5rem,8vw,7rem)] font-black mb-6 leading-[0.9] uppercase italic tracking-tighter">
                  <span className="text-white block">{HEADLINES[headlineIndex].top}</span>
                  <span className="block transition-all duration-500" style={{ color: HEADLINES[headlineIndex].color, textShadow: HEADLINES[headlineIndex].shadow }}>{HEADLINES[headlineIndex].bottom}</span>
                </h2>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1 mb-8">
              {HEADLINES.map((_, i) => (
                <div key={i} className="h-1.5 flex-grow bg-white/5">
                  {i === headlineIndex && <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} className="h-full bg-white" />}
                </div>
              ))}
            </div>
            <div className="h-[100px]">
              <AnimatePresence mode="wait">
                <motion.p key={`sub-${headlineIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-lg text-white/50 max-w-md border-l-4 border-white/10 pl-6 py-2 leading-relaxed font-bold italic">
                  "{HEADLINES[headlineIndex].sub}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[450px] border border-white/10 flex items-center justify-center bg-neutral-900/5 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-1000" />
            <Code2 size={180} className="text-white opacity-5 group-hover:opacity-10 transition-all duration-1000" />
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="mb-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Solusi Selesai" val="10+" icon={<Zap size={24}/>} color="#00ff41" delay={0.1} />
          <MetricCard label="Waktu Terhemat" val="1000h+" icon={<Users size={24}/>} color="#00d4ff" delay={0.2} />
          <MetricCard label="Reliability" val="99.9%" icon={<Monitor size={24}/>} color="#ff0055" delay={0.3} />
          <MetricCard label="Client Trust" val="100%" icon={<ShieldCheck size={24}/>} color="#ffff00" delay={0.4} />
        </section>

        {/* PROJECT GRID */}
        <section className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Manifesto Proyek ({PROJECTS.length})</h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <motion.div key={project.id} layoutId={`card-${project.id}`} onClick={() => setActiveProject(project)} whileHover={{ y: -10, borderColor: project.color, boxShadow: `0 20px 40px -20px ${project.color}33` }} className="cursor-pointer group relative bg-neutral-950 border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[340px] transition-all duration-500">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#ff0055] mb-4">{project.type}</div>
                  <h4 className="text-3xl font-black uppercase italic leading-none group-hover:text-white transition-colors mb-6">{project.title}</h4>
                  <p className="text-[13px] text-white/30 group-hover:text-white/70 transition-colors italic leading-relaxed pr-6">{project.shortDesc}</p>
                </div>
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
                  <div className="flex gap-2"><span className="text-[9px] border border-white/20 px-3 py-1 uppercase font-bold text-white/30">{project.tech[0]}</span></div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#00ff41] group-hover:translate-x-2 transition-transform italic underline uppercase tracking-[0.2em]">LIHAT_STUDI</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-3 gap-16 border-y border-white/5 py-24 bg-neutral-900/5 relative overflow-hidden">
            <div className="flex flex-col gap-6">
              <Rocket size={40} className="text-[#00ff41]" />
              <h3 className="text-4xl font-black uppercase italic leading-none">Bukan Sekadar <br/> Baris Kode.</h3>
            </div>
            <div className="lg:col-span-2 text-white/50 text-xl leading-relaxed space-y-8 min-h-[200px]">
              <p className="min-h-[100px]">
                <TypewriterText text="Saya melihat dunia melalui dua lensa. Sebagai Guru, saya memahami frustrasi manusia. Sebagai Developer, saya membangun senjata untuk mengakhirinya. Saya tidak menawarkan website cantik; saya menawarkan kebebasan dari inefisiensi." delay={0.5} />
              </p>
              <div className="p-6 border-l-2 border-[#ff0055] bg-white/5 italic font-medium text-white/80">
                <TypewriterText text='"Masalah digital bukan soal sintaks yang salah, tapi soal solusi yang gagal memahami manusia di baliknya."' delay={5.5} />
              </div>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-40 pt-20 flex flex-col items-center">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[1em] uppercase text-white/30 mb-8 font-black">START THE EVOLUTION</p>
            <h2 className="text-5xl md:text-9xl font-black uppercase italic leading-none hover:text-[#00ff41] cursor-pointer transition-all duration-700 hover:tracking-tighter">EVOLVE_NOW</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl px-6">
             <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-4 px-10 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-[#00ff41] transition-all transform hover:-translate-y-2 shadow-[0_30px_60px_-15px_rgba(255,255,255,0.15)]">MULAI KONSULTASI <Zap size={16} fill="currentColor" /></a>
             <a href={mailLink} className="flex-1 flex items-center justify-center gap-4 px-10 py-6 border-2 border-white text-white font-black uppercase tracking-[0.2em] text-xs hover:border-[#ff0055] hover:text-[#ff0055] transition-all transform hover:-translate-y-2">KIRIM BRIEF PROYEK <Mail size={16} /></a>
          </div>
        </footer>
      </main>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-[100] cursor-crosshair" />
            <motion.div layoutId={`card-${activeProject.id}`} className="fixed inset-4 md:inset-8 lg:inset-16 bg-neutral-950 border border-white/20 z-[101] p-8 md:p-14 flex flex-col overflow-y-auto">
              <button onClick={() => setActiveProject(null)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-all z-[110] hover:rotate-90"><X size={36} /></button>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <div>
                    <div className="text-[#ff0055] font-black text-xs mb-4 uppercase tracking-[0.5em]">MISSION_REPORT_0{activeProject.id}</div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85] tracking-tighter mb-4">{activeProject.title}</h2>
                  </div>
                  <div className="space-y-10 pr-6">
                    <section><h3 className="text-[#00ff41] text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-3"><span className="w-6 h-[2px] bg-[#00ff41]" /> THE FRICTION</h3><p className="text-2xl md:text-3xl text-white/90 italic font-bold leading-tight">"{activeProject.problem}"</p></section>
                    <section><h3 className="text-[#ff0055] text-[10px] font-black uppercase mb-4 tracking-[0.3em] flex items-center gap-3"><span className="w-6 h-[2px] bg-[#ff0055]" /> THE EVOLUTION</h3><p className="text-2xl md:text-3xl text-white/90 italic font-bold leading-tight">"{activeProject.impact}"</p></section>
                  </div>
                </div>
                <div className="flex flex-col h-full min-h-[450px]">
                  <div className="bg-neutral-900 p-4 flex items-center gap-4 border-x border-t border-white/10 rounded-t-2xl">
                    <div className="flex gap-2"><div className="w-3 h-3 bg-[#ff5f56] rounded-full" /><div className="w-3 h-3 bg-[#ffbd2e] rounded-full" /><div className="w-3 h-3 bg-[#27c93f] rounded-full" /></div>
                    <div className="bg-black/50 text-[10px] px-6 py-2 rounded-full flex-grow text-white/20 truncate font-black tracking-widest text-center italic uppercase underline">HTTPS://{activeProject.url.split('//')[1].toUpperCase()}</div>
                  </div>
                  <div className="flex-grow border-x border-b border-white/10 bg-neutral-900/40 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ff4108,transparent)] opacity-50 pointer-events-none" />
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-[#ff0055] hover:text-white transition-all transform hover:scale-105 shadow-2xl tracking-tighter text-center">LUNCURKAN EKSEKUSI <ExternalLink size={16} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CUSTOM CURSOR */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border-2 border-[#00ff41] pointer-events-none z-[999] mix-blend-difference hidden md:block" animate={{ x: mousePos.x - 16, y: mousePos.y - 16, scale: activeProject ? 1.5 : 1, rotate: mousePos.x / 40 }} transition={{ type: "spring", damping: 40, stiffness: 600, mass: 0.3 }} />
    </div>
  );
}