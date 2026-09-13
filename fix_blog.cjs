const fs = require('fs');
const content = fs.readFileSync('src/data.ts', 'utf8');

// Update BLOG_CATEGORIES
const categoriesIndex = content.indexOf('export const BLOG_CATEGORIES =');
const postsIndex = content.indexOf('export const BLOG_POSTS: BlogPost[] =');

if (categoriesIndex !== -1 && postsIndex !== -1) {
  const newCategories = `export const BLOG_CATEGORIES = ["All", "AI", "Web Development", "Vibe Coding", "Learning", "Projects", "Productivity"];\n\n`;
  const newPosts = `export const BLOG_POSTS: BlogPost[] = [
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
];\n`;
  
  // Need to find where the next export is after BLOG_POSTS to replace it properly
  const toolsIndex = content.indexOf('export const TOOLS: ToolItem[] =');
  if (toolsIndex !== -1) {
     const beforeCategories = content.substring(0, categoriesIndex);
     const afterPosts = content.substring(toolsIndex);
     fs.writeFileSync('src/data.ts', beforeCategories + newCategories + newPosts + '\n' + afterPosts);
  }
}
