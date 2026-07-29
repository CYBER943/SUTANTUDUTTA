const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf-8');

data = data.replace(
  '{ name: "Claude", icon: Bot, url: "https://claude.ai", color: "#D97757", description: "AI assistant for advanced reasoning, research, and analysis.", category: "AI", experienceLevel: "Advanced", usageFrequency: "Daily" },\n',
  ''
);

fs.writeFileSync('src/data.ts', data);
