
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { TextReveal } from './TextReveal';

const faqs = [
    {
        question: "Do you work with startups?",
        answer: "Yes, we partner with ambitious early-stage companies that value design as a core competitive advantage. We have specific packages tailored for high-growth startups."
    },
    {
        question: "What is your typical timeline?",
        answer: "A standard branding and web project typically takes 8-12 weeks. Complex applications or enterprise platforms may range from 3-6 months depending on scope."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Absolutely. We offer 'White Glove' retainer packages to ensure your digital infrastructure remains secure, performant, and up-to-date with the latest technologies."
    },
    {
        question: "How do you handle 3D & WebGL performance?",
        answer: "We are experts in optimization. We use techniques like instanced mesh rendering, texture compression, and GLSL shader optimization to ensure 60fps performance even on mobile devices."
    }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
            <div className="mb-16 text-center">
                <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">
                    Inquiries
                </TextReveal>
                <h2 className="text-4xl md:text-6xl font-display text-white">Frequently Asked</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-2xl overflow-hidden bg-neutral-900/30">
                        <button 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex justify-between items-center p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="text-xl text-white font-display">{faq.question}</span>
                            <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors ${activeIndex === index ? 'bg-amber-500 text-black border-amber-500' : 'text-white'}`}>
                                {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 md:p-8 pt-0 text-neutral-400 leading-relaxed font-light">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default FAQ;
