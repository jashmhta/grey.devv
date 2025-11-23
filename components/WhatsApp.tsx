
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsApp: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/918169178308?text=Hi%20Jash,%20I%20would%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[999] group"
      initial={{ scale: 0, rotate: 45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 bg-amber-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
        <MessageCircle className="w-7 h-7 text-white fill-white z-10" />
      </div>
    </motion.a>
  );
};

export default WhatsApp;
