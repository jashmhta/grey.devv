
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send, AlertCircle } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { DotMap } from './Decorative';
import Magnetic from './Magnetic';
import Transition from './Transition';
import SEO from './SEO';

const services = ["Web Development", "App Development", "Branding", "Strategy"];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState(50000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(s => s !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Name Validation
    if (!formData.name.trim()) {
        newErrors.name = "Name is required";
    }

    // Email Validation (Standard Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
    }

    // Indian Phone Validation (+91 optional, 10 digits)
    const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = "Please enter a valid Indian phone number";
    }

    if (!formData.details.trim()) {
        newErrors.details = "Please tell us a bit about your project";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 2000);
  };

  const formatBudget = (val: number) => {
      return val >= 500000 ? '₹5,00,000+' : `₹${val.toLocaleString()}`;
  }

  return (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-40 pb-20 bg-black relative overflow-hidden min-h-screen"
    >
      <SEO 
        title="Contact Us" 
        description="Initiate the protocol. Contact GREY for high-end digital services in Mumbai." 
      />
      <DotMap />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        
        {/* Left Side: Info */}
        <div>
            <TextReveal className="text-amber-500 font-mono uppercase tracking-widest text-sm mb-4">
                Initiate Protocol
            </TextReveal>
            <h2 className="text-6xl md:text-8xl font-display text-white mb-12">
                LET'S<br />CREATE
            </h2>
            
            <div className="space-y-12">
                <p className="text-neutral-400 text-lg max-w-md leading-relaxed">
                    Ready to give your company its digital face? We work with budgets of all sizes, tailoring our approach to your specific needs.
                </p>
                
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Direct Line</span>
                    <a href="mailto:mjash028@gmail.com" className="text-2xl text-white font-display hover:text-amber-500 transition-colors">mjash028@gmail.com</a>
                    <a href="tel:+918169178308" className="text-xl text-white font-display hover:text-amber-500 transition-colors">+91 81691 78308</a>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Studio</span>
                    <p className="text-xl text-white">Mumbai, India</p>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="relative">
            {isSent ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 border border-amber-500/20 rounded-2xl bg-amber-900/5 backdrop-blur-md"
                >
                    <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center mb-8">
                        <ArrowUpRight className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-4xl font-display text-white mb-4">Message Received</h3>
                    <p className="text-neutral-400">I will analyze your request and respond within 24 hours.</p>
                    <button 
                        onClick={() => setIsSent(false)} 
                        className="mt-8 text-sm font-mono text-amber-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Send another
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-12 bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className={`w-full bg-transparent border-b py-4 text-white focus:outline-none transition-colors text-lg font-light ${errors.name ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'}`}
                                placeholder=" "
                            />
                            <label className={`absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all duration-300 ${formData.name ? '-top-6 text-xs text-amber-500' : 'group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-amber-500'}`}>
                                Your Name
                            </label>
                            {errors.name && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</span>}
                        </div>
                        <div className="relative group">
                            <input 
                                type="tel" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className={`w-full bg-transparent border-b py-4 text-white focus:outline-none transition-colors text-lg font-light ${errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'}`}
                                placeholder=" "
                            />
                            <label className={`absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all duration-300 ${formData.phone ? '-top-6 text-xs text-amber-500' : 'group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-amber-500'}`}>
                                Phone Number
                            </label>
                            {errors.phone && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone}</span>}
                        </div>
                    </div>

                    <div className="relative group">
                        <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full bg-transparent border-b py-4 text-white focus:outline-none transition-colors text-lg font-light ${errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'}`}
                            placeholder=" "
                        />
                        <label className={`absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all duration-300 ${formData.email ? '-top-6 text-xs text-amber-500' : 'group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-amber-500'}`}>
                            Email Address
                        </label>
                        {errors.email && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</span>}
                    </div>

                    {/* Services */}
                    <div>
                        <span className="block text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">Services Required</span>
                        <div className="flex flex-wrap gap-3">
                            {services.map(service => (
                                <button
                                    key={service}
                                    type="button"
                                    onClick={() => toggleService(service)}
                                    className={`px-6 py-3 rounded-full text-sm transition-all duration-300 border ${
                                        selectedServices.includes(service)
                                        ? 'bg-amber-500 text-black border-amber-500 font-bold'
                                        : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                                    }`}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget Slider */}
                    <div>
                        <div className="flex justify-between items-end mb-6">
                            <span className="block text-sm font-mono text-neutral-500 uppercase tracking-widest">Estimated Budget</span>
                            <span className="text-2xl font-display text-amber-500">{formatBudget(budget)}</span>
                        </div>
                        <div className="relative h-2 bg-neutral-800 rounded-full">
                            <div className="absolute top-0 left-0 h-full bg-amber-500 rounded-full" style={{ width: `${(budget / 500000) * 100}%` }}></div>
                            <input 
                                type="range" 
                                min="10000" 
                                max="500000" 
                                step="10000"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div 
                                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-amber-500 shadow-lg pointer-events-none"
                                style={{ left: `${(budget / 500000) * 100}%`, transform: 'translate(-50%, -50%)' }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-mono text-neutral-600">
                            <span>₹10k</span>
                            <span>₹5L+</span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="relative group">
                        <textarea 
                            rows={4}
                            value={formData.details}
                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                            className={`w-full bg-transparent border-b py-4 text-white focus:outline-none transition-colors text-lg font-light resize-none ${errors.details ? 'border-red-500' : 'border-neutral-800 focus:border-amber-500'}`}
                            placeholder=" "
                        />
                        <label className={`absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all duration-300 ${formData.details ? '-top-6 text-xs text-amber-500' : 'group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-amber-500'}`}>
                            Project Details
                        </label>
                        {errors.details && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.details}</span>}
                    </div>

                    <Magnetic strength={0.5}>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 bg-white text-black font-display font-bold text-lg tracking-widest uppercase hover:bg-amber-500 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
                        >
                            {isSubmitting ? 'Transmitting...' : 'Initiate Project'}
                            {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </Magnetic>
                </form>
            )}
        </div>
      </div>
    </motion.section>
  );
};

export default Transition(Contact);
