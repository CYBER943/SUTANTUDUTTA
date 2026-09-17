const fs = require('fs');

// Add TOOLS_SHOWCASE to data.ts
const dataTsPath = 'src/data.ts';
let dataContent = fs.readFileSync(dataTsPath, 'utf8');

if (!dataContent.includes('TOOLS_SHOWCASE')) {
  const showcaseTools = `
export const TOOLS_SHOWCASE = [
  { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC' },
  { name: 'GitHub', slug: 'github', color: 'FFFFFF' },
  { name: 'Copilot', slug: 'githubcopilot', color: 'FFFFFF' },
  { name: 'ChatGPT', slug: 'openai', color: 'FFFFFF' },
  { name: 'Gemini', slug: 'googlegemini', color: '8E75B2' },
  { name: 'AI Studio', slug: 'google', color: '4285F4' },
  { name: 'Grok', slug: 'x', color: 'FFFFFF' },
  { name: 'Adobe Express', slug: 'adobe', color: 'FF0000' },
  { name: 'Dropbox', slug: 'dropbox', color: '0061FF' },
  { name: 'Claude', slug: 'claude', color: 'D97757' },
  { name: 'Todoist', slug: 'todoist', color: 'E44332' },
  { name: 'Vercel', slug: 'vercel', color: 'FFFFFF' },
];
`;
  dataContent += showcaseTools;
  fs.writeFileSync(dataTsPath, dataContent);
}

// Remove TOOLS from ToolShowcase.tsx and import it
const tsPath = 'src/components/ui/ToolShowcase.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');
tsContent = tsContent.replace(/const TOOLS = \[[\s\S]*?\];/g, '');
if (!tsContent.includes('TOOLS_SHOWCASE')) {
  tsContent = tsContent.replace(/import { (.*?) } from 'motion\/react';/, "import { $1 } from 'motion/react';\nimport { TOOLS_SHOWCASE as TOOLS } from '../../data';");
}
fs.writeFileSync(tsPath, tsContent);
