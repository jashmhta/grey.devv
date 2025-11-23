
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { TextReveal } from './TextReveal';
import Transition from './Transition';
import SEO from './SEO';

const PricingCard: React.FC<{ tier: any, isIndia: boolean }> = ({ tier, isIndia }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
    
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };
    
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative h-full p-8 md:p-12 rounded-2xl border backdrop-blur-sm flex flex-col group transition-colors duration-500 perspective-1000 ${
                tier.featured 
                ? 'border-amber-500/50 bg-neutral-900/50' 
                : 'border-white/10 bg-neutral-900/20'
            }`}
        >
            {/* Holographic Glare */}
            <motion.div 
                style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 80%)",
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.4]),
                    x: useTransform(mouseX, [-0.5, 0.5], [-50, 50]),
                    y: useTransform(mouseY, [-0.5, 0.5], [-50, 50]),
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none z-0 mix-blend-overlay"
            />
            
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex-1 flex flex-col">
                {tier.featured && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                        Best Value
                    </div>
                )}

                <h3 className="text-2xl font-display text-white mb-2">{tier.name}</h3>
                <p className="text-neutral-400 text-sm mb-8 min-h-[40px]">{tier.desc}</p>
                
                <div className="mb-8">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {isIndia ? tier.priceINR : tier.priceUSD}
                    </span>
                </div>

                <div className="flex-1 space-y-4 mb-12">
                    {tier.features.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <span className="text-sm text-neutral-300">{feat}</span>
                        </div>
                    ))}
                </div>

                <button className={`w-full py-4 border rounded-full text-xs uppercase tracking-widest transition-all duration-300 ${
                    tier.featured 
                    ? 'bg-amber-500 border-amber-500 text-black hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
                    : 'border-white/20 text-white hover:bg-white hover:text-black'
                }`}>
                    Start Project
                </button>
            </div>
        </motion.div>
    );
}

const Pricing: React.FC = () => {
  const [isIndia, setIsIndia] = useState(true);

  const tiers = [
    {
      name: "ESSENTIAL",
      priceUSD: "$2,999",
      priceINR: "₹80,000",
      desc: "Perfect for startups and portfolios.",
      features: ["Responsive Web Design", "Basic SEO Optimization", "Contact Form Integration", "1 Month Support", "Standard Animations"]
    },
    {
      name: "SIGNATURE",
      priceUSD: "$5,999",
      priceINR: "₹1,50,000",
      desc: "Our most popular package for businesses.",
      features: ["Advanced 3D Interactions", "CMS Integration (Sanity/Strapi)", "Performance Optimization", "3 Months Support", "Custom Branding Assets", "Dark Mode Toggle"],
      featured: true
    },
    {
      name: "PRESTIGE",
      priceUSD: "Custom",
      priceINR: "Custom",
      desc: "Enterprise grade solutions.",
      features: ["Full-Stack Application", "AI Integration (Gemini/OpenAI)", "Advanced Analytics Dashboard", "Lifetime Priority Support", "Cloud Infrastructure Setup", "Global CDN"],
    }
  ];

  return (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-40 pb-20 bg-[#050505] relative overflow-hidden min-h-screen"
    >
      <SEO 
        title="Pricing" 
        description="Investment packages tailored for startups to enterprises." 
      />
      {/* Background Grain */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('./assets/textures/cubes.png')]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
                <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">Investment</TextReveal>
                <h2 className="text-5xl md:text-7xl font-display text-white">PACKAGES</h2>
            </div>
            
            {/* Currency Toggle */}
            <div className="mt-8 md:mt-0 flex items-center gap-4 bg-neutral-900 p-1 rounded-full border border-white/10">
                <button 
                    onClick={() => setIsIndia(true)}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all ${isIndia ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                >
                    INR (₹)
                </button>
                <button 
                    onClick={() => setIsIndia(false)}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all ${!isIndia ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                >
                    USD ($)
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-2000">
            {tiers.map((tier, i) => (
                <PricingCard key={i} tier={tier} isIndia={isIndia} />
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Transition(Pricing);
