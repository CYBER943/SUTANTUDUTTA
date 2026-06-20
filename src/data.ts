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
  Globe,
  BookOpen
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
  SiTodoist
} from 'react-icons/si';
import { Project, ToolCategory, BlogPost, TimelineEvent, CaseStudy, CurrentInterest, LearningSkill, ProjectCategoryData } from './types';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 1, year: "The Beginning", title: "Started exploring technology", description: "Fell in love with computers and began understanding how the digital world operates." },
  { id: 2, year: "First Steps", title: "Learned HTML & CSS", description: "Wrote my very first lines of code. It was simple, but seeing text appear on a screen felt like magic." },
  { id: 3, year: "Building", title: "Built first website", description: "Put together a fully functional static website. The spark for frontend development was ignited." },
  { id: 4, year: "Experimentation", title: "Started using CodePen", description: "Began creating bite-sized UI/UX experiments and sharing them with the community." },
  { id: 5, year: "Momentum", title: "Built 100+ projects", description: "Consistent daily coding led to shipping over a hundred micro-projects and interactive components." },
  { id: 6, year: "Competition", title: "Participated in SOF", description: "Challenged my problem-solving skills in competitive logical and technical Olympiads." },
  { id: 7, year: "Recognition", title: "Completed MyGov Certifications", description: "Validated my technical understanding through official digital literacy and technology programs." },
  { id: 8, year: "Milestone", title: "Reached 500+ projects", description: "A massive milestone embodying absolute dedication to learning through consistent building." },
  { id: 9, year: "Present", title: "Exploring AI & Modern Web", description: "Currently diving deep into artificial intelligence, LLMs, and modern scalable web architectures." }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    category: "Full-Stack Development",
    problem: "Traditional task managers are too static and require manual organizing which reduces overall productivity.",
    solution: "Developed an intelligent platform that auto-prioritizes tasks using AI based on deadlines, context, and complexity.",
    technologies: ["React", "TypeScript", "Node.js", "Gemini API", "Tailwind CSS"],
    challenges: "Handling real-time AI latency and managing complex application state during dynamic re-sorting.",
    learnings: "Deepened my understanding of optimistic UI updates and effectively prompting external LLMs for structured data output."
  },
  {
    id: 2,
    title: "Interactive Geometry Visualizer",
    category: "Educational Tech",
    problem: "Class 10 students struggle to understand abstract 3D geometry concepts purely from 2D textbooks.",
    solution: "Built a WebGL-powered interactive canvas allowing students to manipulate, rotate, and construct geometric shapes directly in the browser.",
    technologies: ["Next.js", "Three.js", "Framer Motion"],
    challenges: "Optimizing WebGL rendering performance on low-end school devices.",
    learnings: "Mastered 3D spatial mathematics and efficient rendering loops in the browser."
  }
];

export const CURRENT_INTERESTS: CurrentInterest[] = [
  { id: 1, title: "Portfolio Improvements", icon: Layout, status: "Active" },
  { id: 2, title: "AI Experiments", icon: Bot, status: "Exploring" },
  { id: 3, title: "UI Components", icon: Sparkles, status: "Building" },
  { id: 4, title: "Educational Tools", icon: BookOpen, status: "Ideating" },
  { id: 5, title: "Productivity Systems", icon: CheckSquare, status: "Refining" }
];

export const LEARNING_SKILLS: LearningSkill[] = [
  { id: 1, title: "JavaScript", level: 90, icon: Code2 },
  { id: 2, title: "UI/UX Design", level: 85, icon: Layout },
  { id: 3, title: "Artificial Intelligence", level: 75, icon: BrainCircuit },
  { id: 4, title: "Problem Solving", level: 88, icon: Zap },
  { id: 5, title: "System Design", level: 70, icon: Cpu },
  { id: 6, title: "Productivity Systems", level: 95, icon: CheckSquare }
];

export const PROJECT_CATEGORIES_DATA: ProjectCategoryData[] = [
  { id: 0, title: "All", count: 500, description: "View all projects and experiments built over time.", icon: Code2 },
  { id: 1, title: "AI Experiments", count: 42, description: "Exploring LLMs, prompt engineering, and intelligent agents.", icon: Bot },
  { id: 2, title: "Web Applications", count: 128, description: "Full-stack scalable solutions addressing real-world problems.", icon: Globe },
  { id: 3, title: "UI/UX Concepts", count: 215, description: "Micro-interactions, animations, and premium interface designs.", icon: Sparkles },
  { id: 4, title: "Educational Tools", count: 35, description: "Interactive platforms designed to make learning intuitive.", icon: BookOpen },
  { id: 5, title: "Productivity Apps", count: 80, description: "Tools and systems designed to boost focus and output.", icon: CheckSquare }
];

export const BLOG_CATEGORIES = [
  "All",
  "AI & Technology",
  "Web Development",
  "Productivity",
  "Learning Journey",
  "Project Breakdowns"
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Building an AI-Powered Markdown Editor",
    excerpt: "A deep dive into integrating the Gemini API and crafting a seamless, real-time typing experience for content creators.",
    category: "AI & Technology",
    readTime: "6 min read",
    date: "June 12, 2026",
  },
  {
    id: 2,
    title: "How I Built 500+ Projects",
    excerpt: "My journey through continuous experimentation, learning curves, and the systematic approach I use to ship code consistently.",
    category: "Learning Journey",
    readTime: "8 min read",
    date: "May 28, 2026",
  },
  {
    id: 3,
    title: "Mastering Tailwind CSS & Framer Motion",
    excerpt: "Techniques for building premium, micro-interactive user interfaces that feel native and highly responsive.",
    category: "Web Development",
    readTime: "5 min read",
    date: "May 15, 2026",
  },
  {
    id: 4,
    title: "Project Breakdown: Student Task Manager",
    excerpt: "Architecting a productivity application from scratch: Database schemas, local storage strategies, and state management.",
    category: "Project Breakdowns",
    readTime: "10 min read",
    date: "April 02, 2026",
  }
];

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
      { name: "ChatGPT", icon: SiOpenai, url: "https://chatgpt.com", color: "#10a37f", description: "Research, brainstorming, and learning" },
      { name: "Claude", icon: SiAnthropic, url: "https://claude.ai", color: "#d97757", description: "Deep analysis and structured thinking" },
      { name: "Gemini", icon: SiGooglegemini, url: "https://gemini.google.com", color: "#8e75ff", description: "Research and exploration" },
    ]
  },
  {
    category: "Development",
    items: [
      { name: "CodePen", icon: SiCodepen, url: "https://codepen.io", color: "#ffffff", description: "Frontend experiments and prototypes" },
      { name: "Windsurf", icon: Terminal, url: "https://windsurf.com", color: "#3b82f6", description: "Development workflow" },
      { name: "Vercel", icon: SiVercel, url: "https://vercel.com", color: "#ffffff", description: "Deployment and hosting" },
      { name: "B12", icon: Layout, url: "https://b12.io", color: "#8b5cf6", description: "Website creation" },
    ]
  },
  {
    category: "Productivity",
    items: [
      { name: "Notion", icon: SiNotion, url: "https://www.notion.so", color: "#ffffff", description: "Knowledge management" },
      { name: "Todoist", icon: SiTodoist, url: "https://todoist.com", color: "#e44332", description: "Task management" }
    ]
  }
];
