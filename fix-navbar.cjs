const fs = require('fs');
let data = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf-8');

data = data.replace(
  'const { theme, toggleTheme } = useTheme();',
  'const { theme, toggleTheme } = useTheme();\n  const [isNavbarVisible, setIsNavbarVisible] = useState(true);\n  const lastScrollY = useRef(0);'
);

data = data.replace(
  'setIsScrolled(window.scrollY > 50);',
  `const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;`
);

data = data.replace(
  'import { useState, useEffect }',
  'import { useState, useEffect, useRef }'
);

fs.writeFileSync('src/components/layout/Navbar.tsx', data);
