
import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import ImageReveal from './ImageReveal';

const Vision: React.FC = () => {
  return (
    <section className="py-32 bg-neutral-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
             <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-6">
                The Founder
             </TextReveal>
             <h2 className="text-5xl md:text-7xl font-display text-white mb-8 leading-tight">
                ARCHITECTING <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic font-elegant">DIGITAL FACES</span>.
             </h2>
             
             <div className="space-y-8 text-neutral-400 text-lg font-light leading-relaxed">
                 <p>
                    "I am <strong className="text-white">Jash Mehta</strong>. I don't just build websites; I create the digital face of your company."
                 </p>
                 <p>
                    My unique strength lies in versatility. Whether you are a startup needing a launchpad or an enterprise needing a transformation, I bridge the gap between your abstract ideas and concrete execution.
                 </p>
                 <p>
                    By leveraging cutting-edge AI tools alongside bespoke hand-coding, I multiply my output—delivering the scope and quality of a full agency with the personal touch and cost-efficiency of a single partner.
                 </p>
             </div>

             <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6">
                 <div>
                    <div className="font-elegant text-4xl text-white/90">Jash Mehta</div>
                 </div>
                 <div className="h-[1px] w-12 bg-amber-500/50"></div>
                 <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Founder & Lead Developer</div>
             </div>
          </div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-sm overflow-hidden order-1 lg:order-2 group"
          >
              <ImageReveal 
                src="/jash.jpg" 
                alt="Jash Mehta" 
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-900/20 mix-blend-multiply pointer-events-none" />
              
              {/* Floating Element */}
              <div className="absolute bottom-10 right-10 bg-black/80 backdrop-blur-xl border border-white/10 p-6 max-w-xs z-10 shadow-2xl">
                  <div className="text-amber-500 text-xs font-mono mb-2 tracking-widest uppercase">Philosophy</div>
                  <div className="text-white font-display text-xl mb-4">Idea to Execution</div>
                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                      Bridging the gap for customers to imagine and realize their digital potential.
                  </p>
              </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
