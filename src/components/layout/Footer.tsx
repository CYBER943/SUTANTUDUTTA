export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-app-bg py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        
        <div className="mb-8">
          <a href="#home" className="text-2xl font-display font-bold tracking-tight text-white group">
            Sutantu<span className="text-app-primary">.</span>
            <span className="text-app-muted">dev</span>
          </a>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 mb-12">
          <a href="#home" className="text-sm text-app-muted hover:text-white transition-colors">Home</a>
          <a href="#about" className="text-sm text-app-muted hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-sm text-app-muted hover:text-white transition-colors">Projects</a>
          <a href="#tools" className="text-sm text-app-muted hover:text-white transition-colors">Tools</a>
          <a href="#contact" className="text-sm text-app-muted hover:text-white transition-colors">Contact</a>
        </nav>

        <div className="w-24 h-[1px] bg-white/10 mb-8" />

        <p className="text-app-muted text-sm italic mb-2">
          "Built with curiosity, creativity, and continuous learning."
        </p>
        
        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Sutantu Dutta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
