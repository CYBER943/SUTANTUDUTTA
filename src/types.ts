export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  link: string;
}

export interface ToolItem {
  name: string;
  icon: any; // Lucide or React Icon reference
  url?: string;
  color?: string;
  description?: string;
}

export interface ToolCategory {
  category: string;
  items: ToolItem[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  image?: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  challenges: string;
  learnings: string;
}

export interface CurrentInterest {
  id: number;
  title: string;
  icon: any;
  status: string;
}

export interface LearningSkill {
  id: number;
  title: string;
  level: number;
  icon: any;
}

export interface ProjectCategoryData {
  id: number;
  title: string;
  count: number;
  description: string;
  icon: any;
}
