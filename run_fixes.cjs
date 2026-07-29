const fs = require('fs');
let data = fs.readFileSync('navbar_backup.tsx', 'utf-8');

data = data.replace(
  "export default function Navbar({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {",
  "import { useRef } from 'react';\nexport default function Navbar({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {"
);

const scrollEffectOriginal = `  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);`;

const scrollEffectNew = `  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
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
      lastScrollY.current = currentScrollY;`;

data = data.replace(scrollEffectOriginal, scrollEffectNew);

data = data.replace(
  '<span className="text-app-text">Sutantu </span>\n            <span className="text-app-primary">Dutta</span>',
  '<span className="text-app-text">Sutantu </span>\n            <span className="text-app-primary">Dutta</span>\n            <span className="hidden sm:inline-block ml-2 text-app-text-secondary font-mono text-sm opacity-50">\n              / {activeSection}\n            </span>'
);

data = data.replace(
  `        className={\`fixed top-0 left-0 w-full z-[1000] h-[80px] flex flex-col justify-center transition-all duration-300 \${
          isScrolled ? 'bg-app-bg/80 backdrop-blur-xl border-b border-app-border' : 'bg-transparent'
        }\`}`,
  `        className={\`fixed left-0 w-full z-[1000] h-[80px] flex flex-col justify-center transition-all duration-500 \${
          isScrolled ? 'bg-app-bg/80 backdrop-blur-xl border-b border-app-border' : 'bg-transparent'
        } \${isNavbarVisible ? 'top-0' : '-top-[100px]'}\`}`
);

data = data.replace(
  /<a\s+href="#contact"[\s\S]*?<span className="relative z-10">Let's Talk<\/span>[\s\S]*?<\/a>/,
  `<a
              href="#contact"
              className={\`relative overflow-hidden px-6 py-2.5 text-sm font-medium rounded-full bg-app-primary text-white transition-all group \${
                activeSection === 'home' 
                  ? 'shadow-[0_0_20px_rgba(255,90,54,0.3)] animate-pulse hover:animate-none hover:shadow-[0_0_30px_rgba(255,90,54,0.5)]' 
                  : 'shadow-[0_0_15px_rgba(255,90,54,0.2)] hover:shadow-[0_0_25px_rgba(255,90,54,0.4)]'
              } hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]\`}
            >
              <span className="relative z-10">Let's Talk</span>
              {/* Gradient sweep effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
            </a>`
);

fs.writeFileSync('src/components/layout/Navbar.tsx', data);
