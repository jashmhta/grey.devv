
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[3/4]"
  containerClassName?: string;
}

const ImageReveal: React.FC<ImageRevealProps> = ({ 
  src, 
  alt, 
  className = "object-cover w-full h-full", 
  aspectRatio = "aspect-video",
  containerClassName = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${aspectRatio} ${containerClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10">
           <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-900 text-neutral-700">
            <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Image Unavailable</span>
        </div>
      )}

      {/* The Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
            opacity: isLoading ? 0 : 1, 
            scale: isLoading ? 1.1 : 1 
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
            setIsLoading(false);
            setHasError(true);
        }}
        className={`${className} transition-transform duration-1000 will-change-transform`}
      />

      {/* Film Grain Overlay for Aesthetic */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('./assets/textures/stardust.png')] mix-blend-overlay z-10" />
      
      <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
            animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageReveal;
