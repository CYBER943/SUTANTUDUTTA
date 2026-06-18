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
  MessageSquare,
  Terminal,
  Globe
} from 'lucide-react';
import {
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiGithubcopilot,
  SiCodepen,
  SiVercel,
  SiGooglechrome,
  SiNotion,
  SiTodoist,
  SiGmail
} from 'react-icons/si';
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
    category: "AI & Research",
    items: [
      { name: "ChatGPT", icon: SiOpenai, url: "https://chatgpt.com", color: "#10a37f", description: "Advanced conversational AI by OpenAI." },
      { name: "Claude", icon: SiAnthropic, url: "https://claude.ai", color: "#d97757", description: "Helpful and harmless AI assistant by Anthropic." },
      { name: "Gemini", icon: SiGooglegemini, url: "https://gemini.google.com", color: "#8e75ff", description: "Google's most capable AI model for multimodal tasks." },
      { name: "Copilot", icon: SiGithubcopilot, url: "https://copilot.microsoft.com", color: "#188038", description: "Your everyday AI companion by Microsoft." },
      { name: "Grok", icon: Globe, url: "https://grok.com", color: "#ffffff", description: "Real-time AI by xAI with a sense of humor." },
      { name: "NoteGPT", icon: Zap, url: "https://notegpt.io", color: "#facc15", description: "AI-powered note-taking and summarization." }
    ]
  },
  {
    category: "Development",
    items: [
      { name: "CodePen", icon: SiCodepen, url: "https://codepen.io", color: "#ffffff", description: "Social development environment for front-end designers." },
      { name: "Windsurf", icon: Terminal, url: "https://windsurf.com", color: "#3b82f6", description: "The world's first agentic IDE." },
      { name: "Vercel", icon: SiVercel, url: "https://vercel.com", color: "#ffffff", description: "Frontend cloud platform for seamless deployment." },
      { name: "B12", icon: Layout, url: "https://b12.io", color: "#8b5cf6", description: "AI website builder for professional services." },
      { name: "Chrome", icon: SiGooglechrome, url: "https://www.google.com/chrome", color: "#4285F4", description: "Fast, secure, and powerful web browser." }
    ]
  },
  {
    category: "Productivity",
    items: [
      { name: "Notion", icon: SiNotion, url: "https://www.notion.so", color: "#ffffff", description: "The all-in-one workspace for your notes and tasks." },
      { name: "Todoist", icon: SiTodoist, url: "https://todoist.com", color: "#e44332", description: "The world's #1 task manager and to-do list app." }
    ]
  },
  {
    category: "Communication",
    items: [
      { name: "Outlook", icon: Mail, url: "https://outlook.com", color: "#0078d4", description: "Secure email and calendar from Microsoft." },
      { name: "Gmail", icon: SiGmail, url: "https://gmail.com", color: "#ea4335", description: "Secure, smart, and easy-to-use email by Google." }
    ]
  }
];
