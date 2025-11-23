
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate checking local storage
    const hasConsented = localStorage.getItem('grey_consent');
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 3000); // Delay for effect
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('grey_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9990] max-w-sm w-full"
        >
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none"></div>
            
            <h4 className="text-white font-display mb-2 text-lg">Digital Privacy</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
              We use cookies to enhance the aesthetics of your experience and analyze digital foot traffic.
            </p>

            <div className="flex gap-3">
              <Magnetic strength={0.3}>
                <button 
                  onClick={handleAccept}
                  className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-500 transition-colors duration-300"
                >
                  Accept
                </button>
              </Magnetic>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 py-2 text-neutral-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
