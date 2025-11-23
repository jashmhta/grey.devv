
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Search, PenTool, Code2, Rocket, Layout, ChevronRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { PlusGrid } from './Decorative';

const steps = [
    {
        id: "01",
        title: "Discovery",
        subtitle: "The Foundation",
        description: "We immerse ourselves in your brand's DNA. Through stakeholder interviews and market analysis, we uncover the unique narrative that sets you apart.",
        tags: ["Strategy", "Audit", "Research"],
        icon: Search,
    },
    {
        id: "02",
        title: "Architecture",
        subtitle: "The Blueprint",
        description: "Designing the invisible. We construct robust information architecture and user flows that ensure every interaction is intuitive and purposeful.",
        tags: ["UX Design", "Wireframing", "Sitemap"],
        icon: Layout,
    },
    {
        id: "03",
        title: "Visual Design",
        subtitle: "The Aesthetic",
        description: "Where logic meets magic. We craft high-fidelity visuals, motion concepts, and 3D assets that establish a distinct digital presence.",
        tags: ["UI Design", "Motion", "3D"],
        icon: PenTool,
    },
    {
        id: "04",
        title: "Development",
        subtitle: "The Build",
        description: "Translating vision into code. Our engineers build with clean, semantic architecture using the latest technologies for maximum performance.",
        tags: ["React", "WebGL", "Next.js"],
        icon: Code2,
    },
    {
        id: "05",
        title: "Launch",
        subtitle: "The Premiere",
        description: "The final countdown. Rigorous testing, performance optimization, and global CDN deployment to ensure a flawless premiere.",
        tags: ["QA", "Deployment", "Analytics"],
        icon: Rocket,
    }
];

const ProcessCard: React.FC<{ step: any, index: number }> = ({ step, index }) => {
    return (
        <motion.div 
            className="min-w-[85vw] md:min-w-[400px] h-[500px] bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500 select-none"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background Number */}
            <div className="absolute -bottom-10 -right-10 font-display text-[10rem] leading-none font-bold text-white/5 select-none group-hover:text-amber-500/5 transition-colors duration-700 pointer-events-none">
                {step.id}
            </div>

            {/* Header */}
            <div className="relative z-10 pointer-events-none">
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                        <step.icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{step.subtitle}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {step.title}
                </h3>
                <p className="text-base text-neutral-400 font-light leading-relaxed">
                    {step.description}
                </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 border-t border-white/5 pt-6 mt-6 pointer-events-none">
                <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider border border-white/5 px-3 py-1.5 rounded-full bg-black/20 group-hover:border-amber-500/30 group-hover:text-amber-500/80 transition-colors duration-500">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
        </motion.div>
    )
}

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, -width], [0, 1]);
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative z-10 overflow-hidden">
      <PlusGrid className="opacity-[0.1]" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
        <div>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-[1px] bg-amber-500"></div>
                <TextReveal className="text-sm font-mono text-amber-500 uppercase tracking-widest">
                    The Methodology
                </TextReveal>
            </div>
            <h3 className="text-5xl md:text-8xl font-display text-white">PROCESS</h3>
        </div>
        <div className="hidden md:flex flex-col items-end gap-4">
            <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase tracking-widest animate-pulse">
                Drag to explore <ChevronRight className="w-4 h-4" />
            </div>
            {/* Progress Bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-amber-500" 
                    style={{ scaleX, originX: 0 }}
                />
            </div>
        </div>
      </div>

      {/* Draggable Slider Container */}
      <motion.div 
        ref={containerRef}
        className="w-full cursor-grab active:cursor-grabbing overflow-hidden px-6"
      >
        <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            style={{ x }}
            className="flex gap-6 md:gap-8 w-max"
        >
            {steps.map((step, i) => (
                <ProcessCard key={i} step={step} index={i} />
            ))}
            
            {/* CTA Card */}
            <motion.div 
                className="min-w-[85vw] md:min-w-[400px] h-[500px] flex-shrink-0 flex items-center justify-center group relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
            >
                <a href="/contact" className="block text-center relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.4)]">
                        <ArrowRight className="w-10 h-10 text-black group-hover:-rotate-45 transition-transform duration-500" />
                    </div>
                    <h3 className="text-4xl font-display text-white mb-2 group-hover:text-amber-500 transition-colors">Start Now</h3>
                    <p className="font-mono text-neutral-500 text-xs uppercase tracking-widest">Initiate Protocol</p>
                </a>
                
                {/* Background decoration */}
                <div className="absolute inset-0 border border-white/5 rounded-3xl bg-neutral-900/20 backdrop-blur-sm -z-10 group-hover:border-amber-500/30 transition-colors duration-500"></div>
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Process;
