import React from 'react';
import { Rocket } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';

const Philosophy = () => (
  <section className="mb-60 grid grid-cols-1 lg:grid-cols-3 gap-20 border-y border-white/5 py-24 bg-neutral-950/40 relative overflow-hidden">
    <div className="space-y-6">
      <Rocket size={50} className="text-[#00ff41]" />
      <h3 className="text-5xl font-black uppercase italic leading-tight tracking-tighter">Architecture <br/> is Logic.</h3>
    </div>
    <div className="lg:col-span-2 space-y-10 min-h-[250px]">
        <p className="text-xl text-white/50 leading-relaxed italic">
          <TypewriterText text="Saya membangun dengan dua dimensi: Empati sebagai Guru untuk mengerti masalah Anda, dan Logika sebagai Developer untuk memusnahkannya. Setiap baris kode adalah solusi, bukan sekadar dekorasi." delay={0.5} />
        </p>
        <div className="p-8 border-l-4 border-[#ff0055] bg-white/5 text-white/80">
          <TypewriterText text='"Masalah digital hari ini adalah tentang sistem yang gagal memanusiakan penggunanya. Saya di sini untuk memperbaikinya."' delay={6} />
        </div>
    </div>
  </section>
);

export default Philosophy;