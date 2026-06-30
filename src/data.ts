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
  SiGmail,
  SiGithub,
  SiDropbox
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { DevinIcon, B12Icon, GrokIcon, NoteGPTIcon, GoogleAIStudioIcon } from './components/icons/CustomIcons';
import { Project, ToolItem, BlogPost, TimelineEvent, CurrentInterest, LearningSkill, ProjectCategoryData } from './types';

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

export const CURRENT_INTERESTS: CurrentInterest[] = [
  { id: 1, title: "Advanced JavaScript", icon: Code2, status: "Active" },
  { id: 2, title: "Three.js", icon: Sparkles, status: "Exploring" },
  { id: 3, title: "AI Development", icon: Bot, status: "Building" },
  { id: 4, title: "Performance Optimization", icon: Zap, status: "Refining" },
  { id: 5, title: "Modern Web Animations", icon: Layout, status: "Ideating" }
];

export const LEARNING_SKILLS: LearningSkill[] = [
  { id: 1, title: "Interaction Design", description: "Crafting fluid animations with Framer Motion and GSAP.", icon: Layout },
  { id: 2, title: "Frontend Architecture", description: "Structuring scalable React and Next.js applications.", icon: Code2 },
  { id: 3, title: "Spatial Computing", description: "Experimenting with 3D environments using Three.js and WebGL.", icon: BrainCircuit },
  { id: 4, title: "Performance Tuning", description: "Optimizing Core Web Vitals and Lighthouse metrics.", icon: Cpu },
  { id: 5, title: "Generative AI", description: "Integrating LLMs to build intelligent web experiences.", icon: Sparkles }
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
    featured: true
  },
  {
    id: 2,
    title: "Glassmorphic Dashboard",
    description: "An interactive dashboard visualizing real-time metrics with a sleek, translucent glassmorphism aesthetic.",
    category: "Web Applications",
    tech: ["React", "CSS", "Framer Motion"],
    link: "https://codepen.io/SUDANTU-HOLDINGS/pen/emgWgYJ",
    featured: true
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
  { name: "Visual Studio Code", icon: VscVscode, url: "https://code.visualstudio.com", color: "#007ACC", description: "Primary code editor for development and debugging." },
  { name: "Devin", icon: DevinIcon, url: "https://devin.ai", color: "#ffffff", description: "AI software engineering assistant for development workflows." },
  { name: "CodePen", icon: SiCodepen, url: "https://codepen.io", color: "#ffffff", description: "Frontend experimentation and rapid prototyping." },
  { name: "GitHub", icon: SiGithub, url: "https://github.com", color: "#ffffff", description: "Version control, collaboration, and project hosting." },
  { name: "Vercel", icon: SiVercel, url: "https://vercel.com", color: "#ffffff", description: "Deployment, hosting, and performance optimization." },
  { name: "B12.io", icon: B12Icon, url: "https://www.b12.io", color: "#8b5cf6", description: "Website creation and business website management." },
  { name: "ChatGPT", icon: SiOpenai, url: "https://chatgpt.com", color: "#10a37f", description: "Coding, research, learning, and problem solving." },
  { name: "Claude", icon: SiAnthropic, url: "https://claude.ai", color: "#d97757", description: "Reasoning, writing, and structured analysis." },
  { name: "Microsoft Copilot", icon: SiGithubcopilot, url: "https://copilot.microsoft.com", color: "#0078D4", description: "AI-powered coding assistance and productivity." },
  { name: "Gemini", icon: SiGooglegemini, url: "https://gemini.google.com", color: "#8e75ff", description: "AI research, multimodal assistance, and ideation." },
  { name: "Google AI Studio", icon: GoogleAIStudioIcon, url: "https://aistudio.google.com", color: "#4285F4", description: "Gemini API development, prompt engineering, and AI prototyping." },
  { name: "Grok", icon: GrokIcon, url: "https://grok.com", color: "#ffffff", description: "AI assistant for reasoning, coding, and real-time insights." },
  { name: "NoteGPT", icon: NoteGPTIcon, url: "https://notegpt.io", color: "#10B981", description: "AI-powered note-taking, summarization, and learning." },
  { name: "Notion", icon: SiNotion, url: "https://www.notion.so", color: "#ffffff", description: "Knowledge management, documentation, and planning." },
  { name: "Todoist", icon: SiTodoist, url: "https://todoist.com", color: "#e44332", description: "Task management and productivity." },
  { name: "Dropbox", icon: SiDropbox, url: "https://www.dropbox.com", color: "#0061FF", description: "Cloud storage, synchronization, backup, and file sharing." }
];
