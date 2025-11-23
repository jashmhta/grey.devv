
import React from 'react';
import { motion } from 'framer-motion';
import { ServiceType } from '../types';
import { TextReveal } from './TextReveal';
import { PlusGrid } from './Decorative';
import Transition from './Transition';
import ImageReveal from './ImageReveal';
import SEO from './SEO';

const services = [
  {
    id: "01",
    title: "High-End Web",
    desc: "React, Next.js, WebGL",
    details: "Immersive, high-performance websites that tell your brand's story. From portfolio showcases to complex e-commerce platforms, we build digital experiences that captivate.",
    color: "#111",
    image: "./assets/images/image_02.jpg"
  },
  {
    id: "02",
    title: "Mobile Apps",
    desc: "iOS & Android",
    details: "Native-feel applications tailored to your users. Smooth animations, intuitive UX, and robust functionality to put your business in your customer's pocket.",
    color: "#161616",
    image: "./assets/images/image_02.jpg"
  },
  {
    id: "04",
    title: "Branding",
    desc: "Identity & Strategy",
    details: "Creating your digital face. We craft cohesive brand identities, logos, and design systems that resonate with your target audience.",
    color: "#222",
    image: "./assets/images/image_04.jpg"
  }
];

const ServiceCard: React.FC<{ service: any, index: number, total: number }> = ({ service, index, total }) => {
    return (
        <div 
            className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4"
            style={{ top: index * 40 }} // Stacking offset
        >
            <motion.div 
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative w-full max-w-6xl h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                style={{ 
                    backgroundColor: service.color,
                    zIndex: index 
                }}
            >
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('./assets/textures/stardust.png')]"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="p-8 md:p-16 flex flex-col justify-between relative z-10">
                        <div>
                            <span className="font-mono text-amber-500 text-sm tracking-widest mb-4 block">0{index + 1} / 0{total}</span>
                            <h2 className="text-4xl md:text-6xl font-display text-white mb-6">{service.title}</h2>
                            <p className="text-xl text-neutral-300 font-light">{service.desc}</p>
                        </div>
                        
                        <div>
                            <div className="w-12 h-[1px] bg-amber-500 mb-8"></div>
                            <p className="text-neutral-400 leading-relaxed max-w-md">
                                {service.details}
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative h-full min-h-[300px] border-l border-white/5 overflow-hidden group">
                        <ImageReveal 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                            containerClassName="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const Services: React.FC = () => {
  return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black min-h-screen relative pb-40"
        >
        <SEO 
          title="Services" 
          description="Web Development, App Creation, and Strategic Branding services by GREY." 
        />
        <PlusGrid />
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
            <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">Competence</TextReveal>
            <h1 className="text-6xl md:text-9xl font-display text-white mb-12">SERVICES</h1>
            <p className="text-neutral-400 max-w-2xl text-lg mb-20">
                Tailored solutions for ambitious brands. We focus on what matters: creating a stunning, functional digital face for your company.
            </p>

            <div className="relative">
                {services.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} total={services.length} />
                ))}
            </div>
        </div>
        </motion.div>
  );
};

export default Transition(Services);
