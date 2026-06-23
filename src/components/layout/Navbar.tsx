import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#tools' },
  { name: 'Experience', href: '#knowledge' },
  { name: 'Contact', href: '#contact' },
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
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      // Determine active section
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 150) {
          setActiveSection(link.name.toLowerCase());
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
          isScrolled ? 'bg-[#020817]/80 backdrop-blur-md border-b border-[#1F2937] shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="w-100 max-w-[1200px] mx-auto px-6 md:px-6 w-full flex justify-between items-center">
          <a href="#home" className="text-xl font-display font-bold tracking-tight text-white group relative z-[1010]">
            Sutantu Dutta
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-[#06B6D4]' : 'text-app-muted hover:text-[#3B82F6]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-medium rounded-full bg-white/5 border border-white/10 hover:border-[#3B82F6] hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all text-white"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle - Needs to be high enough if inside nav context */}
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
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-app-primary to-app-secondary z-[1010]" style={{ width: `${scrollProgress}%` }} />
      </motion.nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full h-screen bg-[#020817]/95 backdrop-blur-xl z-[1100] flex flex-col items-center justify-center space-y-8"
          >
             {/* Inside close button just in case we hit stacking context issues */}
             <button
                className="md:hidden text-white absolute top-6 right-6 p-2 z-[1150] h-[72px] flex items-center pr-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ top: 'calc(env(safe-area-inset-top) - 10px)' }}
                aria-label="Close Menu"
              >
                <X size={24} />
             </button>

            {NAV_LINKS.map((link, idx) => {
               const isActive = activeSection === link.name.toLowerCase();
               return (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.1) }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-display font-medium transition-colors ${
                      isActive ? 'text-[#06B6D4]' : 'text-white hover:text-app-primary'
                    }`}
                  >
                    {link.name}
                  </motion.a>
               )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
