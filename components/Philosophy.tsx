
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from './TextReveal';

const clients = ["VOGUE", "FORBES", "CARTIER", "TESLA", "SOTHEBY'S", "WIRED"];

const Philosophy: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section className="py-32 bg-neutral-950 relative overflow-hidden">
      
      {/* Massive Background Parallax Text */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none z-0 opacity-[0.03]">
        <motion.div style={{ x: textX }} className="whitespace-nowrap">
            <h1 className="text-[20vw] font-display font-bold leading-none text-white">
                DIGITAL • ALCHEMY • PRECISION •
            </h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 border-b border-white/10 pb-12">
            <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-6 md:mb-0">
                The Manifesto
            </TextReveal>
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display text-white leading-tight mb-8">
                    Digital Alchemy for the <span className="text-amber-500 italic font-elegant">Modern Era</span>.
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed font-light">
                    We believe that true luxury lies in the invisible details. In a world of noise, we engineer silence, precision, and profound impact. We don't just build websites; we architect digital monuments that stand the test of time.
                </p>
            </div>
        </div>

        {/* Visual Break */}
        <div className="relative w-full h-[60vh] overflow-hidden mb-24 rounded-sm">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
                <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                    alt="Abstract Architecture" 
                    className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-[10vw] font-display font-bold text-white mix-blend-overlay opacity-80 tracking-tighter">
                    PRECISION
                </h3>
            </div>
        </div>

        {/* Clients */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center border-t border-white/10 pt-12">
            {clients.map((client, i) => (
                <motion.div 
                    key={client}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-center"
                >
                    <span className="font-display text-xl text-neutral-600 hover:text-amber-500 transition-colors duration-500 cursor-default tracking-widest">
                        {client}
                    </span>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
