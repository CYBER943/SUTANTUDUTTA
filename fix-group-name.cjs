const fs = require('fs');
let data = fs.readFileSync('src/components/ui/CommandPalette.tsx', 'utf-8');

data = data.replace(
  /group: 'Recent'/g,
  "group: 'Suggested / Recent'"
);

data = data.replace(
  /'Recent', \.\.\.Array\.from/g,
  "'Suggested / Recent', ...Array.from"
);

fs.writeFileSync('src/components/ui/CommandPalette.tsx', data);
