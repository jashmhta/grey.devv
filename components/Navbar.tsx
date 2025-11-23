
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Search, Command } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Journal', path: '/journal' },
    { name: 'Labs', path: '/labs' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    window.dispatchEvent(new Event('GREY_TOGGLE_SOUND'));
  };

  const triggerCommandMenu = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 
        ${isScrolled 
            ? 'py-4 bg-black/80 backdrop-blur-lg border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'py-8 bg-transparent'
        } text-white`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-20">
        <Link to="/">
            <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-display font-bold tracking-widest cursor-pointer relative group"
            >
            GREY
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-500 group-hover:w-full"></span>
            </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 lg:space-x-12 font-light tracking-widest text-xs lg:text-sm uppercase">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.name}
                to={item.path}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`hover:text-amber-400 transition-colors duration-300 relative group py-1 ${isActive ? 'text-amber-400 font-normal' : 'text-white/80'}`}
                    >
                        {item.name}
                        
                        {/* Active State Indicator */}
                        {isActive && (
                            <motion.span 
                                layoutId="navbar-active"
                                className="absolute -bottom-1 left-0 w-full h-[1px] bg-amber-400" 
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        
                        {/* Hover Indicator */}
                        {!isActive && (
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400/50 transition-all duration-300 group-hover:w-full" />
                        )}
                    </motion.div>
                </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
            {/* Command Trigger */}
            <button
                onClick={triggerCommandMenu}
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors group"
                title="Cmd+K"
            >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            <button 
                onClick={toggleSound}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <Link to="/contact">
                <Magnetic strength={0.3}>
                    <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 border rounded-full transition-all duration-500 uppercase text-xs tracking-widest
                        ${isScrolled 
                            ? 'border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black' 
                            : 'border-white/50 hover:bg-white hover:text-black'
                        }`}
                    >
                    Start Project
                    </motion.button>
                </Magnetic>
            </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50 cursor-pointer hover:text-amber-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>

      {/* Scroll Progress Bar (Scrollspy Visual) */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 origin-left z-10"
        style={{ scaleX, width: '100%' }}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-40 overflow-hidden flex flex-col justify-center"
            >
                <div className="absolute inset-0 bg-[url('./assets/textures/stardust.png')] opacity-10 pointer-events-none"></div>
                <div className="flex flex-col items-center gap-6 p-8 relative z-10">
                    {navItems.map((item, idx) => (
                        <Link 
                        key={item.name} 
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        >
                        <motion.span
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: 50, rotateX: 90 }}
                            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                            className={`block text-5xl font-display uppercase tracking-tighter hover:text-amber-500 transition-colors ${location.pathname === item.path ? 'text-amber-500' : 'text-white'}`}
                        >
                            {item.name}
                        </motion.span>
                        </Link>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-10 w-full flex justify-center gap-8"
                >
                     <button onClick={toggleSound} className="p-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors">
                         {isMuted ? <VolumeX /> : <Volume2 />}
                     </button>
                     <button onClick={triggerCommandMenu} className="p-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors">
                         <Search />
                     </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
