const fs = require('fs');
const content = fs.readFileSync('src/data.ts', 'utf8');

// Find the export const PROJECTS array and replace it
const startIndex = content.indexOf('export const PROJECTS: Project[] = [');
if (startIndex !== -1) {
  const newProjects = `export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "An interactive web development experiment.",
    category: "WEB / EXPERIMENT",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/MYjqxLm",
    codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/MYjqxLm",
    image: "https://codepen.io/SUDANTU-HOLDINGS/pen/MYjqxLm/image/large.png"
  },
  {
    id: 2,
    title: "Project 2",
    description: "Exploring modern frontend layouts and interactions.",
    category: "WEB / EXPERIMENT",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/gbwzPLo",
    codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/gbwzPLo",
    image: "https://codepen.io/SUDANTU-HOLDINGS/pen/gbwzPLo/image/large.png"
  },
  {
    id: 3,
    title: "Project 3",
    description: "Creative coding and visual effects on the web.",
    category: "WEB / CREATIVE CODING",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/RNWVWZQ",
    codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/RNWVWZQ",
    image: "https://codepen.io/SUDANTU-HOLDINGS/pen/RNWVWZQ/image/large.png"
  },
  {
    id: 4,
    title: "Project 4",
    description: "A polished digital interface built on CodePen.",
    category: "UI / UX",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/pvEVVaB",
    codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/pvEVVaB",
    image: "https://codepen.io/SUDANTU-HOLDINGS/pen/pvEVVaB/image/large.png"
  },
  {
    id: 5,
    title: "CYBER943",
    description: "A creative web development project and interactive coding experiment created on CodePen.",
    category: "WEB / CREATIVE CODING",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SDM-TECH-KNOW/pen/JoEMqwB",
    codepen: "https://codepen.io/SDM-TECH-KNOW/pen/JoEMqwB",
    image: "https://codepen.io/SDM-TECH-KNOW/pen/JoEMqwB/image/large.png"
  },
  {
    id: 6,
    title: "MONOPOLY",
    description: "A browser-based Monopoly-inspired game experiment exploring interactive gameplay and web development.",
    category: "GAME / WEB",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SDM-TECH-KNOW/pen/XJpgWdd",
    codepen: "https://codepen.io/SDM-TECH-KNOW/pen/XJpgWdd",
    image: "https://codepen.io/SDM-TECH-KNOW/pen/XJpgWdd/image/large.png"
  },
  {
    id: 7,
    title: "SD",
    description: "A creative web experiment built to explore interactive design and browser-based development.",
    category: "WEB / EXPERIMENT",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://codepen.io/SDM-TECH-KNOW/pen/XJpRZMv",
    codepen: "https://codepen.io/SDM-TECH-KNOW/pen/XJpRZMv",
    image: "https://codepen.io/SDM-TECH-KNOW/pen/XJpRZMv/image/large.png"
  }
];`;

  // Find where TOOLS begins to replace everything in between
  const toolsIndex = content.indexOf('export const TOOLS: ToolItem[] = [');
  if (toolsIndex !== -1) {
    const newContent = content.substring(0, startIndex) + newProjects + '\n\n' + content.substring(toolsIndex);
    fs.writeFileSync('src/data.ts', newContent);
    console.log("Updated PROJECTS array.");
  }
}
