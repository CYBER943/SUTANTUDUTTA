const fs = require('fs');

let footer = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
footer = footer.replace(/bg-\[radial-gradient\(ellipse_at_bottom,rgba\(139,92,246,0\.12\)_0%,rgba\(5,5,10,1\)_70%\)\]/, 'bg-[radial-gradient(ellipse_at_bottom,var(--glow)_0%,var(--bg-primary)_70%)]');
fs.writeFileSync('src/components/layout/Footer.tsx', footer);

let cursor = fs.readFileSync('src/components/ui/CustomCursor.tsx', 'utf8');
cursor = cursor.replace(/rgba\(239, 68, 68, 0\.1\)/g, 'var(--glow)');
cursor = cursor.replace(/rgba\(239, 68, 68, 0\.4\)/g, 'var(--glow)');
fs.writeFileSync('src/components/ui/CustomCursor.tsx', cursor);
