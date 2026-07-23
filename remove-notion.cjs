const fs = require('fs');
let data = fs.readFileSync('src/components/sections/Tools.tsx', 'utf-8');

const regex = /\{\s*name:\s*'Notion'[\s\S]*?\},/;
if (regex.test(data)) {
  data = data.replace(regex, '');
  fs.writeFileSync('src/components/sections/Tools.tsx', data);
  console.log("Removed Notion.");
} else {
  console.log("Notion not found.");
}
