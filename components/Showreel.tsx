
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

const Showreel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section 
        ref={containerRef} 
        className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black cursor-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
    >
      {/* Video Background */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <video 
            src="./assets/videos/video_01.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Magnetic Play Button */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
                x: isHovered ? (mousePos.x - (containerRef.current?.clientWidth || 0)/2) * 0.2 : 0,
                y: isHovered ? (mousePos.y - (containerRef.current?.clientHeight || 0)/2) * 0.2 : 0,
                scale: isHovered ? 1.2 : 1
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center"
          >
              <div className="relative">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-amber-500/50 rounded-full blur-xl -z-10"
                  />
              </div>
          </motion.div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 z-20 mix-blend-difference">
          <h2 className="text-4xl md:text-6xl font-display text-white">
              THE REEL <span className="text-amber-500 text-lg align-top">2024</span>
          </h2>
      </div>
    </section>
  );
};

export default Showreel;
