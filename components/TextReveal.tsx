import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  width = "fit-content" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { y: "100%" },
          visible: { y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
          delay: delay,
        }}
        style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SplitText: React.FC<TextRevealProps> = ({ children, className = "", delay = 0 }) => {
    const words = children.split(" ");
    return (
        <div className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: [0.33, 1, 0.68, 1],
                            delay: delay + (i * 0.05)
                        }}
                        className="block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    )
}