import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

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
    <motion.div 
      animate={{ filter: ["drop-shadow(0 0 0px transparent)", `drop-shadow(0 0 5px ${color})`, "drop-shadow(0 0 0px transparent)"] }} 
      transition={{ repeat: Infinity, duration: 2 }} 
      className="mb-4 text-white/40 group-hover:text-white transition-colors" 
      style={{ color: color }}
    >
      {icon}
    </motion.div>
    <div className="text-4xl font-black italic mb-1 tracking-tighter">
      <Counter value={val} />
    </div>
    <div className="text-[10px] uppercase font-bold text-white/30 group-hover:text-white/60 tracking-[0.3em] transition-colors">
      {label}
    </div>
  </motion.div>
);

export default MetricCard;