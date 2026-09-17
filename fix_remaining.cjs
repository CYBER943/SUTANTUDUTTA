const fs = require('fs');
const path = require('path');

const mappings = {
  '--color-app-border-light': '--card-border',
  '--color-app-border': '--border',
  '--color-app-bg': '--bg-primary',
  '--color-app-text': '--text-primary',
  'focus:border-app-text': 'focus:border-text-primary',
  'from-app-text-secondary': 'from-text-secondary',
  'to-app-muted': 'to-text-muted',
  'bg-app-text': 'bg-text-primary',
  'text-app-bg': 'text-bg-primary',
  'from-app-bg/80': 'from-bg-primary/80',
  'border-app-success/20': 'border-status-success/20',
  'hover:text-app-primary-hover': 'hover:text-accent-secondary',
  'bg-app-border': 'bg-border',
  'bg-app-text-secondary': 'bg-text-secondary',
  'to-app-purple': 'to-accent-bright',
  '#FF4D4D': 'var(--accent-primary)',
  '#ef4444': 'var(--accent-primary)',
  'rgba(239, 68, 68, 0.8)': 'var(--accent-secondary)'
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

    for (const [key, value] of Object.entries(mappings)) {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, value);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
});
