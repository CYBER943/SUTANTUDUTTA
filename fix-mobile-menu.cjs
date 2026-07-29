const fs = require('fs');
let data = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf-8');

data = data.replace(
  "initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}\n            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}\n            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}",
  "initial={{ y: '-100%' }}\n            animate={{ y: 0 }}\n            exit={{ y: '-100%' }}"
);

fs.writeFileSync('src/components/layout/Navbar.tsx', data);
