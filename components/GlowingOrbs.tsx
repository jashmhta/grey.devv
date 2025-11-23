
import React from 'react';
import { motion } from 'framer-motion';

const GlowingOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Orb 1 - Top Left Gold */}
        <motion.div 
            animate={{ 
                x: [0, 100, 0], 
                y: [0, 50, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[120px] mix-blend-screen"
        />

        {/* Orb 2 - Bottom Right White/Blue */}
        <motion.div 
            animate={{ 
                x: [0, -100, 0], 
                y: [0, -50, 0],
                scale: [1, 1.5, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-neutral-800/20 rounded-full blur-[150px] mix-blend-screen"
        />

        {/* Orb 3 - Center Floating */}
        <motion.div 
            animate={{ 
                x: [-50, 50, -50], 
                y: [-50, 50, -50],
                opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[100px] mix-blend-overlay"
        />
    </div>
  );
};

export default GlowingOrbs;
