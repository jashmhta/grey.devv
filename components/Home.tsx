
import React from 'react';
import Hero from './Hero';
import Marquee from './Marquee';
import Philosophy from './Philosophy';
import Vision from './Vision';
import Process from './Process';
import Testimonials from './Testimonials';
import Stats from './Stats';
import FAQ from './FAQ';
import Showreel from './Showreel';
import Team from './Team';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Transition from './Transition';

const Home: React.FC = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
      <Hero />
      <Stats />
      <Marquee />
      <Philosophy />
      <Showreel />
      <Vision />
      
      {/* Teaser for Work */}
      <section className="py-32 bg-neutral-950 border-y border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('./assets/images/image_01.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 filter grayscale scale-105 group-hover:scale-100"></div>
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <h2 className="text-6xl md:text-9xl font-display text-white mb-8">THE ARCHIVE</h2>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-12 font-light">
                  Explore our curated collection of digital masterpieces. From hypercar configurators to private banking vaults.
              </p>
              <Link to="/work">
                <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-amber-500 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                    View All Templates <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
          </div>
      </section>

      <Process />
      <Team />
      <Testimonials />
      <FAQ />
    </motion.div>
  );
};

export default Transition(Home);
