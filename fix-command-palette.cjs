const fs = require('fs');
let data = fs.readFileSync('src/components/ui/CommandPalette.tsx', 'utf-8');

data = data.replace(
  `      const saved = localStorage.getItem('recentCommands');
      if (saved) {
        setRecentIds(JSON.parse(saved));
      }`,
  `      const saved = localStorage.getItem('recentCommands');
      if (saved && JSON.parse(saved).length > 0) {
        setRecentIds(JSON.parse(saved));
      } else {
        setRecentIds(['projects', 'tools', 'blog']);
      }`
);

data = data.replace(
  "                  <div className=\"px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider\">\n                    Recent\n                  </div>",
  "                  <div className=\"px-3 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider\">\n                    Suggested / Recent\n                  </div>"
);

fs.writeFileSync('src/components/ui/CommandPalette.tsx', data);
