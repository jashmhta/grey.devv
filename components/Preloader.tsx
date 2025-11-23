import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const words = ["INITIALIZING", "CALIBRATING", "RENDERING", "LAUNCHING"];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const wordTimer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 450);

    return () => {
      clearInterval(timer);
      clearInterval(wordTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (count === 100) {
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative w-full max-w-md px-10">
        <div className="flex justify-between items-end mb-4">
          <motion.span 
            key={currentWord}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-amber-500 font-mono text-xs tracking-[0.3em] uppercase"
          >
            {words[currentWord]}
          </motion.span>
          <span className="text-6xl font-display font-bold tracking-tighter">
            {count}%
          </span>
        </div>
        
        <div className="w-full h-[1px] bg-neutral-800 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-amber-500"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
          />
        </div>
      </div>
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('./assets/textures/stardust.png')]"></div>
    </motion.div>
  );
};

export default Preloader;