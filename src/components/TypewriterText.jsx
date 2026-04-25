import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

export default TypewriterText;