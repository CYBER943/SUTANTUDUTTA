import {
  Code2,
  Triangle,
  Chrome,
  Layout,
  FileText,
  CheckSquare,
  Bot,
  Sparkles,
  BrainCircuit,
  Cpu,
  Zap,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Project, ToolCategory } from './types';

export const CATEGORIES = [
  "All",
  "Web Applications",
  "Educational Projects",
  "AI Experiments",
  "UI/UX Concepts",
  "Productivity Tools"
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Chat Interface",
    description: "A minimal, modern chat interface tailored for speed and clarity. Built with smooth animations and custom markdown support.",
    category: "AI Experiments",
    tech: ["React", "TypeScript", "Tailwind", "Gemini API"],
    link: "#"
  },
  {
    id: 2,
    title: "Student Task Manager",
    description: "A beautifully designed productivity app for students to track assignments, tests, and manage intensive study sessions.",
    category: "Productivity Tools",
    tech: ["React", "Framer Motion", "Supabase"],
    link: "#"
  },
  {
    id: 3,
    title: "LearnMath Platform",
    description: "Interactive educational platform aimed at Class 10 students, visualising complex geometry and algebra.",
    category: "Educational Projects",
    tech: ["Next.js", "D3.js", "WebGL"],
    link: "#"
  },
  {
    id: 4,
    title: "E-Commerce Concept",
    description: "Sleek, dark-mode concept for a tech hardware e-commerce store focusing on micro-interactions and glassmorphism.",
    category: "UI/UX Concepts",
    tech: ["Figma", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 5,
    title: "Personal Blog CMS",
    description: "Custom lightweight content management system with a rich text editor and highly optimized performance stats.",
    category: "Web Applications",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    id: 6,
    title: "Focus Hub",
    description: "Ambient environment generator allowing developers and students to maintain deep focus with curated sounds.",
    category: "Web Applications",
    tech: ["React", "Web Audio API", "Motion"],
    link: "#"
  }
];

export const TOOLS: ToolCategory[] = [
  {
    category: "Development",
    items: [
      { name: "CodePen", icon: Code2 },
      { name: "Vercel", icon: Triangle },
      { name: "Chrome", icon: Chrome },
      { name: "B12.io", icon: Layout }
    ]
  },
  {
    category: "Productivity",
    items: [
      { name: "Notion", icon: FileText },
      { name: "Todoist", icon: CheckSquare }
    ]
  },
  {
    category: "AI",
    items: [
      { name: "ChatGPT", icon: Bot },
      { name: "Claude", icon: Sparkles },
      { name: "Gemini", icon: BrainCircuit },
      { name: "Copilot", icon: Cpu },
      { name: "NoteGPT", icon: Zap }
    ]
  },
  {
    category: "Communication",
    items: [
      { name: "Outlook", icon: Mail },
      { name: "Gmail", icon: MessageSquare }
    ]
  }
];
