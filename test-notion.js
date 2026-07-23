const fs = require('fs');
let data = fs.readFileSync('src/components/sections/Tools.tsx', 'utf-8');
data = data.replace(
  "const TOOLS_DATA = [",
  `const TOOLS_DATA = [
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and collaboration.',
    slug: 'notion',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
    hasText: true,
    invert: true,
  },
  {
    name: 'Todoist',
    description: 'Task management app and to-do list organizer.',
    slug: 'todoist',
    logoUrl: 'https://cdn.simpleicons.org/todoist/E44332',
    hasText: false,
    invert: false,
  },`
);
fs.writeFileSync('src/components/sections/Tools.tsx', data);
