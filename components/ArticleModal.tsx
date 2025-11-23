
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { X, Clock, Calendar, Share2, Check } from 'lucide-react';

interface ArticleModalProps {
  article: any;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  
  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = () => {
    // Simulate copy to clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full md:w-[800px] bg-neutral-900 h-full shadow-2xl border-l border-white/10 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Progress Bar */}
        <div className="relative z-20">
            <div className="bg-neutral-900/80 backdrop-blur-md border-b border-white/5 p-6 flex justify-between items-center">
                <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">{article.category}</span>
                <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-amber-500 origin-left" 
                style={{ scaleX, width: "100%" }}
            />
        </div>

        {/* Scrollable Content */}
        <div ref={containerRef} className="flex-1 overflow-y-auto">
            <div className="p-8 md:p-12">
                <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>

                <h1 className="text-3xl md:text-5xl font-display text-white mb-8 leading-tight">
                    {article.title}
                </h1>

                <div className="flex items-center gap-6 mb-12 text-neutral-500 font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-8">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        5 Min Read
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-neutral-300 font-light leading-relaxed">
                    <p className="text-xl text-white mb-8 font-normal">
                        In the rapidly evolving landscape of digital design, the boundaries between static interface and immersive experience are dissolving.
                    </p>
                    <p className="mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h3 className="text-2xl text-white font-display mt-12 mb-6">The Shift to Spatial</h3>
                    <p className="mb-6">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <blockquote className="border-l-2 border-amber-500 pl-6 italic text-xl text-white my-12 font-elegant">
                        "Design is not just what it looks like and feels like. Design is how it works."
                    </blockquote>
                    <p className="mb-6">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-20 pt-12 border-t border-white/10 text-center">
                    <button 
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 mx-auto text-amber-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                        {copied ? "Link Copied" : "Share Article"}
                    </button>
                </div>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArticleModal;
