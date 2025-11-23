
import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className = "" }) => {
  return (
    <div className={`glitch-container relative inline-block group ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-amber-500 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1">
        {children}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2">
        {children}
      </span>
      
      <style>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(20% 0 70% 0); transform: translate(-2px, 1px); }
        }
        .group:hover .animate-glitch-1 {
          animation: glitch-1 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
        }
        .group:hover .animate-glitch-2 {
          animation: glitch-2 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default GlitchText;