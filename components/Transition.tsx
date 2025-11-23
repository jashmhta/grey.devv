
import React from 'react';
import { motion } from 'framer-motion';

const Transition = (OgComponent: React.FC) => {
  return () => (
    <>
      <OgComponent />
      
      {/* Slide In Layer */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-black z-[100] origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Slide Out Layer */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-black z-[100] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default Transition;
