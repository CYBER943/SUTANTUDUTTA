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
