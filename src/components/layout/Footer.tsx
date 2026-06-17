import { Github, Codepen, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-app-bg pt-20 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-app-primary/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16 relative z-10">
        
        {/* Branding Column */}
        <div className="md:col-span-2">
          <a href="#home" className="inline-block text-2xl font-display font-bold tracking-tight text-white group mb-6">
            Sutantu<span className="text-app-primary">.</span>
            <span className="text-app-muted">dev</span>
          </a>
          <p className="text-app-muted font-light mb-6 max-w-sm leading-relaxed">
            "Built with curiosity, creativity, and continuous learning." <br />
            — Sutantu Dutta
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
          <nav className="flex flex-col space-y-4">
            {['Home', 'About', 'Projects', 'Tools', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-app-muted hover:text-white hover:translate-x-1 transition-all w-fit">
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Profiles Column */}
        <div>
          <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Profiles</h4>
          <div className="flex flex-col space-y-4">
            <a 
              href="https://github.com/Sdm940" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-app-muted hover:text-white transition-colors group w-fit"
            >
              <Github size={16} />
              <span>GitHub</span>
              <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-app-primary" />
            </a>
            <a 
              href="https://codepen.io/SDM-TECH-KNOW" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-app-muted hover:text-white transition-colors group w-fit"
            >
              <Codepen size={16} />
              <span>CodePen</span>
              <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-app-primary" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm">
          &copy; 2026 Sutantu Dutta. All Rights Reserved.
        </p>
        <p className="text-white/30 text-xs">
          Designed and developed for the modern web.
        </p>
      </div>
    </footer>
  );
}
