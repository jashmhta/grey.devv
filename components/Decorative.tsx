
import React from 'react';
import { motion } from 'framer-motion';

// Global Corner Markers (HUD Style)
export const CornerMarks: React.FC = () => (
  <div className="fixed inset-4 md:inset-6 pointer-events-none z-[40] mix-blend-difference opacity-50">
    {/* Top Left */}
    <div className="absolute top-0 left-0 w-8 h-[1px] bg-white"></div>
    <div className="absolute top-0 left-0 h-8 w-[1px] bg-white"></div>
    
    {/* Top Right */}
    <div className="absolute top-0 right-0 w-8 h-[1px] bg-white"></div>
    <div className="absolute top-0 right-0 h-8 w-[1px] bg-white"></div>
    
    {/* Bottom Left */}
    <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-white"></div>
    <div className="absolute bottom-0 left-0 h-8 w-[1px] bg-white"></div>
    
    {/* Bottom Right */}
    <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-white"></div>
    <div className="absolute bottom-0 right-0 h-8 w-[1px] bg-white"></div>

    {/* Coordinates / Data */}
    <div className="absolute top-0 left-12 text-[10px] font-mono tracking-widest text-white hidden md:block">
        SYS.VER.4.0
    </div>
    <div className="absolute bottom-0 right-12 text-[10px] font-mono tracking-widest text-white hidden md:block">
        40.7128° N, 74.0060° W
    </div>
    
    {/* Center Lines */}
    <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-white/20"></div>
    <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-white/20"></div>
    <div className="absolute top-0 left-1/2 h-4 w-[1px] bg-white/20"></div>
    <div className="absolute bottom-0 left-1/2 h-4 w-[1px] bg-white/20"></div>
  </div>
);

// Subtle Dot Grid Background
export const PlusGrid: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className}`} style={{
    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
    backgroundSize: '40px 40px'
  }}></div>
);

// Rotating "Scroll" Badge
export const TechBadge: React.FC = () => (
    <motion.div 
        className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
            <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="2px" fontWeight="bold" className="font-mono uppercase">
                <textPath href="#circlePath">
                    Grey Digital Agency • Est 2024 • 
                </textPath>
            </text>
        </svg>
        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
    </motion.div>
);

// World Map Dots for Contact
export const DotMap: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" className="text-white/20" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
            
            {/* Connecting Lines Simulation */}
            <motion.path 
                d="M100,100 Q400,50 600,300" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
             <motion.path 
                d="M200,400 Q500,300 800,100" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, delay: 1 }}
            />
            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);
