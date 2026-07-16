export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  link: string;
  github?: string;
  codepen?: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  challenges?: string;
  results?: string;
  performanceMetrics?: string[];
  lessonsLearned?: string;
}

export interface ToolItem {
  name: string;
  icon: any; // Lucide or React Icon reference
  url?: string;
  color?: string;
  description?: string;
  category?: 'Development' | 'AI' | 'Creative' | 'Productivity';
  experienceLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  usageFrequency?: 'Daily' | 'Weekly' | 'Occasionally';
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

export interface CurrentInterest {
  id: number;
  title: string;
  icon: any;
  status: string;
}

export interface LearningSkill {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export interface ProjectCategoryData {
  id: number;
  title: string;
  count: number;
  description: string;
  icon: any;
}
