import fs from 'fs';
import path from 'path';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  link: string;
  codepen?: string;
  github?: string;
  image?: string;
  featured?: boolean;
  order?: number;
  createdAt: string;
}

export interface BlogPostItem {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  published: boolean;
  createdAt: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
  starred: boolean;
  browser?: string;
  os?: string;
  ip?: string;
}

export interface SiteSettings {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  codepen: string;
  linkedin: string;
  statusText: string;
  statusAvailable: boolean;
  announcement: {
    enabled: boolean;
    badge: string;
    message: string;
    linkText?: string;
    linkUrl?: string;
  };
}

export interface AuditLogItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  ip?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  recoveryKeyHash: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface DatabaseSchema {
  admin: AdminUser | null;
  settings: SiteSettings;
  projects: ProjectItem[];
  blog: BlogPostItem[];
  messages: ContactMessageItem[];
  auditLogs: AuditLogItem[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio-admin.json');

// Default initial data matching Sutantu Dutta's existing portfolio
const DEFAULT_DATA: DatabaseSchema = {
  admin: null,
  settings: {
    name: "Sutantu Dutta",
    role: "AI DEVELOPER",
    tagline: "LEARNING. BUILDING. EXPERIMENTING.",
    bio: "Class 10 student developer, AI enthusiast, vibe coder, and creative builder passionate about crafting delightful interactive software.",
    location: "India",
    email: "sutantudutta@outlook.com",
    github: "https://github.com/Sdm940",
    codepen: "https://codepen.io/SDM-TECH-KNOW",
    linkedin: "https://www.linkedin.com/in/sutantu-dutta-176a2442a/",
    statusText: "Open to Collaborations",
    statusAvailable: true,
    announcement: {
      enabled: false,
      badge: "NEW",
      message: "Exploring Gemini 2.5 & Vibe Coding experiments on CodePen!",
      linkText: "View Experiments",
      linkUrl: "#projects"
    }
  },
  projects: [
    {
      id: 1,
      title: "Project 1",
      description: "An interactive web development experiment.",
      category: "WEB / EXPERIMENT",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SUDANTU-HOLDINGS/pen/MYjqxLm",
      codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/MYjqxLm",
      image: "https://codepen.io/SUDANTU-HOLDINGS/pen/MYjqxLm/image/large.png",
      featured: true,
      order: 1,
      createdAt: "2026-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Project 2",
      description: "Exploring modern frontend layouts and interactions.",
      category: "WEB / EXPERIMENT",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SUDANTU-HOLDINGS/pen/gbwzPLo",
      codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/gbwzPLo",
      image: "https://codepen.io/SUDANTU-HOLDINGS/pen/gbwzPLo/image/large.png",
      featured: true,
      order: 2,
      createdAt: "2026-01-20T10:00:00Z"
    },
    {
      id: 3,
      title: "Project 3",
      description: "Creative coding and visual effects on the web.",
      category: "WEB / CREATIVE CODING",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SUDANTU-HOLDINGS/pen/RNWVWZQ",
      codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/RNWVWZQ",
      image: "https://codepen.io/SUDANTU-HOLDINGS/pen/RNWVWZQ/image/large.png",
      featured: true,
      order: 3,
      createdAt: "2026-02-01T10:00:00Z"
    },
    {
      id: 4,
      title: "Project 4",
      description: "A polished digital interface built on CodePen.",
      category: "UI / UX",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SUDANTU-HOLDINGS/pen/pvEVVaB",
      codepen: "https://codepen.io/SUDANTU-HOLDINGS/pen/pvEVVaB",
      image: "https://codepen.io/SUDANTU-HOLDINGS/pen/pvEVVaB/image/large.png",
      featured: false,
      order: 4,
      createdAt: "2026-02-10T10:00:00Z"
    },
    {
      id: 5,
      title: "CYBER943",
      description: "A creative web development project and interactive coding experiment created on CodePen.",
      category: "WEB / CREATIVE CODING",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SDM-TECH-KNOW/pen/JoEMqwB",
      codepen: "https://codepen.io/SDM-TECH-KNOW/pen/JoEMqwB",
      image: "https://codepen.io/SDM-TECH-KNOW/pen/JoEMqwB/image/large.png",
      featured: true,
      order: 5,
      createdAt: "2026-02-18T10:00:00Z"
    },
    {
      id: 6,
      title: "MONOPOLY",
      description: "A browser-based Monopoly-inspired game experiment exploring interactive gameplay and web development.",
      category: "GAME / WEB",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SDM-TECH-KNOW/pen/XJpgWdd",
      codepen: "https://codepen.io/SDM-TECH-KNOW/pen/XJpgWdd",
      image: "https://codepen.io/SDM-TECH-KNOW/pen/XJpgWdd/image/large.png",
      featured: true,
      order: 6,
      createdAt: "2026-02-25T10:00:00Z"
    },
    {
      id: 7,
      title: "SD",
      description: "A creative web experiment built to explore interactive design and browser-based development.",
      category: "WEB / EXPERIMENT",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://codepen.io/SDM-TECH-KNOW/pen/XJpRZMv",
      codepen: "https://codepen.io/SDM-TECH-KNOW/pen/XJpRZMv",
      image: "https://codepen.io/SDM-TECH-KNOW/pen/XJpRZMv/image/large.png",
      featured: false,
      order: 7,
      createdAt: "2026-03-01T10:00:00Z"
    }
  ],
  blog: [
    {
      id: 1,
      title: "Vibe Coding: The Future of Developer Productivity",
      excerpt: "Exploring how natural language interfaces and agentic IDEs are changing how we build software.",
      content: `Vibe coding is not just about writing code faster; it is about reshaping the cognitive relationship between the developer and their creation.\n\nWith agentic IDEs like Windsurf, Devin, and Google AI Studio, developers spend less time wrestling with syntax boilerplate and more time iterating on architecture, user experience, and creative intent.\n\nAs a student developer, this shift allows me to build complex applications that previously required large software teams. The key is developing high taste, rapid verification habits, and deep conceptual understanding of the underlying stacks.`,
      date: "Sep 12, 2026",
      readTime: "5 min read",
      category: "Vibe Coding",
      image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=800",
      published: true,
      createdAt: "2026-09-12T10:00:00Z"
    },
    {
      id: 2,
      title: "Balancing Academics and Software Development",
      excerpt: "How I manage my time as a Class 10 student while actively building AI-powered web applications.",
      content: `Balancing school exams, coursework, and daily software experiments requires intentional time-blocking and focus.\n\nHere are my core strategies:\n1. Strict micro-sprints: Focusing on 30-45 minute uninterrupted coding sessions.\n2. Building in public: Sharing experiments on CodePen and GitHub forces me to ship clean, finished pieces.\n3. Linking learning to projects: Applying computer science concepts directly to real apps.\n\nDiscipline turns hobbies into craftsmanship.`,
      date: "Aug 28, 2026",
      readTime: "4 min read",
      category: "Learning",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      published: true,
      createdAt: "2026-08-28T10:00:00Z"
    },
    {
      id: 3,
      title: "Building Interactive Experiences with Framer Motion",
      excerpt: "A deep dive into creating buttery-smooth animations and premium micro-interactions in React 19.",
      content: `Motion on the web should never be gratuitous; it must communicate state, hierarchy, and tactile physical presence.\n\nUsing motion/react with reduced-motion awareness ensures every visitor gets an accessible yet visually stunning journey.\n\nIn this article, we examine spring physics, layout animations, and custom cursor integrations that elevate digital portfolios to studio caliber.`,
      date: "Aug 15, 2026",
      readTime: "7 min read",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      published: true,
      createdAt: "2026-08-15T10:00:00Z"
    },
    {
      id: 4,
      title: "Integrating the Gemini API into Modern Web Apps",
      excerpt: "Practical patterns for leveraging Google's Gemini models to build intelligent, context-aware features.",
      content: `The Gemini API represents a leap in multimodal understanding and long-context capabilities.\n\nIntegrating @google/genai SDK in modern web applications enables real-time reasoning, dynamic content generation, and natural tool calling with minimal latency.\n\nHere is how to structure robust prompt flows and handle streaming responses securely.`,
      date: "Jul 30, 2026",
      readTime: "6 min read",
      category: "AI",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      published: true,
      createdAt: "2026-07-30T10:00:00Z"
    }
  ],
  messages: [
    {
      id: "msg_sample_1",
      name: "Alex Rivera",
      email: "alex@creativeai.studio",
      message: "Hi Sutantu! Loved your creative CodePen projects and portfolio styling. Would love to collaborate on an interactive AI interface experiment.",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: false,
      starred: true,
      browser: "Chrome",
      os: "MacOS",
      ip: "127.0.0.1"
    }
  ],
  auditLogs: [
    {
      id: "audit_init",
      action: "SYSTEM_INITIALIZED",
      details: "Portfolio database initialized with default projects and configuration.",
      timestamp: new Date().toISOString(),
      ip: "system"
    }
  ]
};

class Database {
  private cache: DatabaseSchema | null = null;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (!fs.existsSync(DB_FILE)) {
        this.write(DEFAULT_DATA);
        this.cache = JSON.parse(JSON.stringify(DEFAULT_DATA));
      } else {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.cache = JSON.parse(raw);
        // Merge missing keys if schema evolved
        let updated = false;
        if (!this.cache!.settings) {
          this.cache!.settings = DEFAULT_DATA.settings;
          updated = true;
        }
        if (!Array.isArray(this.cache!.projects)) {
          this.cache!.projects = DEFAULT_DATA.projects;
          updated = true;
        }
        if (!Array.isArray(this.cache!.blog)) {
          this.cache!.blog = DEFAULT_DATA.blog;
          updated = true;
        }
        if (!Array.isArray(this.cache!.messages)) {
          this.cache!.messages = [];
          updated = true;
        }
        if (!Array.isArray(this.cache!.auditLogs)) {
          this.cache!.auditLogs = [];
          updated = true;
        }
        if (updated) {
          this.write(this.cache!);
        }
      }
    } catch (err) {
      console.error('[DB] Failed to initialize database file:', err);
      this.cache = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  }

  public get(): DatabaseSchema {
    if (!this.cache) {
      this.ensureInitialized();
    }
    return this.cache!;
  }

  public write(data: DatabaseSchema): void {
    this.cache = data;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpPath = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tmpPath, DB_FILE);
    } catch (err) {
      console.error('[DB] Failed to write database file:', err);
    }
  }

  public logAudit(action: string, details: string, ip?: string): void {
    const data = this.get();
    const entry: AuditLogItem = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      action,
      details,
      timestamp: new Date().toISOString(),
      ip
    };
    data.auditLogs.unshift(entry);
    if (data.auditLogs.length > 200) {
      data.auditLogs = data.auditLogs.slice(0, 200);
    }
    this.write(data);
  }
}

export const db = new Database();
