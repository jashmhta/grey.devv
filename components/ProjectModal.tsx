
import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, Layers, Cpu, Globe, Calendar } from 'lucide-react';
import { Project } from '../types';
import { Link } from 'react-router-dom';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full lg:w-[900px] bg-neutral-950 h-full overflow-y-auto shadow-2xl border-l border-white/10 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 left-0 w-full bg-neutral-950/90 backdrop-blur-xl border-b border-white/5 p-6 flex justify-between items-center z-20">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">Case Study</span>
            </div>
            <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
            >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
        </div>

        {/* Hero Media */}
        <div className="w-full aspect-video relative">
            {project.videoUrl ? (
                <video 
                    src={project.videoUrl} 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-full object-cover"
                />
            ) : (
                <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale contrast-125"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-display text-white mb-4"
                >
                    {project.title}
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-neutral-300 font-light max-w-2xl"
                >
                    {project.description}
                </motion.p>
            </div>
        </div>

        {/* Content Container */}
        <div className="p-8 md:p-12 flex-1">
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 pb-12 mb-12">
                <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Layers className="w-3 h-3" /> Client
                    </span>
                    <span className="text-white font-display text-lg">{project.client}</span>
                </div>
                <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Year
                    </span>
                    <span className="text-white font-display text-lg">{project.year}</span>
                </div>
                <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Domain
                    </span>
                    <span className="text-white font-display text-lg">{project.domain}</span>
                </div>
                <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Cpu className="w-3 h-3" /> Role
                    </span>
                    <span className="text-white font-display text-lg">{project.role}</span>
                </div>
            </div>

            {/* Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h3 className="text-2xl font-display text-white mb-6">The Challenge</h3>
                        <p className="text-neutral-400 leading-relaxed font-light text-lg">
                            In a market saturated with noise, {project.client} needed to cut through the static. The objective was not merely to create a platform, but to engineer a digital ecosystem that would redefine their industry standards. We faced the complexity of integrating {project.tech[0]} with legacy systems while maintaining sub-millisecond response times.
                        </p>
                    </section>
                    
                    <section>
                        <h3 className="text-2xl font-display text-white mb-6">The Solution</h3>
                        <p className="text-neutral-400 leading-relaxed font-light text-lg">
                            We approached this by deconstructing the user journey into its atomic elements. Leveraging {project.tech[1]} for the core architecture, we built a headless system that prioritizes content velocity. The interface utilizes a custom-built WebGL engine to render real-time data visualizations, ensuring that every interaction feels tactile and immediate.
                        </p>
                    </section>

                    {/* Gallery Grid (Simulated) */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="aspect-square bg-neutral-900 rounded-lg overflow-hidden">
                            <img src={project.img} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity duration-500 grayscale" alt="Detail 1" />
                        </div>
                        <div className="aspect-square bg-neutral-900 rounded-lg overflow-hidden">
                             <img src={project.img} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity duration-500 grayscale scale-150" alt="Detail 2" />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/5 sticky top-32">
                        <h4 className="text-amber-500 font-mono uppercase tracking-widest text-xs mb-6">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-black rounded border border-white/10 text-neutral-400 text-xs font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="h-[1px] w-full bg-white/10 mb-8" />

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-neutral-400 text-sm">Project Value</span>
                            <span className="text-white font-bold">{project.price}</span>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-neutral-400 text-sm">Timeline</span>
                            <span className="text-white font-bold">8 Weeks</span>
                        </div>

                        <Link to={`/demo/${project.id}`}>
                            <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-amber-500 transition-all duration-300 flex items-center justify-center gap-2 group">
                                Launch Live Site
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
