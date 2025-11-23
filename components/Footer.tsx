
import React from 'react';
import { TextReveal } from './TextReveal';
import { ArrowRight, ArrowUp } from 'lucide-react';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-neutral-900 pt-32 pb-10 text-center relative overflow-hidden">
      
      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto px-6 mb-32">
        <div className="border border-white/10 rounded-2xl p-8 md:p-12 bg-neutral-900/20 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-3xl md:text-5xl font-display text-white mb-4 relative z-10">Join the Inner Circle</h3>
            <p className="text-neutral-400 mb-8 relative z-10">Receive curated insights on digital luxury and design.</p>
            
            <form className="relative z-10 max-w-md mx-auto flex gap-2">
                <input 
                    type="email" 
                    placeholder="email@address.com"
                    className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                    <ArrowRight className="w-5 h-5 text-black" />
                </button>
            </form>
        </div>
      </div>

      {/* Big Text */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
        <div className="overflow-hidden">
             <h2 className="text-[15vw] leading-none font-display font-bold text-neutral-900 select-none hover:text-neutral-800 transition-colors duration-700 cursor-pointer">
                GREY
            </h2>
        </div>
        
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-20" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full mb-20 text-left">
            <div className="flex flex-col gap-6">
                <h4 className="text-amber-500 font-mono text-sm uppercase tracking-widest">Navigation</h4>
                <a href="/work" className="text-neutral-400 hover:text-white transition-colors">Selected Work</a>
                <a href="/services" className="text-neutral-400 hover:text-white transition-colors">Services</a>
                <a href="/work" className="text-neutral-400 hover:text-white transition-colors">Templates</a>
                <a href="/pricing" className="text-neutral-400 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex flex-col gap-6">
                <h4 className="text-amber-500 font-mono text-sm uppercase tracking-widest">Socials</h4>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors group flex items-center gap-2">
                    Instagram <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors group flex items-center gap-2">
                    Twitter <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors group flex items-center gap-2">
                    LinkedIn <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
            </div>

            <div className="flex flex-col gap-6">
                <h4 className="text-amber-500 font-mono text-sm uppercase tracking-widest">Legal</h4>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
            </div>

            <div className="flex flex-col gap-6">
                <h4 className="text-amber-500 font-mono text-sm uppercase tracking-widest">Contact</h4>
                <a href="mailto:mjash028@gmail.com" className="text-lg text-white font-display hover:text-amber-500 transition-colors">mjash028@gmail.com</a>
                <a href="tel:+918169178308" className="text-neutral-400 hover:text-white transition-colors">+91 81691 78308</a>
                <p className="text-neutral-500 text-sm leading-relaxed">
                    Mumbai, India
                </p>
            </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-neutral-600 uppercase tracking-widest">
            <span>© 2024 GREY Digital Agency. All rights reserved.</span>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
                <span>Jash Mehta</span>
                <Magnetic strength={0.3}>
                    <button 
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </Magnetic>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
