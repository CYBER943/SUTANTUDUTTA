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
  BookOpen,
  Codepen,
  PenTool,
  Palette,
  Figma,
  Github,
  Box,
  GraduationCap,
  Book
} from 'lucide-react';
import { DevinIcon, B12Icon, GrokIcon, NoteGPTIcon, GoogleAIStudioIcon, WindsurfIcon } from './components/icons/CustomIcons';
import { Project, ToolItem, BlogPost, TimelineEvent, CurrentInterest, LearningSkill, ProjectCategoryData } from './types';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 1, year: "The Spark", title: "Learning Programming", description: "Began my journey into code, fascinated by the idea of creating something from nothing." },
  { id: 2, year: "Exploration", title: "Exploring Web Development", description: "Dove into building websites, turning static concepts into interactive digital experiences." },
  { id: 3, year: "Discovery", title: "Discovering AI", description: "Realized the potential of Artificial Intelligence and started integrating it into my projects." },
  { id: 4, year: "Creation", title: "Building Projects", description: "Focused on hands-on learning, creating numerous tools, applications, and experiments." },
  { id: 5, year: "Evolution", title: "Continuous Improvement", description: "Constantly exploring new technologies, refining my skills, and pushing the boundaries of what I can build." }
];

export const CURRENT_INTERESTS: CurrentInterest[] = [
  { id: 1, title: "Vibe Coding", icon: Terminal, status: "ACTIVE" },
  { id: 2, title: "Academics", icon: GraduationCap, status: "FOCUSING" },
  { id: 3, title: "Learning", icon: BookOpen, status: "EXPLORING" },
  { id: 4, title: "Reading Books", icon: Book, status: "READING" },
  { id: 5, title: "AI Development", icon: Bot, status: "BUILDING" }
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

export const BLOG_CATEGORIES = ["All", "AI", "Web Development", "Vibe Coding", "Learning", "Projects", "Productivity"];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Vibe Coding: The Future of Developer Productivity",
    excerpt: "Exploring how natural language interfaces and agentic IDEs are changing how we build software.",
    date: "Sep 12, 2026",
    readTime: "5 min read",
    category: "Vibe Coding",
    image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Balancing Academics and Software Development",
    excerpt: "How I manage my time as a Class 10 student while actively building AI-powered web applications.",
    date: "Aug 28, 2026",
    readTime: "4 min read",
    category: "Learning",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Building Interactive Experiences with Framer Motion",
    excerpt: "A deep dive into creating buttery-smooth animations and premium micro-interactions in React 19.",
    date: "Aug 15, 2026",
    readTime: "7 min read",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Integrating the Gemini API into Modern Web Apps",
    excerpt: "Practical patterns for leveraging Google's Gemini models to build intelligent, context-aware features.",
    date: "Jul 30, 2026",
    readTime: "6 min read",
    category: "AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
  }
];

export const PROJECTS: Project[] = [
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
];

export const TOOLS: ToolItem[] = [
  { name: "Visual Studio Code", icon: Code2, url: "https://code.visualstudio.com", color: "#007ACC", description: "Primary code editor for development and debugging.", category: "Development", experienceLevel: "Expert", usageFrequency: "Daily" },
  { name: "Devin", icon: DevinIcon, url: "https://devin.ai", color: "#ffffff", description: "AI software engineering assistant for development workflows.", category: "AI", experienceLevel: "Advanced", usageFrequency: "Daily" },
  { name: "Windsurf", icon: WindsurfIcon, url: "https://codeium.com/windsurf", color: "#00E5FF", description: "The world's first agentic IDE.", category: "Development", experienceLevel: "Advanced", usageFrequency: "Daily" },
  { name: "CodePen", icon: Codepen, url: "https://codepen.io", color: "#ffffff", description: "Frontend experimentation and rapid prototyping.", category: "Development", experienceLevel: "Expert", usageFrequency: "Weekly" },
  { name: "GitHub", icon: Github, url: "https://github.com", color: "#ffffff", description: "Version control, collaboration, and project hosting.", category: "Development", experienceLevel: "Advanced", usageFrequency: "Daily" },
  { name: "Vercel", icon: Triangle, url: "https://vercel.com", color: "#ffffff", description: "Deployment, hosting, and performance optimization.", category: "Development", experienceLevel: "Advanced", usageFrequency: "Weekly" },
  { name: "B12.io", icon: B12Icon, url: "https://www.b12.io", color: "#5048C7", description: "Website creation and business website management.", category: "Development", experienceLevel: "Intermediate", usageFrequency: "Occasionally" },
  { name: "Chrome", icon: Chrome, url: "https://www.google.com/chrome/", color: "#4285F4", description: "Web browsing and development tools.", category: "Productivity", experienceLevel: "Expert", usageFrequency: "Daily" },
  { name: "Figma", icon: Figma, url: "https://www.figma.com", color: "#F24E1E", description: "UI/UX design and prototyping.", category: "Creative", experienceLevel: "Advanced", usageFrequency: "Weekly" },
  { name: "Adobe", icon: PenTool, url: "https://www.adobe.com", color: "#FF0000", description: "Creative suite for digital assets.", category: "Creative", experienceLevel: "Intermediate", usageFrequency: "Occasionally" },
  { name: "Canva", icon: Palette, url: "https://www.canva.com", color: "#00C4CC", description: "Quick graphic design and layout creation.", category: "Creative", experienceLevel: "Advanced", usageFrequency: "Weekly" },
  { name: "Adobe Express", icon: Palette, url: "https://new.express.adobe.com", color: "#EB0F29", description: "Quick graphic design and layout creation.", category: "Creative", experienceLevel: "Advanced", usageFrequency: "Weekly" },
  { name: "ChatGPT", icon: MessageSquare, url: "https://chatgpt.com", color: "#10a37f", description: "Coding, research, learning, and problem solving.", category: "AI", experienceLevel: "Expert", usageFrequency: "Daily" },
  { name: "Claude", icon: BrainCircuit, url: "https://claude.ai", color: "#d97757", description: "Reasoning, writing, and structured analysis.", category: "AI", experienceLevel: "Advanced", usageFrequency: "Daily" },
  { name: "Microsoft Copilot", icon: Bot, url: "https://copilot.microsoft.com", color: "#0078D4", description: "AI-powered coding assistance and productivity.", category: "AI", experienceLevel: "Advanced", usageFrequency: "Weekly" },
  { name: "Gemini", icon: Sparkles, url: "https://gemini.google.com", color: "#8e75ff", description: "AI research, multimodal assistance, and ideation.", category: "AI", experienceLevel: "Advanced", usageFrequency: "Daily" },
  { name: "Google AI Studio", icon: GoogleAIStudioIcon, url: "https://aistudio.google.com", color: "#4285F4", description: "Gemini API development, prompt engineering, and AI prototyping.", category: "AI", experienceLevel: "Advanced", usageFrequency: "Weekly" },
  { name: "Grok", icon: GrokIcon, url: "https://grok.com", color: "#ffffff", description: "AI assistant for reasoning, coding, and real-time insights.", category: "AI", experienceLevel: "Intermediate", usageFrequency: "Weekly" },
  { name: "NoteGPT", icon: NoteGPTIcon, url: "https://notegpt.io", color: "#10B981", description: "AI-powered note-taking, summarization, and learning.", category: "AI", experienceLevel: "Intermediate", usageFrequency: "Occasionally" },
    { name: "Todoist", icon: CheckSquare, url: "https://todoist.com", color: "#e44332", description: "Task management and productivity.", category: "Productivity", experienceLevel: "Advanced", usageFrequency: "Daily" },
  { name: "Dropbox", icon: Box, url: "https://www.dropbox.com", color: "#0061FF", description: "Cloud storage, synchronization, backup, and file sharing.", category: "Productivity", experienceLevel: "Advanced", usageFrequency: "Daily" }
];
