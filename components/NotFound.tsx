
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('./assets/textures/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative"
        >
             <h1 className="text-[12rem] md:text-[20rem] font-display font-bold text-neutral-900 leading-none select-none">
                404
             </h1>
             <div className="absolute inset-0 flex items-center justify-center">
                 <h1 className="text-[12rem] md:text-[20rem] font-display font-bold text-transparent leading-none select-none bg-clip-text bg-gradient-to-b from-white/10 to-transparent blur-sm">
                    404
                 </h1>
             </div>
             
             {/* Glitch Overlay */}
             <motion.div 
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                animate={{ 
                    x: [-2, 2, -2],
                    clipPath: [
                        "inset(10% 0 80% 0)",
                        "inset(50% 0 10% 0)",
                        "inset(0% 0 0% 0)"
                    ]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    times: [0, 0.1, 1],
                    repeatDelay: 2
                }}
             >
                <h1 className="text-[12rem] md:text-[20rem] font-display font-bold text-amber-500/20 leading-none select-none mix-blend-screen">
                    404
                </h1>
             </motion.div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-8"
        >
            <h2 className="text-2xl md:text-4xl font-display text-white uppercase tracking-widest">
                Signal Lost
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-md mx-auto">
                The digital coordinates you are attempting to access have dissolved into the ether.
            </p>

            <Link to="/">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border border-amber-500 text-amber-500 rounded-full uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-black transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Base
                </motion.button>
            </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
