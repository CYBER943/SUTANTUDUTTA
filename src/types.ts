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
  icon: any; // Lucide icon reference
}

export interface ToolCategory {
  category: string;
  items: ToolItem[];
}
