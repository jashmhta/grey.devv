
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { FlaskConical, Terminal, Cpu, Code2 } from 'lucide-react';
import { PlusGrid } from './Decorative';
import Transition from './Transition';

const experiments = [
    {
        id: "EXP_001",
        name: "FLUID_DYNAMICS.ts",
        desc: "Real-time Navier-Stokes simulation via WebGL compute shaders.",
        date: "2024-02-10",
        size: "2.4MB",
        video: "./assets/videos/video_01.mp4"
    },
    {
        id: "EXP_002",
        name: "AUDIO_REACT.js",
        desc: "Procedural terrain generation driven by FFT frequency data.",
        date: "2024-01-15",
        size: "1.8MB",
        video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-plus-signs-344-large.mp4"
    },
    {
        id: "EXP_003",
        name: "NEURAL_STYLE.py",
        desc: "Client-side style transfer using TensorFlow.js and custom weights.",
        date: "2023-12-20",
        size: "45MB",
        video: "./assets/videos/video_03.mp4"
    },
    {
        id: "EXP_004",
        name: "RAY_MARCHING.glsl",
        desc: "Infinite fractal exploration using signed distance functions.",
        date: "2023-11-05",
        size: "4KB",
        video: "./assets/videos/video_05.mp4"
    }
];

const Labs: React.FC = () => {
  const [hoveredExp, setHoveredExp] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#050505] pt-32 pb-20 relative overflow-hidden font-mono"
        onMouseMove={handleMouseMove}
        ref={containerRef}
    >
      <PlusGrid className="opacity-[0.05]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="text-amber-500 w-5 h-5" />
                    <span className="text-amber-500 uppercase tracking-widest text-sm">
                        System.Root.Labs
                    </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-display text-white tracking-tighter">
                    R&D<span className="text-neutral-600">_ARCHIVE</span>
                </h1>
            </div>
            <div className="text-right mt-6 md:mt-0">
                <div className="flex items-center justify-end gap-2 text-xs text-neutral-500 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                </div>
                <p className="text-neutral-400 max-w-sm font-light text-sm">
                    // Experimental code sketches.<br/>
                    // Use at your own risk.
                </p>
            </div>
        </div>

        {/* Terminal List */}
        <div className="flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-xs text-neutral-600 uppercase tracking-widest mb-4 px-4">
                <div className="col-span-2">ID</div>
                <div className="col-span-6 md:col-span-5">Filename</div>
                <div className="col-span-3 hidden md:block">Date</div>
                <div className="col-span-2 text-right hidden md:block">Size</div>
            </div>

            {experiments.map((exp, index) => (
                <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative grid grid-cols-12 gap-4 items-center py-6 px-4 border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredExp(exp.id)}
                    onMouseLeave={() => setHoveredExp(null)}
                >
                    <div className="col-span-2 text-xs text-amber-500/50 group-hover:text-amber-500 transition-colors">
                        {exp.id}
                    </div>
                    <div className="col-span-8 md:col-span-5">
                        <div className="text-lg md:text-xl text-white group-hover:text-amber-200 transition-colors flex items-center gap-2">
                            <span className="text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                            {exp.name}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1 md:hidden">{exp.desc}</div>
                    </div>
                    <div className="col-span-3 text-sm text-neutral-400 font-light hidden md:block">
                        {exp.desc}
                    </div>
                    <div className="col-span-2 text-right text-xs text-neutral-600 font-mono hidden md:block">
                        {exp.size}
                    </div>
                </motion.div>
            ))}
            <div className="border-t border-white/5" />
        </div>
      </div>

      {/* Holographic Hover Preview */}
      <AnimatePresence>
        {hoveredExp && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{ 
                    left: cursorPos.x + 20,
                    top: cursorPos.y - 100
                }}
                className="fixed z-50 pointer-events-none hidden md:block w-80 bg-neutral-900 border border-amber-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)]"
            >
                <div className="h-6 bg-neutral-800 border-b border-white/10 flex items-center px-3 gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="ml-auto text-[9px] text-neutral-500 font-mono">PREVIEW.EXE</span>
                </div>
                <div className="aspect-video relative bg-black">
                    {(() => {
                        const exp = experiments.find(e => e.id === hoveredExp);
                        return exp ? (
                            <>
                                <video 
                                    src={exp.video}
                                    autoPlay muted loop
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                            </>
                        ) : null;
                    })()}
                </div>
                <div className="p-3 font-mono text-[10px] text-green-500">
                    <span className="animate-pulse">●</span> COMPILING SHADERS...
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Transition(Labs);
