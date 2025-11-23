
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { TextReveal } from './TextReveal';

const reviews = [
    {
        id: 1,
        text: "GREY didn't just build a website; they architected a digital cathedral for our brand. The attention to motion physics is unparalleled.",
        author: "Victoria S.",
        role: "CMO, VOGUE NOIR"
    },
    {
        id: 2,
        text: "We needed a platform that could handle millions of real-time data points without sacrificing beauty. They delivered a masterpiece.",
        author: "Alexander K.",
        role: "Founder, NEXUS FIN"
    },
    {
        id: 3,
        text: "Absolute alchemy. They took our rough vision and turned it into a gold-standard digital experience. Our conversion rates doubled.",
        author: "Elena R.",
        role: "Director, ESTATE GOLD"
    },
    {
        id: 4,
        text: "The team operates with surgical precision. Minimalist, elegant, and incredibly powerful code. Truly the top 1%.",
        author: "Marcus T.",
        role: "CTO, AURA"
    }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  
  const nextReview = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
        setCurrentIndex(0);
    }
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
        setCurrentIndex(reviews.length - 1);
    }
  };

  return (
    <section className="py-32 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-20 flex flex-col items-center text-center">
            <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">
                Social Proof
            </TextReveal>
            <h2 className="text-5xl md:text-7xl font-display text-white">ACCLAIM</h2>
        </div>

        <div className="relative min-h-[400px] flex flex-col items-center justify-center">
            {/* Quote Icon Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 opacity-5 pointer-events-none">
                <Quote className="w-64 h-64 text-white" />
            </div>

            <div className="relative w-full max-w-4xl overflow-hidden">
                <motion.div 
                    className="flex"
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {reviews.map((review) => (
                        <div key={review.id} className="w-full flex-shrink-0 px-4 md:px-12 flex flex-col items-center text-center">
                            <p className="text-2xl md:text-4xl font-light text-neutral-200 leading-relaxed mb-12 font-elegant">
                                "{review.text}"
                            </p>
                            
                            <div className="flex flex-col items-center gap-2">
                                <h4 className="text-xl font-display font-bold text-white tracking-widest">{review.author}</h4>
                                <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">{review.role}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex gap-8 mt-16">
                <button 
                    onClick={prevReview}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    {reviews.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 transition-all duration-500 ${currentIndex === idx ? 'w-8 bg-amber-500' : 'w-2 bg-neutral-800 hover:bg-neutral-600'}`}
                        />
                    ))}
                </div>
                <button 
                    onClick={nextReview}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
