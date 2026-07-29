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
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl font-display font-semibold tracking-tight group relative z-[1010] hover:opacity-80 transition-opacity"
          >
            <span className="text-app-text">Sutantu </span>
            <span className="text-app-primary">Dutta</span>
            <span className="hidden sm:inline-block ml-2 text-app-text-secondary font-mono text-sm opacity-50">
              / {activeSection}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors group py-2 ${
                    isActive
                      ? "text-app-text"
                      : "text-app-text-secondary hover:text-app-text"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-app-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                  {/* Subtle glow on hover */}
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-md -z-10 transition-opacity duration-300 scale-110" />
                </a>
              );
            })}

            <button
              onClick={onOpenCommandPalette}
              className="flex items-center justify-center p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open Command Palette"
            >
              <Search size={18} />
              <span className="ml-2 text-xs font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/5 opacity-70 flex items-center gap-1">
                <Command size={10} /> K
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-full text-app-text-secondary hover:text-app-primary hover:bg-app-card hover:scale-110 transition-all duration-300 mr-2"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className={`relative overflow-hidden px-6 py-2.5 text-sm font-medium rounded-full bg-app-primary text-white transition-all group ${
                activeSection === "home"
                  ? "shadow-[0_0_20px_rgba(255,90,54,0.3)] animate-pulse hover:animate-none hover:shadow-[0_0_30px_rgba(255,90,54,0.5)]"
                  : "shadow-[0_0_15px_rgba(255,90,54,0.2)] hover:shadow-[0_0_25px_rgba(255,90,54,0.4)]"
              } hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]`}
            >
              <span className="relative z-10">Let's Talk</span>
              {/* Gradient sweep effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-1">
            <button
              onClick={toggleTheme}
              className="text-app-text-secondary relative z-[1150] p-2.5 interactive min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-app-primary transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-white relative z-[1150] p-2.5 interactive min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={onOpenCommandPalette}
              aria-label="Open Command Palette"
            >
              <Search size={20} />
            </button>

            <button
              className="text-white relative z-[1150] p-2.5 -mr-2 interactive min-h-[44px] min-w-[44px] flex items-center justify-center"
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
              className="md:hidden text-white absolute top-6 right-6 p-2.5 z-[1150] min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ top: "calc(env(safe-area-inset-top) - 10px)" }}
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
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.1 }}
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-8 py-3 min-h-[44px] flex items-center justify-center text-lg font-medium rounded-full bg-app-primary text-white hover:bg-app-primary-hover shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-colors"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
