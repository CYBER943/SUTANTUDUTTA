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
  SiTodoist,
  SiGmail
} from 'react-icons/si';
import { Project, ToolCategory, ToolItem, BlogPost, TimelineEvent, CaseStudy, CurrentInterest, LearningSkill, ProjectCategoryData } from './types';

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
    title: "Cyberpunk Portfolio Concept",
    category: "Frontend Engineering",
    situation: "Portfolios often lack memorable interactivity, leading to low engagement from recruiters and peers.",
    task: "Design a visually compelling, highly interactive portfolio concept capturing a distinct cyberpunk aesthetic while maintaining performance.",
    action: "Leveraged GSAP for complex timeline animations and smooth scrolling. Implemented a robust dark-mode glassmorphism system using CSS blending and variables.",
    result: "Achieved a buttery-smooth 60fps interactive experience that significantly increased average session time and user engagement.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"]
  },
  {
    id: 2,
    title: "Glassmorphic Dashboard",
    category: "UI Architecture",
    situation: "Modern analytics dashboards can feel cluttered and overwhelming, making data hard to digest.",
    task: "Build a sleek, translucent UI concept that highlights data without distracting the user with heavy bounding boxes.",
    action: "Utilized Framer Motion for micro-interactions and Tailwind CSS for rapid styling of complex backdrop blurs and layered transparency.",
    result: "Created a highly readable, premium visualization interface that balances aesthetic flair with functional data display.",
    technologies: ["React", "Framer Motion", "CSS"]
  }
];

export const CURRENT_INTERESTS: CurrentInterest[] = [
  { id: 1, title: "Advanced JavaScript", icon: Code2, status: "Active" },
  { id: 2, title: "Three.js", icon: Sparkles, status: "Exploring" },
  { id: 3, title: "AI Development", icon: Bot, status: "Building" },
  { id: 4, title: "Performance Optimization", icon: Zap, status: "Refining" },
  { id: 5, title: "Modern Web Animations", icon: Layout, status: "Ideating" }
];

export const LEARNING_SKILLS: LearningSkill[] = [
  { id: 1, title: "React & Next.js", level: 90, icon: Code2 },
  { id: 2, title: "Framer Motion & GSAP", level: 85, icon: Layout },
  { id: 3, title: "Three.js & WebGL", level: 75, icon: BrainCircuit },
  { id: 4, title: "Tailwind CSS", level: 88, icon: Zap },
  { id: 5, title: "Performance Tuning", level: 70, icon: Cpu },
  { id: 6, title: "Generative AI API", level: 95, icon: CheckSquare }
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
    title: "Cyberpunk Portfolio Concept",
    description: "A premium, modern interactive experience highlighting micro-interactions, dark mode aesthetics, and glassmorphism.",
    category: "UI/UX Concepts",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
    link: "https://codepen.io/SDM-TECH-KNOW/pen/pvRRXbE",
  },
  {
    id: 2,
    title: "Glassmorphic Dashboard",
    description: "An interactive dashboard visualizing real-time metrics with a sleek, translucent glassmorphism aesthetic.",
    category: "Web Applications",
    tech: ["React", "CSS", "Framer Motion"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/emgWgYJ",
  },
  {
    id: 3,
    title: "Interactive Particle Simulation",
    description: "A high-performance particle system rendering thousands of points interacting with mouse movements.",
    category: "AI Experiments",
    tech: ["Canvas API", "JavaScript", "Math"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/ogYpyoZ",
  },
  {
    id: 4,
    title: "3D WebGL Visualization",
    description: "Sleek, immersive 3D scene built to showcase modern web technologies and spatial design.",
    category: "UI/UX Concepts",
    tech: ["Three.js", "WebGL", "JavaScript"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/WborpVV",
  }
];

export const TOOLS: ToolItem[] = [
  { name: "ChatGPT", icon: SiOpenai, url: "https://chatgpt.com", color: "#10a37f", description: "Research, learning, brainstorming, and development assistance." },
  { name: "Claude", icon: SiAnthropic, url: "https://claude.ai", color: "#d97757", description: "Deep analysis, reasoning, and structured thinking." },
  { name: "Gemini", icon: SiGooglegemini, url: "https://gemini.google.com", color: "#8e75ff", description: "Research, exploration, and AI-powered insights." },
  { name: "Microsoft Copilot", icon: SiGithubcopilot, url: "https://github.com/features/copilot", color: "#0078D4", description: "Coding assistance and productivity." },
  { name: "Grok", icon: Bot, url: "https://grok.x.ai", color: "#ffffff", description: "Research and real-time exploration." },
  { name: "NoteGPT", icon: FileText, url: "https://notegpt.io", color: "#10B981", description: "Summarization and learning support." },
  { name: "CodePen", icon: SiCodepen, url: "https://codepen.io", color: "#ffffff", description: "Frontend experiments and UI prototyping." },
  { name: "Windsurf", icon: Terminal, url: "https://windsurf.com", color: "#3b82f6", description: "AI-powered coding workflow." },
  { name: "Vercel", icon: SiVercel, url: "https://vercel.com", color: "#ffffff", description: "Deployment and hosting." },
  { name: "B12.io", icon: Layout, url: "https://b12.io", color: "#8b5cf6", description: "Website building and business solutions." },
  { name: "Google Chrome", icon: SiGooglechrome, url: "https://google.com/chrome", color: "#4285F4", description: "Development, testing, and research." },
  { name: "Notion", icon: SiNotion, url: "https://www.notion.so", color: "#ffffff", description: "Knowledge management and organization." },
  { name: "Todoist", icon: SiTodoist, url: "https://todoist.com", color: "#e44332", description: "Task management and productivity." },
  { name: "Outlook", icon: Mail, url: "https://outlook.com", color: "#0078D4", description: "Professional communication." },
  { name: "Gmail", icon: SiGmail, url: "https://gmail.com", color: "#ea4335", description: "Personal and educational communication." }
];
