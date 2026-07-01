import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Tools', href: '#tools' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Setup sticky transition
      setIsScrolled(window.scrollY > 50);

      // Setup scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      
      // Determine active section
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-[1000] h-[72px] flex flex-col justify-center transition-all duration-300 ${
          isScrolled ? 'bg-[#020817]/75 backdrop-blur-[12px] border-b border-white/[0.05]' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-full max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-3 text-xl font-display font-semibold tracking-tight text-white group relative z-[1010]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              SD
            </div>
            <span>Sutantu Dutta</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors group py-2 ${
                    isActive ? 'text-white' : 'text-app-text-secondary hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-[#3B82F6] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  {/* Subtle glow on hover */}
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-md -z-10 transition-opacity duration-300 scale-110" />
                </a>
              );
            })}
            <a
              href="#contact"
              className="relative overflow-hidden px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white shadow-[0_0_15px_rgba(79,70,229,0.25)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all group"
            >
              <span className="relative z-10">Let's Talk</span>
              {/* Gradient sweep effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white relative z-[1150] p-2 -mr-2 interactive"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-[100dvh] bg-app-bg/95 backdrop-blur-2xl z-[1100] flex flex-col items-center justify-center space-y-8"
          >
             {/* Inside close button */}
             <button
                className="md:hidden text-white absolute top-6 right-6 p-2 z-[1150] h-[72px] flex items-center pr-4"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ top: 'calc(env(safe-area-inset-top) - 10px)' }}
                aria-label="Close Menu"
              >
                <X size={24} />
             </button>

            {NAV_LINKS.map((link, idx) => {
               const sectionId = link.href.substring(1);
               const isActive = activeSection === sectionId;
               return (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.1) }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-display font-medium transition-colors ${
                      isActive ? 'text-app-primary' : 'text-app-text-secondary hover:text-app-text'
                    }`}
                  >
                    {link.name}
                  </motion.a>
               )
            })}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (NAV_LINKS.length * 0.1) }}
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-8 py-3 text-lg font-medium rounded-full bg-app-primary text-white hover:bg-app-primary-hover shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-colors"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
