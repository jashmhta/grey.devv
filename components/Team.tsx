
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from './TextReveal';
import ImageReveal from './ImageReveal';

const Team: React.FC = () => {
  return (
    <section className="py-32 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
             <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">
                Leadership
             </TextReveal>
             <h2 className="text-5xl md:text-7xl font-display text-white">THE STUDIO</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative h-[600px] w-full"
            >
                <ImageReveal 
                    src="/jash.jpg" 
                    alt="Jash Mehta"
                    className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                    containerClassName="w-full h-full"
                />
                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md p-6 border border-white/10">
                    <h3 className="text-3xl font-display text-white">Jash Mehta</h3>
                    <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">Founder & Creative Director</span>
                </div>
            </motion.div>

            <div className="space-y-8">
                <p className="text-2xl text-neutral-300 font-light leading-relaxed">
                    "GREY is a one-man army augmented by a legion of intelligence."
                </p>
                <p className="text-neutral-400 text-lg leading-relaxed">
                    By operating as a specialized solo founder, I eliminate the overhead, miscommunication, and bloat of traditional agencies. 
                </p>
                <p className="text-neutral-400 text-lg leading-relaxed">
                    I personally oversee every pixel, every line of code, and every interaction. When you hire GREY, you don't get a junior team; you get me.
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    <div>
                        <span className="block text-4xl font-display text-white mb-2">100%</span>
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Founder Attention</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-display text-white mb-2">10x</span>
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Faster Execution</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
