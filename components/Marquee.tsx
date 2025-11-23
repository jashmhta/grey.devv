
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
  baseVelocity: number;
}

// Fix: Use React.PropsWithChildren to correctly type children prop and avoid TS errors about missing children in props object
function ParallaxText({ children, baseVelocity = 100 }: React.PropsWithChildren<ParallaxProps>) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-display font-bold uppercase text-8xl md:text-[10rem] whitespace-nowrap flex flex-nowrap items-center leading-[0.85]" style={{ x }}>
        <span className="block mr-12 text-transparent text-stroke-white hover:text-white transition-colors duration-500 cursor-pointer">{children} </span>
        <span className="block mr-12 text-amber-500">•</span>
        <span className="block mr-12 text-transparent text-stroke-white hover:text-white transition-colors duration-500 cursor-pointer">{children} </span>
        <span className="block mr-12 text-amber-500">•</span>
        <span className="block mr-12 text-transparent text-stroke-white hover:text-white transition-colors duration-500 cursor-pointer">{children} </span>
        <span className="block mr-12 text-amber-500">•</span>
        <span className="block mr-12 text-transparent text-stroke-white hover:text-white transition-colors duration-500 cursor-pointer">{children} </span>
        <span className="block mr-12 text-amber-500">•</span>
      </motion.div>
    </div>
  );
}

const Marquee: React.FC = () => {
  return (
    <div className="py-32 bg-neutral-950 border-y border-white/10 relative z-20 overflow-hidden">
        <div className="opacity-80 mix-blend-difference">
             <ParallaxText baseVelocity={-2}>Strategy Design Development</ParallaxText>
             <div className="h-8"></div>
             <ParallaxText baseVelocity={2}>Branding Motion 3D</ParallaxText>
        </div>
        
        <style>{`
            .text-stroke-white {
                -webkit-text-stroke: 1px rgba(255,255,255,0.3);
            }
            .text-stroke-white:hover {
                -webkit-text-stroke: 1px white;
            }
        `}</style>
    </div>
  );
};

export default Marquee;