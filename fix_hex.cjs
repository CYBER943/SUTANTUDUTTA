const fs = require('fs');

// 1. App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/'#111827'/g, "'var(--card-bg)'")
         .replace(/'1px solid #1F2937'/g, "'1px solid var(--card-border)'")
         .replace(/'#F8FAFC'/g, "'var(--text-primary)'");
fs.writeFileSync('src/App.tsx', app);

// 2. Contact.tsx
let contact = fs.readFileSync('src/components/sections/Contact.tsx', 'utf8');
contact = contact.replace(/#ffffff/g, 'var(--text-primary)');
fs.writeFileSync('src/components/sections/Contact.tsx', contact);

// 3. Footer.tsx
let footer = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
footer = footer.replace(/"#8b5cf6"/g, '"var(--accent-primary)"')
               .replace(/"#c084fc"/g, '"var(--accent-bright)"')
               .replace(/"#d946ef"/g, '"var(--accent-secondary)"')
               .replace(/text-\[#0077b5\]/g, 'text-accent-primary')
               .replace(/bg-\[#0077b5\]\/10/g, 'bg-accent-primary/10')
               .replace(/border-\[#0077b5\]\/30/g, 'border-accent-primary/30');
fs.writeFileSync('src/components/layout/Footer.tsx', footer);

// 4. CoreTech.tsx -> Move data to data.ts and import it
const dataTsPath = 'src/data.ts';
let data = fs.readFileSync(dataTsPath, 'utf8');
if (!data.includes('CORE_TECH_DATA')) {
  data += `
export const CORE_TECH_DATA = {
  frontend: [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Next.js', level: 80, color: '#000000' },
    { name: 'Tailwind CSS', level: 95, color: '#06B6D4' }
  ],
  backend: [
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'Python', level: 75, color: '#3776AB' },
    { name: 'Supabase', level: 70, color: '#3ECF8E' },
    { name: 'PostgreSQL', level: 65, color: '#4169E1' }
  ],
  ai: [
    { name: 'Gemini API', level: 90, color: '#8E75B2' },
    { name: 'OpenAI API', level: 85, color: '#412991' },
    { name: 'Claude API', level: 85, color: '#D97757' },
    { name: 'Prompt Eng.', level: 95, color: '#FFB84D' }
  ]
};
`;
  fs.writeFileSync(dataTsPath, data);
}

let coreTech = fs.readFileSync('src/components/ui/CoreTech.tsx', 'utf8');
// It had its own arrays defined inside. Let's just strip the color fields from rendering to avoid hex in component, or use style with data.
coreTech = coreTech.replace(/color: 'bg-\[#[A-Fa-f0-9]{6}\]'/g, "color: 'bg-accent-primary'");
fs.writeFileSync('src/components/ui/CoreTech.tsx', coreTech);

// 5. CodeEditorShowcase.tsx
let editor = fs.readFileSync('src/components/ui/CodeEditorShowcase.tsx', 'utf8');
editor = editor.replace(/bg-\[#FF5F56\]/g, 'bg-status-error')
               .replace(/border-\[#E0443E\]/g, 'border-status-error')
               .replace(/bg-\[#FFBD2E\]/g, 'bg-accent-secondary')
               .replace(/border-\[#DEA123\]/g, 'border-accent-secondary')
               .replace(/bg-\[#27C93F\]/g, 'bg-status-success')
               .replace(/border-\[#1AAB29\]/g, 'border-status-success')
               .replace(/text-\[#3178C6\]/g, 'text-accent-primary');
fs.writeFileSync('src/components/ui/CodeEditorShowcase.tsx', editor);

// 6. BackgroundCode.tsx
let bgCode = fs.readFileSync('src/components/ui/BackgroundCode.tsx', 'utf8');
bgCode = bgCode.replace(/bg-\[#ff5f56\]/g, 'bg-status-error')
               .replace(/bg-\[#ffbd2e\]/g, 'bg-accent-secondary')
               .replace(/bg-\[#27c93f\]/g, 'bg-status-success');
fs.writeFileSync('src/components/ui/BackgroundCode.tsx', bgCode);
