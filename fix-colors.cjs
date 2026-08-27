const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/components/sections/Blog.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/sections/Projects.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/ui/CommandPalette.tsx',
  'src/components/ui/BackgroundCode.tsx',
  'src/components/ui/CodeEditorShowcase.tsx'
];

for (const p of filePaths) {
  let content = fs.readFileSync(p, 'utf8');
  
  // Backgrounds
  content = content.replace(/bg-\[\#020817\]/g, 'bg-app-bg');
  content = content.replace(/bg-\[\#05050A\]/g, 'bg-app-bg');
  content = content.replace(/bg-\[\#0A0A0A\]/g, 'bg-app-bg-secondary');
  content = content.replace(/bg-\[\#111111\]/g, 'bg-app-bg-secondary');
  
  // Generic white text that should adapt
  // Only replace "text-white" where it's likely a foreground, we avoid replacing it in Buttons where it might be paired with "bg-app-primary"
  // Let's manually replace "text-white" to "text-app-text" if it doesn't look like it's inside a primary button, but maybe it's easier to just do it via Regex cautiously.
  content = content.replace(/(?<!from-|via-|to-)text-white(?!\/[0-9]|-[0-9])/g, 'text-app-text');
  content = content.replace(/text-white\/30/g, 'text-app-muted');
  content = content.replace(/text-white\/40/g, 'text-app-muted');
  content = content.replace(/text-white\/50/g, 'text-app-text-secondary');
  content = content.replace(/text-white\/70/g, 'text-app-text-secondary');
  content = content.replace(/text-white\/80/g, 'text-app-text-secondary');
  content = content.replace(/text-white\/90/g, 'text-app-text');
  
  // Borders
  content = content.replace(/border-white\/\[0\.05\]/g, 'border-app-border-light');
  content = content.replace(/border-white\/\[0\.08\]/g, 'border-app-border');
  content = content.replace(/border-white\/5/g, 'border-app-border-light');
  content = content.replace(/border-white\/10/g, 'border-app-border');
  content = content.replace(/border-white\/20/g, 'border-app-border');
  content = content.replace(/border-white\/30/g, 'border-app-border');
  
  // Background alphas
  content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-app-card');
  content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-app-card');
  content = content.replace(/bg-white\/5/g, 'bg-app-card');
  content = content.replace(/bg-white\/10/g, 'bg-app-elevated');
  
  // Placeholder text
  content = content.replace(/placeholder:text-white\/40/g, 'placeholder:text-app-muted');
  
  // Specific tweaks for Hero & Contact bg-black/40 etc
  content = content.replace(/bg-black\/40/g, 'bg-app-bg-secondary');
  
  fs.writeFileSync(p, content);
}
console.log("Replaced colors.");
