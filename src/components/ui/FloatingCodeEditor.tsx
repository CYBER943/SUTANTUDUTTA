import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Terminal, FileCode2, Palette, Database, Sparkles, GitCommit, Settings, Code2 } from 'lucide-react';

const MAIN_SNIPPETS = [
  {
    title: "App.tsx",
    icon: FileCode2,
    lang: "tsx",
    code: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero, Projects, Contact } from '@/components';
import { initializeAI } from '@/lib/ai-core';

export default function Portfolio() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize AI models and prepare scene
    initializeAI().then(() => setIsReady(true));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Hero />
            <Projects />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}`
  },
  {
    title: "server.ts",
    icon: FileCode2,
    lang: "ts",
    code: `import express from 'express';
import { connectDB } from './db/config';
import { aiRouter } from './routes/ai';
import { errorHandler } from './middleware/error';

const app = express();
app.use(express.json());

// Mount AI capabilities
app.use('/api/v1/ai', aiRouter);

// Global error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log('🤖 Neural engine initialized');
});`
  },
  {
    title: "ai_engine.py",
    icon: Sparkles,
    lang: "ts",
    code: `import os
from google.genai import GenerativeModel
from typing import List, Dict

class NeuralEngine:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        self.model = GenerativeModel('gemini-2.5-pro')
        
    async def process_intent(self, prompt: str) -> Dict:
        """Analyzes user intent and generates a semantic response."""
        response = await self.model.generate_content_async(
            contents=[
                {"role": "system", "parts": [{"text": "You are a senior AI architect."}]},
                {"role": "user", "parts": [{"text": prompt}]}
            ]
        )
        return {
            "status": "success",
            "confidence": 0.98,
            "result": response.text
        }

engine = NeuralEngine()`
  }
];

const BG_SNIPPETS = [
  {
    title: "schema.prisma",
    icon: Database,
    lang: "css",
    code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}

enum Role {
  USER
  ADMIN
}`
  },
  {
    title: "index.html",
    icon: Code2,
    lang: "tsx",
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sutantu Dutta | Portfolio</title>
    <meta name="description" content="Software Engineer & AI Enthusiast" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>
  <body class="bg-black text-white antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
  },
  {
    title: "styles.css",
    icon: Palette,
    lang: "css",
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-panel {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }
  
  .neon-glow {
    @apply shadow-[0_0_30px_rgba(220,38,38,0.4)];
  }
  
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r 
           from-app-primary via-red-500 to-orange-500;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
}`
  }
];

const TERMINAL_SNIPPETS = [
  {
    title: "Terminal",
    icon: Terminal,
    lang: "bash",
    code: `$ npm install @google/genai framer-motion tailwindcss
added 142 packages, and audited 143 packages in 3s

$ npm run dev
> portfolio@1.0.0 dev
> next dev

ready - started server on 0.0.0.0:3000
event - compiled client and server successfully in 1250 ms
wait  - compiling...
event - compiled client and server successfully in 152 ms`
  },
  {
    title: "Git",
    icon: GitCommit,
    lang: "bash",
    code: `$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   src/components/ui/FloatingCodeEditor.tsx

$ git add .
$ git commit -m "feat: implement cinematic 3D floating editor workspace"
[main 8f3a1c2] feat: implement cinematic 3D floating editor workspace
 1 file changed, 256 insertions(+), 42 deletions(-)

$ git push origin main
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 1.8 KiB | 1.80 MiB/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To github.com:Sdm940/portfolio.git
   a1b2c3d..8f3a1c2  main -> main`
  },
  {
    title: "Deploy",
    icon: Terminal,
    lang: "bash",
    code: `Running workflow: Deploy to Production

[1/4] Setup Node.js environment... ✓
[2/4] Install dependencies (npm ci)... ✓
[3/4] Build application (npm run build)... ✓
      Creating an optimized production build...
      Compiled successfully.
      
      Route (pages)                              Size     First Load JS
      ┌ ● /                                      4.2 kB         85.1 kB
      ├   /_app                                  0 B            80.9 kB
      └ ○ /404                                   182 B          81.1 kB
      
[4/4] Deploying to Vercel... ✓
      
Production deployment successful!
URL: https://sutantudutta.com`
  }
];

const useTypingEffect = (snippets: any[], speed: number = 25, delay: number = 0) => {
  const [displayed, setDisplayed] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActiveLine, setIsActiveLine] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    let isDeleting = false;
    let isActive = true;

    const type = () => {
      if (!isActive) return;

      const currentText = snippets[currentIndex].code;

      if (!isDeleting) {
        if (charIndex <= currentText.length) {
          setDisplayed(currentText.slice(0, charIndex));
          
          const lines = currentText.slice(0, charIndex).split('\n');
          setIsActiveLine(lines.length - 1);
          
          charIndex++;
          
          let delayTime = speed + Math.random() * 20;
          if (charIndex > 0 && charIndex <= currentText.length) {
             const lastChar = currentText[charIndex - 1];
             if (lastChar === '\n') delayTime = speed * 15 + Math.random() * 200;
             else if (lastChar === ' ') delayTime = speed * 2 + Math.random() * 50;
             else if (lastChar === '{' || lastChar === '}') delayTime = speed * 5;
          }
          timeout = setTimeout(type, delayTime);
        } else {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 4000); // pause at end of file
        }
      } else {
        const deleteTo = 0; 
        if (charIndex > deleteTo) {
          setDisplayed(currentText.slice(0, charIndex));
          const lines = currentText.slice(0, charIndex).split('\n');
          setIsActiveLine(lines.length - 1);
          
          charIndex -= 3; // delete fast
          timeout = setTimeout(type, speed / 3);
        } else {
          isDeleting = false;
          setCurrentIndex((prev) => (prev + 1) % snippets.length);
          charIndex = 0;
          timeout = setTimeout(type, 1000); // pause before next file
        }
      }
    };

    timeout = setTimeout(type, delay);
    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [snippets, speed, delay, currentIndex]);

  return { displayed, snippet: snippets[currentIndex], activeLine: isActiveLine };
};

const highlightCode = (code: string, lang: string) => {
  let h = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (lang === 'tsx' || lang === 'ts' || lang === 'js') {
    h = h.replace(/\b(import|from|const|let|var|function|return|export|default|async|await|new|if|else|for|while|class|def)\b/g, '##KW##$1##END##');
    h = h.replace(/(&lt;\/?)([a-zA-Z0-9.-]+)/g, '$1##TAG##$2##END##');
    h = h.replace(/([a-zA-Z-]+)=/g, '##ATTR##$1##END##=');
    h = h.replace(/(".*?"|'.*?'|`.*?`)/g, '##STR##$1##END##');
    h = h.replace(/\b(\d+)\b/g, '##NUM##$1##END##');
    h = h.replace(/([a-zA-Z0-9_]+)\s*\(/g, '##FUNC##$1##END##(');
  } else if (lang === 'css') {
    h = h.replace(/([a-zA-Z0-9.-]+)\s*\{/g, '##SEL##$1##END## {');
    h = h.replace(/([a-zA-Z-]+):/g, '##PROP##$1##END##:');
    h = h.replace(/:\s*([^;]+);/g, ': ##VAL##$1##END##;');
    h = h.replace(/(".*?"|'.*?'|`.*?`)/g, '##STR##$1##END##');
    h = h.replace(/\b(model|enum|datasource|generator|provider|url|String|Int|Boolean|DateTime|@id|@default|@unique|@relation)\b/g, '##KW##$1##END##');
  } else if (lang === 'bash') {
    h = h.replace(/^\$\s(.*)$/gm, '##PROMPT##$##END## ##CMD##$1##END##');
    h = h.replace(/^&gt;\s(.*)$/gm, '##MUTED##&gt; $1##END##');
    h = h.replace(/(ready|event|added|Deploying|Build|Compiled|successful|✓)(.*)/gi, '##SUCCESS##$1$2##END##');
  }

  h = h.replace(/##TAG##(.*?)##END##/g, '<span class="text-[#e06c75]">$1</span>');
  h = h.replace(/##ATTR##(.*?)##END##/g, '<span class="text-[#d19a66]">$1</span>');
  h = h.replace(/##STR##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');
  h = h.replace(/##SEL##(.*?)##END##/g, '<span class="text-[#e5c07b]">$1</span>');
  h = h.replace(/##PROP##(.*?)##END##/g, '<span class="text-[#56b6c2]">$1</span>');
  h = h.replace(/##VAL##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');
  h = h.replace(/##KW##(.*?)##END##/g, '<span class="text-[#c678dd]">$1</span>');
  h = h.replace(/##NUM##(.*?)##END##/g, '<span class="text-[#d19a66]">$1</span>');
  h = h.replace(/##FUNC##(.*?)##END##/g, '<span class="text-[#61afef]">$1</span>');
  h = h.replace(/##PROMPT##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');
  h = h.replace(/##CMD##(.*?)##END##/g, '<span class="text-[#61afef]">$1</span>');
  h = h.replace(/##MUTED##(.*?)##END##/g, '<span class="text-gray-500">$1</span>');
  h = h.replace(/##SUCCESS##(.*?)##END##/g, '<span class="text-[#98c379]">$1</span>');

  return h;
};

const EditorWindow = ({ snippets, delay = 0, className = "", animateTyping = true, blurred = false, opacity = 1 }: { snippets: any[], delay?: number, className?: string, animateTyping?: boolean, blurred?: boolean, opacity?: number }) => {
  const { displayed, snippet, activeLine } = animateTyping 
    ? useTypingEffect(snippets, 30, delay) 
    : { displayed: snippets[0].code, snippet: snippets[0], activeLine: -1 };
    
  const highlighted = highlightCode(displayed, snippet.lang);
  const lines = displayed.split('\\n');
  const scrollRef = useRef<HTMLDivElement>(null);
  const Icon = snippet.icon;

  useEffect(() => {
    if (animateTyping && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayed, animateTyping]);

  return (
    <div 
      className={`group flex flex-col bg-[#0d1117]/95 backdrop-blur-xl sm:backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_0_50px_rgba(220,38,38,0.15)] ${className}`}
      style={{ opacity, filter: blurred ? 'blur(3px)' : 'none' }}
    >
      {/* Mac-like header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.5)] transition-colors hover:bg-[#ff5f56]/80" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.5)] transition-colors hover:bg-[#ffbd2e]/80" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.5)] transition-colors hover:bg-[#27c93f]/80" />
        </div>
        
        {/* File tabs */}
        <div className="flex items-center absolute left-1/2 -translate-x-1/2">
           <div className="flex items-center space-x-2 text-xs font-medium text-white/90 bg-white/[0.05] border border-white/[0.05] px-4 py-1.5 rounded-lg shadow-sm">
             <Icon size={14} className="text-app-primary" />
             <span>{snippet.title}</span>
           </div>
        </div>
        
        <div className="flex items-center space-x-2 text-white/30">
           <Settings size={14} className="hover:text-white/80 cursor-pointer transition-colors" />
        </div>
      </div>
      
      {/* Editor Body */}
      <div ref={scrollRef} className="p-4 flex-1 overflow-y-auto scrollbar-hide relative flex font-mono text-[13px] md:text-[14px] leading-6">
        {/* Line Numbers */}
        {snippet.lang !== 'bash' && (
          <div className="flex-none w-10 flex flex-col items-center text-white/20 select-none pr-3 border-r border-white/5 mr-4">
            {lines.map((_, i) => (
              <div key={i} className={`h-6 w-full text-right transition-colors ${activeLine === i ? 'text-white/60' : ''}`}>
                {i + 1}
              </div>
            ))}
          </div>
        )}
        
        {/* Code Content */}
        <div className="flex-1 whitespace-pre-wrap relative">
           {/* Active line background */}
           {snippet.lang !== 'bash' && activeLine >= 0 && (
             <div 
               className="absolute -left-4 -right-4 h-6 bg-white/[0.03] pointer-events-none transition-all duration-100 border-l-2 border-app-primary" 
               style={{ top: `${activeLine * 24}px` }} 
             />
           )}
           <span dangerouslySetInnerHTML={{ __html: highlighted }} className="relative z-10" />
           {animateTyping && <span className="inline-block w-2.5 h-5 ml-0.5 bg-app-primary animate-pulse align-middle relative z-10 shadow-[0_0_8px_var(--color-app-primary)] -mt-1" />}
        </div>
      </div>
    </div>
  );
};

export default function FloatingCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const moveX1 = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  
  const moveX2 = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [10, -10]);
  
  const moveX3 = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const moveY3 = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center rounded-[2rem] overflow-visible perspective-1000 group">
       
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="hidden sm:block w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px]" />
          <div className="hidden sm:block absolute w-[300px] h-[300px] bg-app-primary/15 rounded-full blur-[80px] translate-x-[100px] translate-y-[50px]" />
       </div>
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none rounded-[2rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

       {/* Background Editor (Schema/HTML/CSS) */}
       <motion.div style={{ x: moveX2, y: moveY2 }} className="absolute z-10 hidden lg:block w-[450px] right-[5%] top-[10%]">
         <motion.div animate={{ y: [0, -10, 0], rotate: [-1, 0, -1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
           <EditorWindow snippets={BG_SNIPPETS} animateTyping={true} blurred={true} opacity={0.6} className="h-[380px]" delay={2000} />
         </motion.div>
       </motion.div>

       {/* Main Editor (React/Node/Python) */}
       <motion.div style={{ x: moveX1, y: moveY1 }} className="absolute z-30 w-full sm:w-[85%] md:w-[600px] lg:w-[650px] left-0 sm:left-[2%] md:left-[5%] lg:left-[5%] shadow-none sm:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
         <motion.div animate={{ y: [0, -12, 0], rotate: [0.5, -0.5, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
           <EditorWindow snippets={MAIN_SNIPPETS} className="h-[420px] md:h-[500px] rounded-none sm:rounded-2xl border-l-0 border-r-0 sm:border-l sm:border-r" delay={500} />
         </motion.div>
       </motion.div>

       {/* Terminal */}
       <motion.div style={{ x: moveX3, y: moveY3 }} className="absolute z-40 hidden md:block w-[380px] right-[5%] lg:right-[8%] bottom-[5%] lg:bottom-[8%] shadow-[0_0_30px_rgba(0,0,0,0.6)]">
         <motion.div animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
           <EditorWindow snippets={TERMINAL_SNIPPETS} className="h-[240px]" delay={1500} />
         </motion.div>
       </motion.div>

    </div>
  );
}
