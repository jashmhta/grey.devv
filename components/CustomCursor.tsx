
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  id: number;
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Point[]>([]);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let idCounter = 0;

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add point to trail
      setTrail(prev => [
        ...prev.slice(-15), // Keep last 15 points
        { x: e.clientX, y: e.clientY, id: idCounter++ }
      ]);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);

    // Cleanup trail loop
    const cleanupTrail = () => {
        setTrail(prev => {
            if (prev.length === 0) return prev;
            return prev.slice(1);
        });
        requestRef.current = requestAnimationFrame(cleanupTrail);
    };
    requestRef.current = requestAnimationFrame(cleanupTrail);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((point, index) => (
        <motion.div
            key={point.id}
            className="fixed top-0 left-0 w-1 h-1 bg-amber-500 rounded-full pointer-events-none z-[9998]"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
                left: point.x, 
                top: point.y,
                transform: 'translate(-50%, -50%)' // Center logic moved to style/calc
            }}
        />
      ))}

      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? 'rgba(251, 191, 36, 0.8)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovering ? 'rgba(251, 191, 36, 0.1)' : 'transparent'
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;