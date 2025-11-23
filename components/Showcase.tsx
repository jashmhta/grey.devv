
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { Link } from 'react-router-dom';
import Transition from './Transition';
import Magnetic from './Magnetic';
import ImageReveal from './ImageReveal';
import SEO from './SEO';

type ProjectCategory = 'All' | 'Web' | 'App' | 'Web3' | 'Luxury' | 'Commerce' | 'AI' | 'Hospitality';

export const projects: Project[] = [
    {
        id: "vogue-noir",
        title: "VOGUE NOIR",
        client: "Condé Nast",
        year: "2024",
        role: "Digital Rebrand",
        domain: "Fashion & Editorial",
        category: 'Luxury',
        description: "A high-fashion editorial platform featuring immersive video backgrounds, silky smooth transitions, and a typography-led design system.",
        img: "./assets/images/image_05.jpg", // High Fashion B&W
        tech: ["React", "GSAP", "WebGL"],
        price: "$8k",
        videoUrl: "./assets/videos/video_01.mp4"
    },
    {
        id: "velocita",
        title: "VELOCITÀ",
        client: "Pininfarina",
        year: "2024",
        role: "3D Configurator",
        domain: "Automotive",
        category: 'Web',
        description: "Real-time 3D hypercar configurator. Features ray-tracing simulation in the browser.",
        img: "./assets/images/image_06.jpg", // Supercar
        tech: ["Three.js", "R3F", "Blender"],
        price: "$12k",
        videoUrl: "./assets/videos/video_02.mp4"
    },
    {
        id: "synapse",
        title: "SYNAPSE",
        client: "OpenAI Partner",
        year: "2024",
        role: "Product Design",
        domain: "AI SaaS",
        category: 'AI',
        description: "A neural network visualization dashboard. Generative UI that adapts layout based on user behavior.",
        img: "./assets/images/image_07.jpg", // AI Abstract
        tech: ["Next.js", "Python", "TensorFlow"],
        price: "$18k",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-plus-signs-344-large.mp4"
    },
    {
        id: "ether",
        title: "ETHER",
        client: "Ethereum Fdn",
        year: "2024",
        role: "DApp Design",
        domain: "Web3",
        category: 'Web3',
        description: "Liquid-metal aesthetic for the decentralized web. Dark mode by default, featuring live gas tracking.",
        img: "./assets/images/image_08.jpg", // Crypto/Abstract
        tech: ["Solidity", "Ethers.js", "React"],
        price: "$15k",
        videoUrl: "./assets/videos/video_03.mp4"
    },
    {
        id: "ember-oak",
        title: "EMBER & OAK",
        client: "Michelin Group",
        year: "2024",
        role: "Booking System",
        domain: "Fine Dining",
        category: 'Hospitality',
        description: "Reservation system for Michelin-star venues with immersive menu previews.",
        img: "./assets/images/image_09.jpg", // Dark Restaurant
        tech: ["Next.js", "Postgres", "Framer"],
        price: "$15k",
        videoUrl: "./assets/videos/video_04.mp4"
    },
    {
        id: "quantum",
        title: "QUANTUM",
        client: "Fintech Startup",
        year: "2024",
        role: "App Dev",
        domain: "Finance",
        category: 'App',
        description: "High-frequency trading terminal for mobile with real-time sockets.",
        img: "./assets/images/image_08.jpg", // Finance/Chart
        tech: ["Flutter", "Go", "gRPC"],
        price: "$25k",
        videoUrl: "./assets/videos/video_05.mp4"
    },
    {
        id: "estate-gold",
        title: "ESTATE GOLD",
        client: "Sotheby's",
        year: "2023",
        role: "Web Experience",
        domain: "Real Estate",
        category: 'Luxury',
        description: "Architectural brutality meets digital elegance. Virtual tours and 3D floor plans.",
        img: "./assets/images/image_11.jpg", // Dark Architecture
        tech: ["Next.js", "Mapbox", "Sanity"],
        price: "$6k",
        videoUrl: "./assets/videos/video_06.mp4"
    }
];

// 3D Tilt Card Component (Refined Physics)
const ProjectCard = ({ project, onClick, onHover, onLeave, isHovered }: { project: Project, onClick: () => void, onHover: () => void, onLeave: () => void, isHovered: boolean }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
    
    // Subtle Scale on Hover
    const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 300, damping: 20 });

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
        onLeave();
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={onHover}
            onClick={onClick}
            className="group relative bg-neutral-900/40 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col h-[550px] cursor-pointer perspective-1000"
        >
            {/* Holographic Sheen */}
            <motion.div 
                className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 50%)',
                    x: useTransform(mouseX, [-0.5, 0.5], ['-100%', '100%'])
                }}
            />

             <div style={{ transform: "translateZ(20px)" }} className="h-[300px] overflow-hidden relative flex-shrink-0 bg-black">
                {/* Video Overlay */}
                <AnimatePresence>
                    {project.videoUrl && isHovered && (
                        <motion.video
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            src={project.videoUrl}
                            autoPlay muted loop playsInline
                            className="absolute inset-0 w-full h-full object-cover z-20"
                        />
                    )}
                </AnimatePresence>

                {/* Image Reveal Component */}
                <ImageReveal 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    containerClassName="h-full w-full"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80 z-20 pointer-events-none" />
                
                <div className="absolute top-4 left-4 z-30">
                        <div className="bg-black/50 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-full font-mono text-[9px] tracking-widest uppercase">
                        {project.category}
                        </div>
                </div>
            </div>

            <div style={{ transform: "translateZ(40px)" }} className="p-8 relative flex-1 flex flex-col border-t border-white/5 bg-neutral-900/90">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-display text-white group-hover:text-amber-500 transition-colors">{project.title}</h3>
                        <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 mt-2">
                            {project.client} • {project.year}
                        </span>
                    </div>
                </div>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1 font-light line-clamp-3">
                    {project.description}
                </p>

                <div className="flex gap-3 mt-auto">
                    <button className="flex-1 group/btn flex items-center justify-center gap-2 text-black bg-white hover:bg-amber-500 transition-all duration-300 text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded-full">
                        Case Study <ArrowUpRight className="w-3 h-3 group-hover/btn:rotate-45 transition-transform" />
                    </button>
                    <Link 
                        to={`/demo/${project.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 border border-white/20 hover:bg-white/10 text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded-full flex items-center justify-center hover:border-white"
                    >
                        Live Demo
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

const Showcase: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const filters: ProjectCategory[] = ['All', 'Web', 'App', 'Web3', 'Luxury', 'AI', 'Hospitality', 'Commerce'];

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-neutral-950 min-h-screen pt-32 pb-20 px-6"
    >
      <SEO 
        title="Our Work" 
        description="Explore a curated collection of digital masterpieces by GREY. Web, App, and AI solutions." 
      />
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-20">
         <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mx-auto mb-4">The Collection</TextReveal>
         <h1 className="text-6xl md:text-9xl font-display text-white mb-12">WORK</h1>
         
         {/* Filter Chips */}
         <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-5xl mx-auto">
            {filters.map((cat) => (
                <Magnetic key={cat} strength={0.3}>
                    <button 
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 uppercase text-[10px] tracking-widest flex items-center gap-2 ${
                            filter === cat 
                            ? 'bg-amber-500 text-black border-amber-500 font-bold' 
                            : 'border-white/10 text-neutral-400 hover:border-white hover:text-white bg-neutral-900/50'
                        }`}
                    >
                        {cat}
                    </button>
                </Magnetic>
            ))}
         </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
                <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                    <ProjectCard 
                        project={project} 
                        isHovered={hoveredProject === project.id}
                        onHover={() => setHoveredProject(project.id || '')}
                        onLeave={() => setHoveredProject(null)}
                        onClick={() => setSelectedProject(project)}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Transition(Showcase);
