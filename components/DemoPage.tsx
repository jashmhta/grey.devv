
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Database, Smartphone, Zap, Activity, Users, BarChart3, Settings, Bell, Search, ShoppingBag, Sun, Moon, ArrowRight, ChefHat, DollarSign, Menu, X, Layers, Cpu, Globe, MapPin, Star, ChevronRight, Repeat } from 'lucide-react';
import { projects } from './Showcase';
import { Project } from '../types';
import { VelocityScroll } from './TextAnimations';
import ImageReveal from './ImageReveal';
import SEO from './SEO';
import { useScroll as useScrollFM, useTransform as useTransformFM } from 'framer-motion';


// --- CONTENT INJECTION DATABASE ---
// High-reliability Unsplash IDs to fix "Missing Images"
const demoContent: Record<string, any> = {
    "vogue-noir": {
        engine: "luxury",
        heroHeadline: "THE SILENCE OF STYLE",
        subHeadline: "Autumn / Winter 2024",
        description: "Fashion is not about utility. It is about identity.",
        stats: [{ label: "Views", val: "2.4M" }, { label: "Sales", val: "$850k" }],
        gallery: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2576&auto=format&fit=crop", // Editorial Model
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop", // Fashion B&W
            "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2572&auto=format&fit=crop"  // Studio Shot
        ],
        cta: "Shop Campaign",
        ticker: "VOGUE NOIR • PARIS FASHION WEEK • EXCLUSIVE DROP •"
    },
    "estate-gold": {
        engine: "luxury",
        heroHeadline: "ARCHITECTURAL SOLACE",
        subHeadline: "The Penthouse Collection",
        description: "Living spaces designed for the modern stoic.",
        stats: [{ label: "Inquiries", val: "142" }, { label: "Sold", val: "₹45 Cr" }],
        gallery: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop", // Modern House
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop", // Interior
            "./assets/images/image_11.jpg"  // Dark Architecture
        ],
        cta: "Schedule Private Viewing",
        ticker: "ESTATE GOLD • SOTHEBY'S INTERNATIONAL • LUXURY LIVING •"
    },
    "synapse": {
        engine: "saas",
        stats: [
            { label: "GPU Usage", val: "94%", change: "+2.5%", icon: Cpu, color: "emerald" },
            { label: "Inference", val: "45ms", change: "-12%", icon: Zap, color: "indigo" },
            { label: "Active Models", val: "12", change: "+1", icon: Layers, color: "amber" }
        ],
        sidebar: ["Neural Net", "Training", "Datasets", "API Keys"],
        heroText: "Neural Network Visualization"
    },
    "ether": {
        engine: "web3",
        title: "ETHER",
        balance: "142.5 ETH",
        value: "$342,150.00",
        transactions: [
            { type: "Swap", from: "ETH", to: "USDC", amount: "5.2 ETH", date: "2 mins ago" },
            { type: "Stake", from: "ETH", to: "stETH", amount: "12.0 ETH", date: "4 hrs ago" },
            { type: "Mint", from: "OpenSea", to: "NFT", amount: "0.4 ETH", date: "1 day ago" }
        ]
    },
    "ember-oak": {
        engine: "hospitality",
        title: "EMBER & OAK",
        location: "Mumbai • New York",
        menu: [
             { n: "01", t: "Wagyu Tartare", d: "Smoked Egg Yolk • Black Truffle", p: "₹4,500" },
             { n: "02", t: "Bluefin Otoro", d: "Caviar • Gold Leaf • Ponzu", p: "₹6,500" },
             { n: "03", t: "Forest Mushroom", d: "Pine Needle Infusion • Risotto", p: "₹3,800" },
             { n: "04", t: "Dark Chocolate", d: "Sea Salt • Olive Oil", p: "₹2,400" }
        ]
    },
    "quantum": {
        engine: "app",
        balance: "₹24,500.00",
        transactions: [
             { name: "Apple Store", amount: "-₹12,400", icon: "🍎" },
             { name: "Salary Deposit", amount: "+₹85,000", icon: "💰" },
             { name: "Uber Ride", amount: "-₹450", icon: "🚗" }
        ]
    },
    "velocita": {
        engine: "configurator",
        colors: ['#ef4444', '#eab308', '#111111', '#e5e5e5'],
        specs: { "0-60": "1.9s", "Top Speed": "280 MPH" }
    }
};

// ... (MatrixRain and ConfiguratorEngine components remain unchanged) ...
const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = '01010101XYZΞΤΗΞR';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) drops[i] = 1;

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#22c55e'; // Green
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" />;
};

const ConfiguratorEngine = ({ project, content }: { project: Project, content: any }) => {
    const [activeColor, setActiveColor] = useState('red');
    
    return (
        <div className="w-full min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col font-sans relative selection:bg-red-500 selection:text-white">
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-30 p-6 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6 pointer-events-auto">
                        <div className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center font-bold italic text-3xl tracking-tighter bg-black/50 backdrop-blur-md text-red-500">V</div>
                        <div>
                            <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-1">Prototype_X1</div>
                            <div className="font-bold text-xl md:text-3xl tracking-tighter uppercase">{project.title}</div>
                        </div>
                    </div>
                    
                    <div className="hidden md:flex flex-col items-end pointer-events-auto">
                         <div className="flex items-center gap-4 text-xs font-mono mb-2">
                             <span className="text-neutral-500">0-60 MPH</span>
                             <span className="text-xl font-bold">{content.specs?.["0-60"] || "2.1s"}</span>
                         </div>
                         <div className="flex items-center gap-4 text-xs font-mono">
                             <span className="text-neutral-500">TOP SPEED</span>
                             <span className="text-xl font-bold">{content.specs?.["Top Speed"] || "250 MPH"}</span>
                         </div>
                    </div>
                </div>

                <div className="w-full flex justify-center pointer-events-auto pb-8">
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 md:px-10 md:py-5 flex gap-6 md:gap-10 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="flex gap-4 md:gap-6">
                            {(content.colors || ['red', 'yellow', 'black', 'silver']).map((c: string) => (
                                <button
                                    key={c}
                                    onClick={() => setActiveColor(c === '#ef4444' ? 'red' : c === '#eab308' ? 'yellow' : c === '#111111' ? 'black' : 'silver')}
                                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-300 relative group border-2 ${activeColor === (c === '#ef4444' ? 'red' : c === '#eab308' ? 'yellow' : c === '#111111' ? 'black' : 'silver') ? 'border-white' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                        <div className="w-[1px] h-8 md:h-10 bg-white/10" />
                        <button className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:text-red-500 transition-colors">
                            Configure
                        </button>
                    </div>
                </div>
            </div>

            {/* 3D Simulation Placeholder */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]">
                 <div className="absolute bottom-0 w-[200vw] h-[200vw] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(70deg)_translateZ(-100px)] pointer-events-none"></div>
                <motion.div 
                    className="relative w-full max-w-[1200px] aspect-[16/9] z-10 flex items-center justify-center p-4"
                    animate={{ 
                        filter: `hue-rotate(${activeColor === 'red' ? 0 : activeColor === 'yellow' ? 45 : activeColor === 'black' ? 0 : 0}deg) saturate(${activeColor === 'black' || activeColor === 'silver' ? 0 : 1.2}) brightness(${activeColor === 'black' ? 1.5 : 1})` 
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <ImageReveal 
                        src={project.img}
                        alt="Hypercar"
                        className="w-full h-auto object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                        containerClassName="w-full h-full flex items-center justify-center bg-transparent"
                    />
                </motion.div>
            </div>
        </div>
    );
};

// --- HOSPITALITY ENGINE ---
const HospitalityEngine = ({ project, content }: { project: Project, content: any }) => {
    const menu = content.menu || [];
    return (
        <div className="w-full min-h-screen bg-[#0c0c0c] text-[#e5d5b0] font-serif selection:bg-[#e5d5b0] selection:text-black">
            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-6 flex justify-between items-center mix-blend-difference">
                <div className="text-lg md:text-xl tracking-[0.2em] uppercase font-light">{project.title}</div>
                <button className="border border-[#e5d5b0] px-6 py-2 md:px-8 md:py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[#e5d5b0] hover:text-black transition-all duration-700 font-sans">
                    Reserve Table
                </button>
            </nav>

            <div className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                    className="absolute inset-0"
                >
                    <ImageReveal 
                        src={project.img}
                        alt="Fine Dining"
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                    />
                </motion.div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <h1 className="text-5xl md:text-[8rem] leading-[0.9] font-thin text-[#f5f0e6] tracking-tight mix-blend-overlay mb-4 opacity-90">
                            {content.title || project.title}
                        </h1>
                        <p className="font-sans text-xs tracking-[0.3em] uppercase mt-4">{content.location || "Global"}</p>
                    </motion.div>
                </div>
            </div>

            <div className="bg-[#080808] py-20 md:py-40 px-6 relative">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <ChefHat className="w-8 h-8 mx-auto mb-8 text-[#e5d5b0] opacity-80" />
                    <h2 className="text-4xl md:text-6xl font-light italic mb-8">The Tasting Menu</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 max-w-5xl mx-auto">
                    {menu.map((item: any) => (
                        <div key={item.n} className="group cursor-pointer">
                            <div className="flex justify-between items-baseline border-b border-[#e5d5b0]/10 pb-4 mb-3 group-hover:border-[#e5d5b0] transition-colors duration-700">
                                <div className="flex items-baseline gap-4">
                                    <span className="font-sans text-[10px] text-[#e5d5b0]/50">{item.n}</span>
                                    <h3 className="text-2xl font-light">{item.t}</h3>
                                </div>
                                <span className="font-sans text-sm opacity-70">{item.p}</span>
                            </div>
                            <p className="font-sans text-[10px] text-white/30 tracking-[0.15em] uppercase group-hover:text-white/60 transition-colors">
                                {item.d}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- LUXURY ENGINE ---
const LuxuryEngine = ({ project, content }: { project: Project, content: any }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]);
    
    const gallery = content.gallery || [project.img, project.img, project.img];

    return (
        <div className="w-full bg-[#F5F5F5] text-black selection:bg-black selection:text-white">
            <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white">
                <div className="text-xl md:text-3xl tracking-tighter font-bold uppercase font-sans">{project.title}</div>
                <div className="flex items-center gap-6 md:gap-8">
                    <Search className="w-5 h-5" />
                    <ShoppingBag className="w-5 h-5" />
                </div>
            </nav>
            
            <div className="h-screen relative flex items-end pb-20 px-6 md:px-20 overflow-hidden bg-black">
                 <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-70">
                     <ImageReveal 
                        src={project.img} 
                        alt="Hero"
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                     />
                 </motion.div>
                 
                 <div className="relative z-10 w-full border-t border-white/20 pt-10 flex flex-col md:flex-row justify-between items-end text-white mix-blend-difference">
                     <h1 className="text-[10vw] md:text-[12vw] leading-[0.8] font-thin tracking-tighter font-serif uppercase max-w-4xl">
                        {content.heroHeadline || project.title}
                     </h1>
                     <div className="text-right hidden md:block pb-4">
                         <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4">{content.subHeadline}</p>
                         <p className="text-xs font-serif italic opacity-80 max-w-xs leading-relaxed">
                            "{content.description || project.description}"
                         </p>
                     </div>
                 </div>
            </div>
            
            <div className="py-20 md:py-40 px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-40">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] overflow-hidden bg-neutral-200 col-span-2">
                             <ImageReveal 
                                src={gallery[0]} 
                                alt="Gallery 1"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                             />
                        </div>
                        <div className="aspect-square overflow-hidden bg-neutral-200">
                             <ImageReveal 
                                src={gallery[1]} 
                                alt="Gallery 2"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                             />
                        </div>
                        <div className="aspect-square overflow-hidden bg-neutral-200">
                             <ImageReveal 
                                src={gallery[2]} 
                                alt="Gallery 3"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                             />
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl md:text-7xl font-serif font-thin mb-12 leading-[1]">
                            The <span className="italic block ml-12">Essence</span> of {project.title}.
                        </h2>
                        <p className="text-lg leading-relaxed font-sans font-light text-neutral-600 mb-12 max-w-md">
                            Luxury is not about excess. It is about the removal of the unnecessary. Our digital flagship represents this philosophy through tailored digital experiences.
                        </p>
                        <button className="w-fit px-12 py-5 border border-black text-black font-sans text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors duration-500">
                            {content.cta || "View Collection"}
                        </button>
                    </div>
                </div>

                {/* Marquee */}
                <div className="border-t border-b border-black py-12 mb-20 overflow-hidden">
                     <VelocityScroll className="text-6xl md:text-8xl font-serif italic" baseVelocity={-2}>
                        {content.ticker || `${project.title} • EST 2024 •`}
                     </VelocityScroll>
                </div>
            </div>
        </div>
    );
};

// --- SAAS ENGINE ---
const SaaSEngine = ({ project, content }: { project: Project, content: any }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Default Data
    const defaultStats = [
        { label: "Total Revenue", val: "₹1.24 Cr", change: "+12.5%", icon: DollarSign, color: "indigo" },
        { label: "Active Users", val: "14,203", change: "+5.4%", icon: Users, color: "emerald" },
        { label: "Server Load", val: "34%", change: "-2.1%", icon: Activity, color: "amber" }
    ];

    const stats = content.stats || defaultStats;
    const sidebarItems = content.sidebar || ['Dashboard', 'Analytics', 'Users', 'Settings'];

    return (
        <div className="w-full bg-[#0f1117] text-white font-sans min-h-screen selection:bg-indigo-500 selection:text-white flex overflow-hidden">
             
             {/* Mobile Sidebar Overlay */}
             <AnimatePresence>
                {sidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
             </AnimatePresence>

             {/* Sidebar */}
             <div className={`fixed lg:relative w-64 border-r border-white/5 flex-shrink-0 flex flex-col bg-[#0f1117] z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 flex items-center justify-between border-b border-white/5 h-20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20">
                            <Database className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight truncate max-w-[120px]">{project.title}</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X className="w-5 h-5 text-neutral-400" />
                    </button>
                </div>
                
                <div className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item: string, i: number) => (
                        <div key={item} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${i === 0 ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
                            {i === 0 ? <Activity className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                            <span className="text-sm font-medium">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden border border-white/10">
                            <ImageReveal src="/assets/jash.jpg" alt="Admin" className="w-full h-full object-cover" containerClassName="w-full h-full" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Jash Mehta</div>
                            <div className="text-[10px] text-neutral-500 font-mono">admin@grey.agency</div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Main Content */}
             <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <nav className="h-20 border-b border-white/5 px-6 md:px-8 flex justify-between items-center bg-[#0f1117]/80 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-4 text-sm hidden md:flex">
                            <span className="text-neutral-500">Overview</span>
                            <span className="text-neutral-700">/</span>
                            <span className="text-white font-medium">{sidebarItems[0]}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            OPERATIONAL
                        </div>
                        <Bell className="w-5 h-5 text-neutral-400" />
                    </div>
                </nav>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{content.heroText || "Dashboard"}</h1>
                                <p className="text-neutral-400">Welcome back. System status is normal.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-900/20">
                                    Generate Report
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {stats.map((stat: any, i: number) => (
                                <div key={i} className="bg-[#151820] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-white/10 transition-all duration-300 shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-green-400`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{stat.val}</div>
                                    <div className="text-sm text-neutral-500 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

// --- APP ENGINE ---
const AppEngine = ({ project, content }: { project: Project, content: any }) => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="w-full bg-neutral-50 text-black font-sans min-h-screen relative overflow-hidden flex items-center justify-center selection:bg-black selection:text-white">
             <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.05] pointer-events-none">
                 {Array.from({ length: 400 }).map((_, i) => (
                     <div key={i} className="border border-black/10 aspect-square"></div>
                 ))}
             </div>

             <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 pt-20 pb-20">
                <div className="order-2 lg:order-1 text-center lg:text-left">
                    <div className="inline-block px-4 py-2 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 shadow-xl shadow-black/20">
                        v2.0 Available Now
                    </div>
                    <h1 className="text-5xl md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter mb-8 text-black leading-[0.9]">
                        {project.title.split(' ')[0]} <br/> App.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 font-medium mb-12 max-w-md leading-relaxed mx-auto lg:mx-0">
                        {project.description}
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
                        <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-2xl shadow-black/30">
                            <Smartphone className="w-5 h-5" /> iOS App Store
                        </button>
                    </div>
                </div>

                {/* Phone Simulator */}
                <div className="order-1 lg:order-2 flex justify-center relative perspective-1000">
                     <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative w-[300px] md:w-[340px] h-[600px] md:h-[680px] bg-[#000000] rounded-[3rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-10 ring-4 ring-neutral-200"
                     >
                        <div className={`w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col transition-colors duration-500 ${darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`}>
                            {/* Status Bar */}
                            <div className="h-12 w-full px-6 flex justify-between items-center font-bold z-20 text-xs">
                                <span>9:41</span>
                                <div className="flex gap-1.5">
                                    <div className={`w-4 h-2.5 rounded-[1px] ${darkMode ? 'bg-white' : 'bg-black'}`}></div>
                                </div>
                            </div>

                            <div className="flex-1 p-6 relative overflow-y-auto no-scrollbar">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <div className="text-neutral-500 text-[10px] font-bold mb-1 uppercase tracking-wider">Total Balance</div>
                                        <div className="text-3xl font-bold tracking-tight">{content.balance || "₹24,500"}</div>
                                    </div>
                                    <button 
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-neutral-800 text-amber-400' : 'bg-neutral-100 text-neutral-600'}`}
                                    >
                                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    </button>
                                </div>

                                <div className={`p-4 rounded-2xl mb-6 ${darkMode ? 'bg-neutral-800' : 'bg-black text-white'}`}>
                                    <div className="flex justify-between mb-8">
                                        <div className="text-xs font-mono uppercase opacity-70">Debit</div>
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div className="font-mono text-lg tracking-widest mb-4">•••• 4242</div>
                                    <div className="flex justify-between text-[10px] uppercase font-bold opacity-80">
                                        <span>Jash Mehta</span>
                                        <span>12/28</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Recent</div>
                                    {(content.transactions || [1, 2, 3]).map((tx: any, i: number) => {
                                        const isObj = typeof tx === 'object';
                                        return (
                                            <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-neutral-700' : 'bg-white'}`}>
                                                    {isObj ? tx.icon : (i === 1 ? '🛍️' : i === 2 ? '☕️' : '🎬')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold">{isObj ? tx.name : (i === 1 ? 'Amazon' : i === 2 ? 'Starbucks' : 'Netflix')}</div>
                                                </div>
                                                <div className="text-xs font-bold">{isObj ? tx.amount : (i === 1 ? '-₹299' : i === 2 ? '-₹450' : '-₹699')}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                     </motion.div>
                </div>
             </div>
        </div>
    )
}

// --- WEB3 ENGINE ---
const Web3Engine = ({ project, content }: { project: Project, content: any }) => {
    return (
        <div className="w-full min-h-screen bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black relative overflow-hidden flex flex-col">
            <MatrixRain />
            <nav className="border-b border-green-900/30 p-6 md:p-8 flex justify-between items-center relative z-20 bg-black/90 backdrop-blur">
                <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <Database className="w-5 h-5 animate-pulse" />
                    {project.title}
                </div>
                <div className="flex gap-4">
                    <button className="hidden md:block text-xs hover:text-white transition-colors">Docs</button>
                    <button className="border border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black transition-all uppercase text-xs tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        Connect Wallet
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10 flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <div className="inline-block border border-green-500/50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-6 bg-green-900/10 text-green-400">
                        Decentralized Protocol
                    </div>
                    <h1 className="text-5xl md:text-[7rem] font-bold mb-8 leading-none tracking-tighter text-white mix-blend-difference glitch-text">
                        LIQUID <br/> YIELD
                    </h1>
                    <p className="text-lg text-green-700 max-w-md mb-12">
                        Automated market making strategies for the Ethereum ecosystem. Non-custodial, auditable, and lightning fast.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 mb-12 border-t border-green-900/30 pt-8">
                        <div>
                            <div className="text-3xl text-white font-bold mb-1">{content.value || "$1.2B"}</div>
                            <div className="text-xs uppercase tracking-widest opacity-60">TVL</div>
                        </div>
                        <div>
                            <div className="text-3xl text-white font-bold mb-1">2.4%</div>
                            <div className="text-xs uppercase tracking-widest opacity-60">APY</div>
                        </div>
                    </div>
                </div>
                
                <div className="border border-green-500/30 p-1 bg-black max-w-md mx-auto w-full shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                    <div className="bg-black border border-green-500/30 p-8 relative overflow-hidden">
                        {/* Background Grid */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between mb-2 text-xs text-green-700">
                                <label>PAY</label>
                                <span>BAL: {content.balance || "0.0 ETH"}</span>
                            </div>
                            <div className="bg-green-900/5 border border-green-500/20 p-4 flex justify-between items-center mb-4 hover:border-green-500/50 transition-colors">
                                <input type="text" defaultValue="1.0" className="bg-transparent text-2xl text-white outline-none w-1/2 font-bold font-mono" />
                                <span className="font-bold text-white bg-green-900/20 px-2 py-1 rounded">ETH</span>
                            </div>
                            
                            <div className="flex justify-center -my-4 relative z-10">
                                <div className="bg-black border border-green-500/30 p-2 rounded-full text-green-500 cursor-pointer hover:scale-110 transition-transform">
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>

                            <div className="flex justify-between mb-2 mt-4 text-xs text-green-700">
                                <label>RECEIVE</label>
                            </div>
                            <div className="bg-green-900/5 border border-green-500/20 p-4 flex justify-between items-center mb-8 hover:border-green-500/50 transition-colors">
                                <input type="text" defaultValue="3,450" className="bg-transparent text-2xl text-white outline-none w-1/2 font-bold font-mono" />
                                <span className="font-bold text-white bg-green-900/20 px-2 py-1 rounded">USDC</span>
                            </div>
                            
                            <button className="w-full bg-green-500 text-black py-4 font-bold text-sm hover:bg-green-400 transition-all tracking-[0.2em] uppercase shadow-lg shadow-green-500/20">
                                Swap Assets
                            </button>
                        </div>
                    </div>
                    
                    {/* Live Ticker */}
                    <div className="mt-2 border-t border-green-900/30 pt-2 flex justify-between text-[10px] text-green-800 uppercase">
                        <span>Gas: 14 Gwei</span>
                        <span>Block: 192401</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DemoPage: React.FC = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);
    const [loading, setLoading] = useState(true);
    const content = demoContent[id || ''] || {};

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [id]);

    if (!project) return (<div className="min-h-screen bg-black text-white flex items-center justify-center">Project not found.</div>);

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-white"
            >
                <div className="relative">
                    <div className="w-12 h-12 border border-neutral-800 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 border-t border-amber-500 rounded-full animate-spin"></div>
                </div>
                <div className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 animate-pulse">
                    Initializing {project.title}
                </div>
            </motion.div>
        );
    }

    // Router Logic for Engines
    let engine;
    const engineType = content.engine || project.category.toLowerCase();

    if (engineType === 'hospitality') {
        engine = <HospitalityEngine project={project} content={content} />;
    } else if (engineType === 'luxury') {
        engine = <LuxuryEngine project={project} content={content} />;
    } else if (engineType === 'configurator') {
        engine = <ConfiguratorEngine project={project} content={content} />;
    } else if (engineType === 'saas') {
        engine = <SaaSEngine project={project} content={content} />;
    } else if (engineType === 'app') {
        engine = <AppEngine project={project} content={content} />;
    } else if (engineType === 'web3' || project.category === 'Web3') {
        engine = <Web3Engine project={project} content={content} />;
    } else {
        engine = <LuxuryEngine project={project} content={content} />; // Default Fallback
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="relative z-[60]"
        >
            <SEO 
                title={project.title} 
                description={project.description}
            />
             <div className="fixed top-0 left-0 w-full h-0 z-[100] pointer-events-none">
                 <Link to="/work" className="fixed top-6 left-6 z-[100] pointer-events-auto w-10 h-10 bg-black/50 backdrop-blur text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-white/10 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 </Link>
            </div>
            {engine}
        </motion.div>
    );
};

export default DemoPage;
