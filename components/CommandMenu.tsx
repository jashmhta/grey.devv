
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Command, Volume2, VolumeX, Home, Briefcase, FlaskConical, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommandMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Toggle Command Menu with Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Actions List
  const actions = [
    { 
      category: "Navigation",
      items: [
        { icon: Home, label: "Go Home", action: () => navigate('/') },
        { icon: Briefcase, label: "View Work", action: () => navigate('/work') },
        { icon: FlaskConical, label: "Enter Labs", action: () => navigate('/labs') },
        { icon: Mail, label: "Contact Us", action: () => navigate('/contact') },
      ]
    },
    {
      category: "System",
      items: [
        { 
            icon: Volume2, 
            label: "Toggle Sound", 
            action: () => window.dispatchEvent(new Event('GREY_TOGGLE_SOUND')) 
        },
        { 
            icon: Command, 
            label: "Copy URL", 
            action: () => navigator.clipboard.writeText(window.location.href) 
        }
      ]
    }
  ];

  const filteredActions = actions.map(group => ({
    ...group,
    items: group.items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
  })).filter(group => group.items.length > 0);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col"
          >
            {/* Search Bar */}
            <div className="flex items-center px-4 py-4 border-b border-white/5">
                <Search className="w-5 h-5 text-neutral-500 mr-3" />
                <input
                    autoFocus
                    type="text"
                    placeholder="Type a command or search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-lg text-white placeholder-neutral-600 focus:outline-none font-light"
                />
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] text-neutral-400 font-mono">
                    <span>ESC</span>
                </div>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                {filteredActions.length > 0 ? (
                    filteredActions.map((group, i) => (
                        <div key={i} className="mb-2">
                            <div className="px-2 py-2 text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                                {group.category}
                            </div>
                            {group.items.map((item, j) => (
                                <button
                                    key={j}
                                    onClick={() => handleAction(item.action)}
                                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                                        <span>{item.label}</span>
                                    </div>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </button>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-neutral-500">
                        No commands found.
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-white/5 px-4 py-2 flex justify-between items-center text-[10px] text-neutral-500 font-mono border-t border-white/5">
                <div className="flex gap-2">
                    <span>Navigate</span> <span className="text-white">↑↓</span>
                </div>
                <div className="flex gap-2">
                    <span>Select</span> <span className="text-white">↵</span>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
