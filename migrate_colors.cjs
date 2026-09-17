const fs = require('fs');
const path = require('path');

const mappings = {
  // Backgrounds
  'bg-app-bg': 'bg-bg-primary',
  'bg-app-bg-secondary': 'bg-bg-secondary',
  'bg-app-card': 'bg-card-bg',
  'bg-app-elevated': 'bg-surface-elevated',
  
  // Text
  'text-app-text': 'text-text-primary',
  'text-app-text-secondary': 'text-text-secondary',
  'text-app-muted': 'text-text-muted',
  'text-app-disabled': 'text-disabled-text',
  
  // Borders
  'border-app-border': 'border-border',
  'border-app-border-light': 'border-border',
  'border-app-primary/50': 'border-input-border-focus',
  'border-app-primary/30': 'border-border-strong',
  'hover:border-app-border': 'hover:border-card-border-hover',
  'group-hover:border-app-border-light': 'group-hover:border-card-border-hover',
  
  // Accents
  'text-app-primary': 'text-accent-primary',
  'bg-app-primary': 'bg-accent-primary',
  'bg-app-primary/5': 'bg-glow',
  'bg-app-primary/10': 'bg-glow',
  'bg-app-primary/20': 'bg-glow',
  'hover:text-app-primary': 'hover:text-accent-bright',
  'hover:bg-app-primary': 'hover:bg-accent-secondary',
  'group-hover:text-app-primary': 'group-hover:text-accent-bright',
  'group-hover:bg-app-primary/20': 'group-hover:bg-glow',
  'border-app-primary': 'border-accent-primary',
  'from-app-primary': 'from-accent-primary',
  'to-app-primary': 'to-accent-primary',
  'via-app-primary': 'via-accent-primary',
  
  // Specific Oranges / Reds / Ambers / Purples mapped to Accents / Text
  'bg-orange-500/10': 'bg-glow',
  'bg-orange-500/5': 'bg-glow',
  'bg-red-500/10': 'bg-glow',
  'bg-red-500/5': 'bg-glow',
  'bg-red-600/5': 'bg-glow',
  'bg-blue-500/5': 'bg-glow',
  'bg-app-purple/10': 'bg-glow',
  'text-red-100': 'text-text-primary',
  'text-red-400': 'text-accent-bright',
  'text-red-500': 'text-status-error',
  'border-red-500': 'border-status-error',
  'border-red-500/30': 'border-border-strong',
  'border-red-500/10': 'border-border',
  'from-red-900/10': 'from-bg-secondary',
  'to-orange-900/5': 'to-bg-primary',
  'from-red-400': 'from-accent-secondary',
  'to-red-500': 'to-accent-primary',
  'via-orange-300': 'via-accent-bright',
  'via-orange-400': 'via-accent-bright',
  'to-orange-300': 'to-accent-bright',
  'hover:bg-red-500/10': 'hover:bg-glow',
  'hover:border-red-500/30': 'hover:border-border-strong',
  'hover:text-red-100': 'hover:text-text-primary',
  'group-hover:bg-red-500/10': 'group-hover:bg-glow',
  'group-hover:text-red-400': 'group-hover:text-accent-bright',
  
  // Status
  'bg-app-success': 'bg-status-success',
  'text-app-success': 'text-status-success',
  
  // Shadows (replace custom rgba with generic or new token if needed, or remove)
  // Let's replace the shadow-[0_8px_30px_rgba(255,90,54,0.08)] style strings.
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Apply regex replaces for the known mappings
    for (const [key, value] of Object.entries(mappings)) {
      // Use regex with word boundaries for safe replacement, handling slashes
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![a-zA-Z0-9_-])', 'g');
      content = content.replace(regex, value);
    }
    
    // Replace hardcoded rgba colored shadows with generic shadows + hover:bg-glow etc.
    // E.g., shadow-[0_0_20px_rgba(255,90,54,0.3)] -> shadow-lg (and we'll add shadow-accent if we had one, but standard shadow is black-based)
    content = content.replace(/shadow-\[.*?rgba?.*?\]/g, 'shadow-lg');
    content = content.replace(/drop-shadow-\[.*?rgba?.*?\]/g, 'drop-shadow-lg');
    
    // Hex replacements
    content = content.replace(/#F97316/gi, 'var(--accent-primary)');
    content = content.replace(/#FB923C/gi, 'var(--accent-bright)');
    content = content.replace(/#EA580C/gi, 'var(--accent-primary)');
    content = content.replace(/#FFA500/gi, 'var(--accent-primary)');
    content = content.replace(/#FF6B35/gi, 'var(--accent-primary)');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
});
