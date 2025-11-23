
import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import Preloader from './components/Preloader';
import LiquidBackground from './components/LiquidBackground';
import GlowingOrbs from './components/GlowingOrbs';
import SoundManager from './components/SoundManager';
import { CornerMarks } from './components/Decorative';
import CommandMenu from './components/CommandMenu';
import CookieConsent from './components/CookieConsent';
import Lenis from '@studio-freight/lenis';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy Load Components
const Home = React.lazy(() => import('./components/Home'));
const Services = React.lazy(() => import('./components/Services'));
const Showcase = React.lazy(() => import('./components/Showcase'));
const Pricing = React.lazy(() => import('./components/Pricing'));
const Contact = React.lazy(() => import('./components/Contact'));
const Journal = React.lazy(() => import('./components/Journal'));
const Labs = React.lazy(() => import('./components/Labs'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const DemoPage = React.lazy(() => import('./components/DemoPage'));

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-8 h-8 border border-neutral-800 border-t-amber-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="bg-[#050505] min-h-screen text-white selection:bg-amber-500 selection:text-black overflow-x-hidden font-sans cursor-auto">
          <AnimatePresence mode='wait'>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          
          {!isLoading && (
            <BrowserRouter>
                <ScrollToTop />
                <SoundManager />
                <LiquidBackground />
                <GlowingOrbs /> 
                <CornerMarks />
                <CommandMenu />
                <CookieConsent />
                <WhatsApp />
                
                {/* Logic to hide Navbar on demo pages for full immersion */}
                <Routes>
                    <Route path="/demo/:id" element={null} />
                    <Route path="*" element={<Navbar />} />
                </Routes>
                
                <main className="min-h-screen relative z-10">
                    <AnimatePresence mode="wait">
                        <Suspense fallback={<RouteLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/work" element={<Showcase />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/journal" element={<Journal />} />
                                <Route path="/labs" element={<Labs />} />
                                <Route path="/pricing" element={<Pricing />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/demo/:id" element={<DemoPage />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </AnimatePresence>
                </main>
                
                {/* Logic to hide Footer on demo pages */}
                <Routes>
                    <Route path="/demo/:id" element={null} />
                    <Route path="*" element={
                        <div className="relative z-10">
                            <Footer />
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
          )}
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
