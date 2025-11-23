
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const stats = [
    { label: "Awards Won", value: "50+" },
    { label: "Global Clients", value: "120+" },
    { label: "Revenue Generated", value: "$1B+" },
    { label: "Years of Excellence", value: "10" }
];

const Stats: React.FC = () => {
  return (
    <section className="bg-neutral-950 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center text-center py-16 md:py-24 group hover:bg-white/5 transition-colors duration-500 relative overflow-hidden"
                    >
                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Plus className="w-3 h-3 text-amber-500" />
                        </div>
                        <span className="text-4xl md:text-6xl font-display font-bold text-white mb-4 group-hover:text-amber-500 transition-colors duration-500">{stat.value}</span>
                        <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.2em]">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Stats;
