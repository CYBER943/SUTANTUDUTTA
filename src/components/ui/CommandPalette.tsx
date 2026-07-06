import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, User, Briefcase, Wrench, FileText, Mail, Github, Code, Linkedin, Download, Copy, ArrowUp, ArrowDown, Moon, X, Command } from 'lucide-react';

const commands = [
  { id: 'home', title: 'Home', icon: Home, group: 'Navigation', action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'about', title: 'About', icon: User, group: 'Navigation', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'projects', title: 'Projects', icon: Briefcase, group: 'Navigation', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'tools', title: 'Tools', icon: Wrench, group: 'Navigation', action: () => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'blog', title: 'Blog', icon: FileText, group: 'Navigation', action: () => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', title: 'Contact', icon: Mail, group: 'Navigation', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  
  { id: 'github', title: 'GitHub', icon: Github, group: 'Social', action: () => window.open('https://github.com', '_blank') },
  { id: 'codepen', title: 'CodePen', icon: Code, group: 'Social', action: () => window.open('https://codepen.io', '_blank') },
  { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, group: 'Social', action: () => window.open('https://linkedin.com', '_blank') },
  
  { id: 'resume', title: 'Download Resume', icon: Download, group: 'Actions', action: () => alert('Resume download will start shortly.') },
  { id: 'email', title: 'Email Me', icon: Mail, group: 'Actions', action: () => window.location.href = 'mailto:sutantudutta@outlook.com' },
  { id: 'copy-email', title: 'Copy Email Address', icon: Copy, group: 'Actions', action: () => navigator.clipboard.writeText('sutantudutta@outlook.com') },
  { id: 'visit-github', title: 'Visit GitHub Profile', icon: Github, group: 'Actions', action: () => window.open('https://github.com', '_blank') },
  { id: 'visit-codepen', title: 'Open CodePen Profile', icon: Code, group: 'Actions', action: () => window.open('https://codepen.io', '_blank') },
  { id: 'scroll-top', title: 'Scroll to Top', icon: ArrowUp, group: 'Actions', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  { id: 'scroll-bottom', title: 'Scroll to Bottom', icon: ArrowDown, group: 'Actions', action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) },
  { id: 'toggle-theme', title: 'Toggle Theme', icon: Moon, group: 'Actions', action: () => alert('Theme toggle is future-ready!') },
];

export default function CommandPalette({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Local state for recent commands
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentCommands');
    if (saved) {
      try {
        setRecentIds(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleCommandSelect = (cmdId: string, action: () => void) => {
    // Add to recent
    const newRecent = [cmdId, ...recentIds.filter(id => id !== cmdId)].slice(0, 4);
    setRecentIds(newRecent);
    localStorage.setItem('recentCommands', JSON.stringify(newRecent));
    
    // Execute action and close
    action();
    setIsOpen(false);
  };

  const filteredCommands = query
    ? commands.filter(cmd => cmd.title.toLowerCase().includes(query.toLowerCase()))
    : commands;

  // Add recent commands to the top if no query
  let displayCommands = filteredCommands;
  let groups = Array.from(new Set(displayCommands.map(c => c.group)));

  if (!query && recentIds.length > 0) {
    const recentCommands = recentIds.map(id => commands.find(c => c.id === id)).filter(Boolean) as typeof commands;
    
    // Create a new array with "Recent" at the top
    displayCommands = [
      ...recentCommands.map(c => ({ ...c, originalGroup: c.group, group: 'Recent' })),
      ...commands.filter(c => !recentIds.includes(c.id))
    ];
    groups = ['Recent', ...Array.from(new Set(commands.map(c => c.group)))];
  }

  // Keyboard navigation
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % displayCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + displayCommands.length) % displayCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (displayCommands[selectedIndex]) {
          handleCommandSelect(displayCommands[selectedIndex].id, displayCommands[selectedIndex].action);
        }
      }
    };

    document.addEventListener('keydown', handleNavigation);
    return () => document.removeEventListener('keydown', handleNavigation);
  }, [isOpen, displayCommands, selectedIndex, setIsOpen]);

  // Scroll to active item
  useEffect(() => {
    if (listRef.current && isOpen) {
      const activeItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeItem) {
        const itemTop = activeItem.offsetTop;
        const itemHeight = activeItem.offsetHeight;
        const containerScrollTop = listRef.current.scrollTop;
        const containerHeight = listRef.current.clientHeight;

        if (itemTop < containerScrollTop) {
           listRef.current.scrollTop = itemTop;
        } else if (itemTop + itemHeight > containerScrollTop + containerHeight) {
           listRef.current.scrollTop = itemTop + itemHeight - containerHeight;
        }
      }
    }
  }, [selectedIndex, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[70vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-white/5 relative z-10 bg-[#111111]/50">
              <Search className="w-5 h-5 text-white/40 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none text-white text-lg py-5 focus:outline-none placeholder:text-white/30 font-light"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors ml-2"
                aria-label="Close Command Palette"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="overflow-y-auto p-2 scrollbar-hide flex-1">
              {displayCommands.length === 0 ? (
                <div className="py-14 text-center text-white/40 text-sm flex flex-col items-center">
                   <Command className="w-8 h-8 mb-4 opacity-20" />
                   <p>No results found for "{query}"</p>
                </div>
              ) : (
                groups.map(group => {
                  const groupCommands = displayCommands.filter(c => c.group === group);
                  if (groupCommands.length === 0) return null;
                  
                  return (
                    <div key={group} className="mb-4 last:mb-0">
                      <div className="px-3 text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                        {group}
                      </div>
                      {groupCommands.map((cmd) => {
                        const globalIndex = displayCommands.findIndex(c => c.id === cmd.id);
                        const isSelected = selectedIndex === globalIndex;
                        const Icon = cmd.icon;

                        return (
                          <div
                            key={cmd.id}
                            className={`flex items-center px-3 py-3 rounded-xl cursor-pointer transition-colors duration-150 ${
                              isSelected ? 'bg-app-primary/20 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            onClick={() => {
                              handleCommandSelect(cmd.id, cmd.action);
                            }}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <Icon className={`w-5 h-5 mr-3 ${isSelected ? 'text-app-primary' : 'text-white/40'}`} />
                            <span className="flex-1 font-medium">{cmd.title}</span>
                            {isSelected && (
                              <motion.span 
                                layoutId="command-indicator"
                                className="text-xs font-medium text-app-primary bg-app-primary/10 px-2 py-1 rounded-md"
                              >
                                Enter ↵
                              </motion.span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Footer with keyboard hints */}
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-xs text-white/30 bg-[#0a0a0a]/50">
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                     <kbd className="bg-white/10 px-1.5 py-0.5 rounded shadow-sm text-white/50 border border-white/5 font-sans">↑</kbd>
                     <kbd className="bg-white/10 px-1.5 py-0.5 rounded shadow-sm text-white/50 border border-white/5 font-sans">↓</kbd>
                     <span className="ml-1">to navigate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <kbd className="bg-white/10 px-1.5 py-0.5 rounded shadow-sm text-white/50 border border-white/5 font-sans">↵</kbd>
                     <span className="ml-1">to select</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <kbd className="bg-white/10 px-1.5 py-0.5 rounded shadow-sm text-white/50 border border-white/5 font-sans">esc</kbd>
                     <span className="ml-1">to close</span>
                  </div>
               </div>
               <div className="hidden sm:flex items-center font-medium">
                   Sutantu
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
