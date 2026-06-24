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
          isScrolled ? 'bg-app-bg/80 backdrop-blur-xl border-b border-app-border' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-full max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-xl font-display font-semibold tracking-tight text-white group relative z-[1010]">
            Sutantu Dutta
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
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-app-muted hover:text-white/80'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white relative z-[1150] p-2 -mr-2"
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

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-white z-[1010] transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
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
                      isActive ? 'text-white' : 'text-app-text-secondary hover:text-white'
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
              className="mt-8 px-8 py-3 text-lg font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
