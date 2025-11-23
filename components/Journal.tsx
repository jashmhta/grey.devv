
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TextReveal } from './TextReveal';
import ArticleModal from './ArticleModal';
import Transition from './Transition';
import Magnetic from './Magnetic';
import ImageReveal from './ImageReveal';
import SEO from './SEO';

const articles = [
    {
        id: 1,
        category: "Thought Leadership",
        date: "Oct 12, 2024",
        readTime: "8 Min",
        title: "The Death of Flat Design",
        excerpt: "Why spatial depth, physics, and 'digital tactility' are returning to modern interfaces. A deep dive into the post-minimalist era.",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
        featured: true
    },
    {
        id: 2,
        category: "Strategy",
        date: "Sep 28, 2024",
        readTime: "5 Min",
        title: "Silence as Strategy",
        excerpt: "Minimalist luxury in a noisy digital world.",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop",
        featured: false
    },
    {
        id: 3,
        category: "Engineering",
        date: "Sep 15, 2024",
        readTime: "12 Min",
        title: "Optimizing WebGL",
        excerpt: "Running complex 3D scenes on mobile devices.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        featured: false
    },
    {
        id: "4",
        category: "Culture",
        date: "Aug 10, 2024",
        readTime: "6 Min",
        title: "Digital Brutalism",
        excerpt: "The raw aesthetic of early computing returns.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        featured: false
    }
];

const Journal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-[#050505] min-h-screen pt-32 pb-20 relative z-10"
    >
      <SEO 
        title="Journal" 
        description="Insights on digital luxury, design trends, and engineering from GREY." 
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
            <div>
                <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">The Editorial</TextReveal>
                <h1 className="text-6xl md:text-9xl font-display text-white tracking-tight">INSIGHTS</h1>
            </div>
            <div className="hidden md:block text-right text-neutral-500 text-sm font-mono">
                ISSUE 04<br/>
                2024 COLLECTION
            </div>
        </div>

        {/* Featured Article (Cover Story) */}
        <div 
            onClick={() => setSelectedArticle(featuredArticle)}
            className="group cursor-pointer mb-20"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                    <ImageReveal 
                        src={featuredArticle.image} 
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                        containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-amber-500 text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Cover Story</span>
                        <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">{featuredArticle.readTime} Read</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight group-hover:text-amber-500 transition-colors duration-500">
                        {featuredArticle.title}
                    </h2>
                    <p className="text-xl text-neutral-400 font-light leading-relaxed mb-8 border-l border-white/20 pl-6">
                        {featuredArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform">
                        Read Article <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>

        {/* Grid Layout for Others */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {otherArticles.map((article, i) => (
                <div 
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group cursor-pointer flex flex-col h-full border-r border-white/10 pr-8 last:border-0"
                >
                    <div className="aspect-video overflow-hidden rounded-sm mb-6 relative">
                        <ImageReveal 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            containerClassName="w-full h-full"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
                        <span className="text-amber-500">{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>
                    
                    <h3 className="text-2xl font-display text-white mb-4 group-hover:text-amber-500 transition-colors">
                        {article.title}
                    </h3>
                    
                    <div className="mt-auto pt-4">
                        <Magnetic strength={0.2}>
                            <button className="w-full py-3 border border-white/10 hover:bg-white hover:text-black text-neutral-400 text-xs uppercase tracking-widest transition-all duration-300">
                                Read
                            </button>
                        </Magnetic>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
            <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Transition(Journal);
