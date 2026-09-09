import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, Command, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Tools", href: "#tools" },
  { name: "Blog", href: "#blog" },
];

export default function Navbar({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Determine active section (optimized to avoid reflows where possible)
      const sections = NAV_LINKS.map((link) => {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        return { id, el };
      }).filter((s) => s.el !== null);

      let currentSection = "home";
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i];
        if (el && window.scrollY >= el.offsetTop - 150) {
          currentSection = id;
          break;
        }
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 w-full z-[1000] h-[80px] flex flex-col justify-center transition-all duration-500 ${
          isScrolled
            ? "bg-app-bg/80 backdrop-blur-xl border-b border-app-border"
            : "bg-transparent"
        } ${isNavbarVisible ? "top-0" : "-top-[100px]"}`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center relative">
          <div className="flex-1 flex items-center">
            <a
              href="#home"
              className="text-2xl font-display font-semibold tracking-tight group relative z-[1010] hover:opacity-80 transition-opacity"
            >
              <span className="text-app-text">Sutantu </span>
              <span className="text-app-primary">Dutta</span>
            </a>
          </div>

          {/* Desktop Center Pill Navigation */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center p-1.5 bg-app-bg border border-app-border rounded-full shadow-[inset_0_1px_4px_rgba(255,255,255,0.02),0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative px-5 py-2 text-sm font-medium transition-colors group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-app-card border border-app-border-light rounded-full z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-app-text" : "text-app-muted group-hover:text-app-text-secondary"}`}>
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Side CTA & Tools */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 text-app-muted hover:text-app-text rounded-full transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 text-app-muted hover:text-app-primary rounded-full transition-colors flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#contact"
              className="relative overflow-hidden px-6 py-2.5 text-sm font-medium rounded-full bg-app-primary text-white transition-all group shadow-[0_0_15px_rgba(255,90,54,0.2)] hover:shadow-[0_0_25px_rgba(255,90,54,0.4)] active:scale-[0.96]"
            >
              <span className="relative z-10 flex items-center justify-center h-full">Let's Talk</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="#contact"
              className="relative overflow-hidden px-4 py-2 text-xs font-medium rounded-full bg-app-primary text-white transition-all group shadow-[0_0_15px_rgba(255,90,54,0.2)] active:scale-[0.96]"
            >
              <span className="relative z-10 flex items-center justify-center h-full">Let's Talk</span>
            </a>
            <button
              className="text-app-text relative z-[1150] p-2 -mr-2 interactive min-h-[44px] min-w-[44px] flex items-center justify-center bg-app-card border border-app-border rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-[100dvh] bg-app-bg/95 backdrop-blur-2xl z-[1100] flex flex-col items-center justify-center space-y-8"
          >
            {/* Inside close button */}
            <button
              className="md:hidden text-app-text absolute top-6 right-6 p-2.5 z-[1150] min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ top: "calc(1.5rem + env(safe-area-inset-top))" }}
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
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-display font-medium transition-colors ${
                    isActive
                      ? "text-app-primary"
                      : "text-app-text-secondary hover:text-app-text"
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.1 }}
              className="flex items-center gap-6 mt-8"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenCommandPalette) onOpenCommandPalette();
                }}
                className="flex items-center justify-center p-4 rounded-full bg-app-card border border-app-border text-app-text-secondary hover:text-app-text hover:bg-app-elevated transition-colors"
                aria-label="Search"
              >
                <Search size={24} />
              </button>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center p-4 rounded-full bg-app-card border border-app-border text-app-text-secondary hover:text-app-primary hover:bg-app-elevated transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
