import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Procedural Canvas Texture Generators for copyright-free realistic interfaces
function createVSCodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, 512, 340);

  // Left Sidebar (Activity Bar)
  ctx.fillStyle = '#181818';
  ctx.fillRect(0, 0, 40, 340);
  ctx.fillStyle = '#007acc';
  ctx.fillRect(0, 20, 4, 30); // Active indicator
  
  // Sidebar Icons (mock)
  ctx.fillStyle = '#858585';
  ctx.fillRect(12, 25, 16, 16);
  ctx.fillRect(12, 55, 16, 16);
  ctx.fillRect(12, 85, 16, 16);

  // File Explorer Pane
  ctx.fillStyle = '#252526';
  ctx.fillRect(40, 0, 110, 340);
  ctx.fillStyle = '#cccccc';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('EXPLORER', 50, 20);
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#007acc';
  ctx.fillText('⚡ App.tsx', 55, 45);
  ctx.fillStyle = '#858585';
  ctx.fillText('📁 components', 55, 65);
  ctx.fillText('📁 styles', 55, 85);
  ctx.fillText('📄 package.json', 55, 105);

  // Code Area Header Tabs
  ctx.fillStyle = '#2d2d2d';
  ctx.fillRect(150, 0, 362, 30);
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(150, 0, 100, 30); // Active tab
  ctx.fillStyle = '#ffffff';
  ctx.fillText('App.tsx', 165, 18);
  ctx.fillStyle = '#777777';
  ctx.fillText('x', 235, 18);

  // Editor Lines
  const colors = ['#569cd6', '#4fc1ff', '#b5cea8', '#ce9178', '#6a9955', '#dcdcaa', '#c586c0'];
  ctx.font = '11px monospace';
  for (let i = 0; i < 15; i++) {
    const y = 50 + i * 16;
    // Line Number
    ctx.fillStyle = '#858585';
    ctx.fillText(String(i + 1), 160, y);

    // Indent / Code lines
    let currentX = 185;
    const wordCount = 2 + Math.floor(Math.random() * 4);
    const isComment = Math.random() > 0.8;

    if (isComment) {
      ctx.fillStyle = '#6a9955';
      ctx.fillText('// Auto-compiling workspace scene...', currentX, y);
    } else {
      for (let w = 0; w < wordCount; w++) {
        const wordWidth = 20 + Math.random() * 40;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(currentX, y - 9, wordWidth, 10);
        currentX += wordWidth + 6;
      }
    }
  }

  // Integrated Terminal at bottom
  ctx.fillStyle = '#181818';
  ctx.fillRect(150, 270, 362, 70);
  ctx.fillStyle = '#4af626';
  ctx.font = '10px monospace';
  ctx.fillText('sutantu@portfolio:~$ npm run dev', 160, 285);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Vite v6.2.3  ready in 284 ms', 160, 300);
  ctx.fillStyle = '#06B6D4';
  ctx.fillText('➜  Local:   http://localhost:3000/', 160, 315);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createGitHubTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // GitHub Dark Mode theme
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, 512, 340);

  // Navbar
  ctx.fillStyle = '#161b22';
  ctx.fillRect(0, 0, 512, 45);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('GitHub', 20, 26);
  ctx.fillStyle = '#8b949e';
  ctx.font = '10px sans-serif';
  ctx.fillText('Pull requests    Issues    Marketplace    Explore', 80, 25);

  // User Profile Summary Block
  ctx.fillStyle = '#161b22';
  ctx.fillRect(20, 65, 140, 255);
  // Avatar Circle
  ctx.beginPath();
  ctx.arc(90, 115, 35, 0, Math.PI * 2);
  ctx.fillStyle = '#30363d';
  ctx.fill();
  ctx.fillStyle = '#58a6ff';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('Sutantu Dutta', 50, 170);
  ctx.fillStyle = '#8b949e';
  ctx.font = '10px sans-serif';
  ctx.fillText('Sdm940', 75, 185);
  ctx.fillText('📍 India', 50, 215);
  ctx.fillText('🔗 ai.studio/build', 50, 235);

  // Repositories Column / Overview
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Popular repositories', 180, 80);

  const repos = [
    { name: 'three-cyberpunk-workspace', desc: 'Interactive 3D WebGL developer room built in ThreeJS', lang: 'TypeScript', color: '#3178c6' },
    { name: 'portfolio-ai-core', desc: 'Next-gen design engineer portfolio platform powered by LLMs', lang: 'React', color: '#61dafb' },
    { name: 'cybersecurity-sandbox', desc: 'Secure local environments for penetration testing simulation', lang: 'Python', color: '#3572A5' },
    { name: 'copilot-custom-editor', desc: 'Automated workflow companion for local text configurations', lang: 'JavaScript', color: '#f1e05a' },
  ];

  repos.forEach((repo, i) => {
    const rx = 180 + (i % 2) * 160;
    const ry = 95 + Math.floor(i / 2) * 105;
    ctx.fillStyle = '#161b22';
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rx, ry, 150, 95, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#58a6ff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(repo.name, rx + 10, ry + 22);

    ctx.fillStyle = '#8b949e';
    ctx.font = '10px sans-serif';
    // Word wrap description manually
    const words = repo.desc.split(' ');
    let line1 = '';
    let line2 = '';
    words.forEach(w => {
      if ((line1 + w).length < 24) line1 += w + ' ';
      else line2 += w + ' ';
    });
    ctx.fillText(line1, rx + 10, ry + 42);
    ctx.fillText(line2, rx + 10, ry + 56);

    // Language dot
    ctx.beginPath();
    ctx.arc(rx + 15, ry + 78, 4, 0, Math.PI * 2);
    ctx.fillStyle = repo.color;
    ctx.fill();
    ctx.fillStyle = '#8b949e';
    ctx.fillText(repo.lang, rx + 24, ry + 81);
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createPortfolioPreviewTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Modern Portfolio Slate Layout
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, 512, 340);

  // Gradient Blob background
  const gradient = ctx.createRadialGradient(256, 170, 50, 256, 170, 250);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(1, '#030712');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 340);

  // Navigation Mock
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('SD.', 30, 30);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '10px sans-serif';
  ctx.fillText('Home    About    Projects    Tools    Contact', 200, 28);

  // Hero Card UI on screen
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(40, 60, 432, 240, 16);
  ctx.fill();
  ctx.stroke();

  // Welcome glow
  ctx.fillStyle = '#06B6D4';
  ctx.beginPath();
  ctx.arc(80, 100, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('GOOD EVENING', 92, 103);

  // Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('Sutantu Dutta', 75, 145);

  // Dynamic Subtitle
  const subGradient = ctx.createLinearGradient(75, 160, 350, 160);
  subGradient.addColorStop(0, '#3B82F6');
  subGradient.addColorStop(1, '#06B6D4');
  ctx.fillStyle = subGradient;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('Student Developer • AI Enthusiast • Cybersecurity', 75, 175);

  // Short descriptive lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '11px sans-serif';
  ctx.fillText('Crafting dynamic digital workspaces, procedural assets, and intelligent system designs', 75, 205);
  ctx.fillText('with robust, production-ready full-stack frameworks and security parameters.', 75, 222);

  // Dual Action Buttons
  ctx.fillStyle = '#3B82F6';
  ctx.beginPath();
  ctx.roundRect(75, 250, 110, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('View Projects', 100, 268);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.roundRect(200, 250, 110, 30, 15);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.fillText('Let\'s Connect', 228, 268);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Procedural Canvas generator for high-fidelity interactive tech logos
function createLogoTexture(name: string, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Clear background with soft alpha circle
  ctx.clearRect(0, 0, 128, 128);

  // Glassmorphic badge background
  const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
  grad.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.7)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 52, 0, Math.PI * 2);
  ctx.fill();

  // Badge Border Glow Accent
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(64, 64, 52, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle interior glow border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(64, 64, 48, 0, Math.PI * 2);
  ctx.stroke();

  // Render high-fidelity recognizable logos
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.save();
  ctx.translate(64, 54);

  if (name === 'Visual Studio Code') {
    // VS Code Blue Ribbon icon
    ctx.strokeStyle = '#007acc';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(12, -20);
    ctx.lineTo(12, 20);
    ctx.lineTo(-15, 5);
    ctx.lineTo(-15, -5);
    ctx.stroke();
    // Inner diagonal cross
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(5, 12);
    ctx.moveTo(-15, 5);
    ctx.lineTo(5, -12);
    ctx.stroke();
  } else if (name === 'GitHub') {
    // Octocat silhouette
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    // Inner details (eyes, horns)
    ctx.fillStyle = '#0d1117';
    ctx.beginPath();
    ctx.arc(-8, -2, 3, 0, Math.PI * 2);
    ctx.arc(8, -2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-12, -15, 6, 8);
    ctx.fillRect(6, -15, 6, 8);
  } else if (name === 'CodePen') {
    // CodePen 3D Outline Cube
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    // Isometric outer lines
    ctx.moveTo(0, -18);
    ctx.lineTo(18, -8);
    ctx.lineTo(18, 10);
    ctx.lineTo(0, 20);
    ctx.lineTo(-18, 10);
    ctx.lineTo(-18, -8);
    ctx.closePath();
    ctx.stroke();
    // Isometric inner star
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 2);
    ctx.moveTo(18, -8);
    ctx.lineTo(-18, 10);
    ctx.moveTo(-18, -8);
    ctx.lineTo(18, 10);
    ctx.stroke();
  } else if (name === 'Vercel') {
    // Play/Triangle logo
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(18, 14);
    ctx.lineTo(-18, 14);
    ctx.closePath();
    ctx.fill();
  } else if (name === 'ChatGPT') {
    // Spiral Vortex
    ctx.strokeStyle = '#10a37f';
    ctx.lineWidth = 3;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 8, Math.sin(angle) * 8, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (name === 'Claude') {
    // Hand/face styled logo symbol
    ctx.fillStyle = '#d9775f';
    ctx.beginPath();
    ctx.ellipse(0, 2, 16, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('C', 0, 2);
  } else if (name === 'Gemini') {
    // Purple star burst with 4 points
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.quadraticCurveTo(0, 0, 22, 0);
    ctx.quadraticCurveTo(0, 0, 0, 22);
    ctx.quadraticCurveTo(0, 0, -22, 0);
    ctx.quadraticCurveTo(0, 0, 0, -22);
    ctx.fill();
    // Glow center
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (name === 'Google AI Studio') {
    // Interlinked gradient circles
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-8, 0, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(8, 0, 10, 0, Math.PI * 2);
    ctx.stroke();
  } else if (name === 'Microsoft Copilot') {
    // Infinite colorful ribbon shape loop
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(-6, 0, 10, 14, Math.PI / 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    ctx.ellipse(6, 0, 10, 14, -Math.PI / 4, 0, Math.PI * 2);
    ctx.stroke();
  } else if (name === 'Devin') {
    // Cyber green target 'd'
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('>d', 0, 0);
  } else if (name === 'Windsurf') {
    // Bright neon green wing logo
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(-15, -15);
    ctx.bezierCurveTo(15, -15, 15, 15, -15, 15);
    ctx.quadraticCurveTo(-2, 0, -15, -15);
    ctx.fill();
  } else if (name === 'Notion') {
    // Cuboid Notion N
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-14, -14, 28, 28);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 22px serif';
    ctx.fillText('N', 0, 0);
  } else if (name === 'Todoist') {
    // Three checkboxes
    ctx.fillStyle = '#e44332';
    ctx.beginPath();
    ctx.moveTo(-12, -10); ctx.lineTo(12, -10);
    ctx.moveTo(-12, 0); ctx.lineTo(12, 0);
    ctx.moveTo(-12, 10); ctx.lineTo(12, 10);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  } else if (name === 'Dropbox') {
    // Isometric box parts
    ctx.strokeStyle = '#0061ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -15); ctx.lineTo(12, -9); ctx.lineTo(0, -3); ctx.lineTo(-12, -9); ctx.closePath();
    ctx.moveTo(0, -3); ctx.lineTo(12, 3); ctx.lineTo(0, 9); ctx.lineTo(-12, 3); ctx.closePath();
    ctx.stroke();
  } else if (name === 'B12.io') {
    // Pink/magenta loops
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('12', 0, 0);
  } else {
    // Fallback letters
    ctx.fillStyle = color;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(name.slice(0, 3).toUpperCase(), 0, 0);
  }

  ctx.restore();

  // Name text at bottom
  ctx.fillStyle = 'rgba(248, 250, 252, 0.95)';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(name, 64, 102);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

const LOGO_LIST = [
  { name: 'Visual Studio Code', color: '#007acc' },
  { name: 'GitHub', color: '#ffffff' },
  { name: 'CodePen', color: '#ffffff' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'ChatGPT', color: '#10a37f' },
  { name: 'Claude', color: '#d9775f' },
  { name: 'Gemini', color: '#8b5cf6' },
  { name: 'Google AI Studio', color: '#0284c7' },
  { name: 'Microsoft Copilot', color: '#f43f5e' },
  { name: 'Devin', color: '#10b981' },
  { name: 'Windsurf', color: '#22c55e' },
  { name: 'Notion', color: '#ffffff' },
  { name: 'Todoist', color: '#e44332' },
  { name: 'Dropbox', color: '#0061ff' },
  { name: 'B12.io', color: '#ec4899' },
];

export default function Workspace3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#000000', 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Move to dynamic angled view
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0.4, 0);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // 3. LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight('#0f172a', 0.4);
    scene.add(ambientLight);

    // Primary Spotlight (Volumetric Lamp Simulation over desk)
    const deskLampSpot = new THREE.SpotLight('#fef08a', 25);
    deskLampSpot.position.set(0, 3.2, 0);
    deskLampSpot.angle = Math.PI / 4;
    deskLampSpot.penumbra = 0.8;
    deskLampSpot.castShadow = true;
    deskLampSpot.shadow.bias = -0.001;
    deskLampSpot.shadow.mapSize.width = 1024;
    deskLampSpot.shadow.mapSize.height = 1024;
    scene.add(deskLampSpot);

    // Red Accent Glow Lighting (Futuristic Cyber/AI background)
    const redGlow = new THREE.PointLight('#f43f5e', 8, 8);
    redGlow.position.set(-2, 1, -2.5);
    scene.add(redGlow);

    // Green Accent Glow Highlight
    const greenGlow = new THREE.PointLight('#22c55e', 6, 8);
    greenGlow.position.set(2, 0.8, -2.5);
    scene.add(greenGlow);

    // Laptop/Monitor subtle screens glow
    const laptopGlow = new THREE.PointLight('#06b6d4', 2, 3);
    laptopGlow.position.set(0, 1.1, 0.2);
    scene.add(laptopGlow);

    // 4. DIGITAL ROOM GRID & FLOOR BOUNDS
    // Subtle sci-fi digital grid
    const gridHelper = new THREE.GridHelper(20, 40, '#334155', '#1e293b');
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Dark glassmorphic flooring
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#020617',
      roughness: 0.2,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 5. PROCEDURAL 3D MODELS (The Workspace Setup)
    const deskGroup = new THREE.Group();

    // Wood Desk Top
    const deskTopGeo = new THREE.BoxGeometry(2.4, 0.08, 1.2);
    const deskTopMat = new THREE.MeshStandardMaterial({
      color: '#3f2b1d', // Dark wood
      roughness: 0.3,
      metalness: 0.2,
    });
    const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
    deskTop.position.y = 0.96;
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // Minimalist Metal Desk Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.96);
    const legMat = new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.9, roughness: 0.1 });
    const positions = [
      [-1.1, 0.48, -0.5],
      [1.1, 0.48, -0.5],
      [-1.1, 0.48, 0.5],
      [1.1, 0.48, 0.5]
    ];
    positions.forEach(pos => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    scene.add(deskGroup);

    // 6. DETAILED SCREEN RIG (Laptop + Two External Monitors)
    // LAPTOP (Centered on desk)
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 1.0, 0.1);

    // Laptop Base
    const laptopBaseGeo = new THREE.BoxGeometry(0.42, 0.015, 0.28);
    const laptopBaseMat = new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.2 });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopBaseMat);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Screen Lid (Angled at 110 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.005, -0.135);
    
    const laptopLidGeo = new THREE.BoxGeometry(0.42, 0.28, 0.01);
    const laptopLid = new THREE.Mesh(laptopLidGeo, laptopBaseMat);
    laptopLid.position.set(0, 0.135, -0.005);
    laptopLid.castShadow = true;
    lidGroup.add(laptopLid);

    // Real Laptop Screen Display VS Code
    const vsCodeTex = createVSCodeTexture();
    const laptopScreenGeo = new THREE.PlaneGeometry(0.4, 0.26);
    const laptopScreenMat = new THREE.MeshBasicMaterial({ map: vsCodeTex });
    const laptopScreen = new THREE.Mesh(laptopScreenGeo, laptopScreenMat);
    laptopScreen.position.set(0, 0.135, 0.001);
    lidGroup.add(laptopScreen);

    lidGroup.rotation.x = -0.3; // Angle back
    laptopGroup.add(lidGroup);
    scene.add(laptopGroup);

    // EXTERNAL MONITOR 1 (Left - Tilted) - GitHub
    const mon1Group = new THREE.Group();
    mon1Group.position.set(-0.7, 1.0, -0.15);
    mon1Group.rotation.y = 0.45; // Turn towards center

    // Monitor Stand
    const monStandGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35);
    const monStand = new THREE.Mesh(monStandGeo, legMat);
    monStand.position.set(0, 0.175, -0.08);
    monStand.castShadow = true;
    mon1Group.add(monStand);

    const monBaseGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.02, 16);
    const monBase = new THREE.Mesh(monBaseGeo, legMat);
    monBase.position.set(0, 0.01, -0.08);
    monBase.castShadow = true;
    mon1Group.add(monBase);

    // Monitor Outer Frame
    const monFrameGeo = new THREE.BoxGeometry(0.56, 0.38, 0.02);
    const monFrame = new THREE.Mesh(monFrameGeo, laptopBaseMat);
    monFrame.position.set(0, 0.33, -0.05);
    monFrame.castShadow = true;
    mon1Group.add(monFrame);

    // Screen plane
    const gitHubTex = createGitHubTexture();
    const monScreenGeo = new THREE.PlaneGeometry(0.54, 0.36);
    const monScreenMat = new THREE.MeshBasicMaterial({ map: gitHubTex });
    const monScreen1 = new THREE.Mesh(monScreenGeo, monScreenMat);
    monScreen1.position.set(0, 0.33, -0.039);
    mon1Group.add(monScreen1);

    scene.add(mon1Group);

    // EXTERNAL MONITOR 2 (Right - Tilted) - Portfolio Preview
    const mon2Group = new THREE.Group();
    mon2Group.position.set(0.7, 1.0, -0.15);
    mon2Group.rotation.y = -0.45; // Turn towards center

    // Monitor Stand
    const monStand2 = new THREE.Mesh(monStandGeo, legMat);
    monStand2.position.set(0, 0.175, -0.08);
    monStand2.castShadow = true;
    mon2Group.add(monStand2);

    const monBase2 = new THREE.Mesh(monBaseGeo, legMat);
    monBase2.position.set(0, 0.01, -0.08);
    monBase2.castShadow = true;
    mon2Group.add(monBase2);

    // Monitor Frame
    const monFrame2 = new THREE.Mesh(monFrameGeo, laptopBaseMat);
    monFrame2.position.set(0, 0.33, -0.05);
    monFrame2.castShadow = true;
    mon2Group.add(monFrame2);

    // Screen Plane
    const portfolioTex = createPortfolioPreviewTexture();
    const monScreenMat2 = new THREE.MeshBasicMaterial({ map: portfolioTex });
    const monScreen2 = new THREE.Mesh(monScreenGeo, monScreenMat2);
    monScreen2.position.set(0, 0.33, -0.039);
    mon2Group.add(monScreen2);

    scene.add(mon2Group);

    // 7. MULTIPLE ACCESSORIES ON DESK
    // Coffee Mug
    const mugGroup = new THREE.Group();
    mugGroup.position.set(0.35, 1.0, 0.25);
    const mugGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.09, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.1 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.castShadow = true;
    mugGroup.add(mug);
    // Coffee surface
    const liquidGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.01);
    const liquidMat = new THREE.MeshStandardMaterial({ color: '#451a03', roughness: 0.5 });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = 0.04;
    mugGroup.add(liquid);
    scene.add(mugGroup);

    // Procedural Steam Particles rising from Coffee
    const steamGroup = new THREE.Group();
    steamGroup.position.copy(mugGroup.position);
    steamGroup.position.y += 0.05;
    scene.add(steamGroup);

    const steamParticles: THREE.Mesh[] = [];
    const steamGeo = new THREE.SphereGeometry(0.012, 4, 4);
    const steamMat = new THREE.MeshBasicMaterial({ color: '#f8fafc', transparent: true, opacity: 0.2 });
    for (let i = 0; i < 5; i++) {
      const part = new THREE.Mesh(steamGeo, steamMat);
      part.position.set((Math.random() - 0.5) * 0.03, Math.random() * 0.2, (Math.random() - 0.5) * 0.03);
      steamGroup.add(part);
      steamParticles.push(part);
    }

    // Small Indoor Plant
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-0.85, 1.0, 0.3);
    const potGeo = new THREE.CylinderGeometry(0.06, 0.04, 0.1, 16);
    const potMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.4 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.castShadow = true;
    plantGroup.add(pot);
    // Green leaves
    const leafGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const leafMat = new THREE.MeshStandardMaterial({ color: '#10b981', roughness: 0.6 });
    for (let i = 0; i < 3; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.scale.set(1, 1.5, 0.8);
      leaf.rotation.set(Math.random() * 0.5, Math.random() * 3, Math.random() * 0.5);
      leaf.position.set((Math.random() - 0.5) * 0.05, 0.08, (Math.random() - 0.5) * 0.05);
      plantGroup.add(leaf);
    }
    scene.add(plantGroup);

    // Mechanical Keyboard & Wireless Mouse
    const keyboardGeo = new THREE.BoxGeometry(0.3, 0.015, 0.1);
    const keyboardMat = new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.4 });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.position.set(0, 1.0, 0.32);
    keyboard.castShadow = true;
    scene.add(keyboard);

    // Wireless Mouse
    const mouseGeo = new THREE.BoxGeometry(0.04, 0.015, 0.07);
    const mouseMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.1 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(0.22, 1.0, 0.32);
    mouse.castShadow = true;
    scene.add(mouse);

    // Smartphone
    const phoneGeo = new THREE.BoxGeometry(0.05, 0.008, 0.1);
    const phoneMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.1, metalness: 0.9 });
    const phone = new THREE.Mesh(phoneGeo, phoneMat);
    phone.position.set(-0.25, 1.0, 0.3);
    phone.rotation.y = 0.3;
    phone.castShadow = true;
    scene.add(phone);

    // Glowing screen on smartphone
    const phoneScreenGeo = new THREE.PlaneGeometry(0.045, 0.094);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ color: '#38bdf8' });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.set(-0.25, 1.005, 0.3);
    phoneScreen.rotation.x = -Math.PI / 2;
    phoneScreen.rotation.z = 0.3;
    scene.add(phoneScreen);

    // Soft Ambient Desk Lamp (Mounted on right edge of desk)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0.9, 1.0, -0.3);

    const lampBaseGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.02, 16);
    const lampBaseMat = new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.7, roughness: 0.3 });
    const lampBase = new THREE.Mesh(lampBaseGeo, lampBaseMat);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Lamp Arm
    const lampArmGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5);
    const lampArm = new THREE.Mesh(lampArmGeo, lampBaseMat);
    lampArm.position.set(0, 0.25, 0);
    lampArm.rotation.z = -0.25;
    lampArm.castShadow = true;
    lampGroup.add(lampArm);

    // Lamp head pointing down over the center desk
    const lampHeadGeo = new THREE.CylinderGeometry(0.05, 0.08, 0.1, 16);
    const lampHead = new THREE.Mesh(lampHeadGeo, lampBaseMat);
    lampHead.position.set(-0.15, 0.48, 0.1);
    lampHead.rotation.x = 0.4;
    lampHead.rotation.z = -0.5;
    lampHead.castShadow = true;
    lampGroup.add(lampHead);

    scene.add(lampGroup);

    // Notebook with ideas
    const notebookGeo = new THREE.BoxGeometry(0.14, 0.01, 0.2);
    const notebookMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.9 });
    const notebook = new THREE.Mesh(notebookGeo, notebookMat);
    notebook.position.set(-0.45, 1.0, 0.2);
    notebook.rotation.y = -0.15;
    notebook.castShadow = true;
    scene.add(notebook);

    // 8. 3D DEVELOPER CHARACTER (Young developer seated typing)
    const devGroup = new THREE.Group();
    devGroup.position.set(0, 0.45, 0.7); // Seated slightly back from desk

    // ERGONOMIC CHAIR (Mounted under developer)
    const chairGroup = new THREE.Group();
    // Chair Base Column
    const columnGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4);
    const column = new THREE.Mesh(columnGeo, legMat);
    column.position.set(0, 0.2, 0.1);
    chairGroup.add(column);
    
    // Seat Cushion
    const seatGeo = new THREE.BoxGeometry(0.48, 0.06, 0.48);
    const seatMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.6 });
    const seat = new THREE.Mesh(seatGeo, seatMat);
    seat.position.set(0, 0.43, 0.1);
    seat.castShadow = true;
    chairGroup.add(seat);

    // Cyber Ergonomic Backrest (High curve with bright orange highlight strips)
    const backrestGeo = new THREE.BoxGeometry(0.44, 0.64, 0.06);
    const backrest = new THREE.Mesh(backrestGeo, seatMat);
    backrest.position.set(0, 0.75, 0.32);
    backrest.rotation.x = -0.05;
    backrest.castShadow = true;
    chairGroup.add(backrest);

    // Orange design trim
    const trimGeo = new THREE.BoxGeometry(0.03, 0.6, 0.07);
    const trimMat = new THREE.MeshStandardMaterial({ color: '#f97316', roughness: 0.2 });
    const trimLeft = new THREE.Mesh(trimGeo, trimMat);
    trimLeft.position.set(-0.21, 0.75, 0.32);
    const trimRight = new THREE.Mesh(trimGeo, trimMat);
    trimRight.position.set(0.21, 0.75, 0.32);
    chairGroup.add(trimLeft);
    chairGroup.add(trimRight);

    devGroup.add(chairGroup);

    // CHARACTER BODY
    // Seated hips/thighs
    const pantsMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.7 });
    const legsGroup = new THREE.Group();
    const thighGeo = new THREE.BoxGeometry(0.12, 0.12, 0.35);
    const leftThigh = new THREE.Mesh(thighGeo, pantsMat);
    leftThigh.position.set(-0.13, 0.48, -0.05);
    leftThigh.castShadow = true;
    const rightThigh = new THREE.Mesh(thighGeo, pantsMat);
    rightThigh.position.set(0.13, 0.48, -0.05);
    rightThigh.castShadow = true;
    legsGroup.add(leftThigh);
    legsGroup.add(rightThigh);
    devGroup.add(legsGroup);

    // Torso / Sweater
    const sweaterMat = new THREE.MeshStandardMaterial({ color: '#4f46e5', roughness: 0.8 }); // Royal indigo sweater
    const torsoGeo = new THREE.CylinderGeometry(0.2, 0.16, 0.52, 16);
    const torso = new THREE.Mesh(torsoGeo, sweaterMat);
    torso.position.set(0, 0.74, 0.1);
    torso.castShadow = true;
    devGroup.add(torso);

    // Developer Head Rig
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.1, 0.1);

    // Stylized Face / Skin
    const skinMat = new THREE.MeshStandardMaterial({ color: '#fbcfe8', roughness: 0.5 }); // Soft peach skin
    const headGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.castShadow = true;
    headGroup.add(head);

    // Modern Stylish Glasses
    const glassFrameMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9 });
    const frameGeo = new THREE.BoxGeometry(0.22, 0.05, 0.02);
    const frame = new THREE.Mesh(frameGeo, glassFrameMat);
    frame.position.set(0, 0.03, -0.13);
    headGroup.add(frame);

    // Glasses lenses
    const lensGeo = new THREE.BoxGeometry(0.08, 0.04, 0.01);
    const lensMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.4 });
    const lensL = new THREE.Mesh(lensGeo, lensMat);
    lensL.position.set(-0.05, 0.03, -0.135);
    const lensR = new THREE.Mesh(lensGeo, lensMat);
    lensR.position.set(0.05, 0.03, -0.135);
    headGroup.add(lensL);
    headGroup.add(lensR);

    // Hair (Stylized clean modern dark cut)
    const hairGeo = new THREE.SphereGeometry(0.142, 16, 16);
    const hairMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.9 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.04, 0.02);
    hair.scale.set(1.02, 1.0, 1.02);
    headGroup.add(hair);

    // Blinkable Eyes
    const eyeGeo = new THREE.BoxGeometry(0.02, 0.02, 0.01);
    const eyeMat = new THREE.MeshBasicMaterial({ color: '#090d16' });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.05, 0.03, -0.138);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.05, 0.03, -0.138);
    headGroup.add(eyeL);
    headGroup.add(eyeR);

    devGroup.add(headGroup);

    // TYPING ARMS
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.21, 0.85, 0.1);
    const leftArmGeo = new THREE.CylinderGeometry(0.045, 0.035, 0.35);
    const leftArm = new THREE.Mesh(leftArmGeo, sweaterMat);
    leftArm.position.y = -0.15;
    leftArm.rotation.x = 0.5;
    leftArm.rotation.z = 0.15;
    leftArmGroup.add(leftArm);
    
    // Left hand over keyboard
    const leftHandGeo = new THREE.BoxGeometry(0.045, 0.03, 0.06);
    const leftHand = new THREE.Mesh(leftHandGeo, skinMat);
    leftHand.position.set(-0.03, -0.28, -0.18);
    leftArmGroup.add(leftHand);

    devGroup.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.21, 0.85, 0.1);
    const rightArmGeo = new THREE.CylinderGeometry(0.045, 0.035, 0.35);
    const rightArm = new THREE.Mesh(rightArmGeo, sweaterMat);
    rightArm.position.y = -0.15;
    rightArm.rotation.x = 0.5;
    rightArm.rotation.z = -0.15;
    rightArmGroup.add(rightArm);

    // Right hand over keyboard
    const rightHandGeo = new THREE.BoxGeometry(0.045, 0.03, 0.06);
    const rightHand = new THREE.Mesh(rightHandGeo, skinMat);
    rightHand.position.set(0.03, -0.28, -0.18);
    rightArmGroup.add(rightHand);

    devGroup.add(rightArmGroup);
    scene.add(devGroup);

    // 9. AMBIENT PARTICLES (Volumetric background field)
    const particleCount = 120;
    const particlesGeo = new THREE.BufferGeometry();
    const positionsArray = new Float32Array(particleCount * 3);
    const speedsArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionsArray[i] = (Math.random() - 0.5) * 12;      // x
      positionsArray[i + 1] = Math.random() * 6;           // y
      positionsArray[i + 2] = (Math.random() - 0.5) * 8;   // z
      speedsArray[i / 3] = 0.2 + Math.random() * 0.4;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: '#38bdf8',
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const backgroundParticles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(backgroundParticles);

    // 10. FLOATING TECHNOLOGY LOGOS (Orbiting the developer workspace)
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);

    const logoMeshes: THREE.Mesh[] = [];
    const logoBadgeGeo = new THREE.PlaneGeometry(0.38, 0.38);

    LOGO_LIST.forEach((logo, i) => {
      const texture = createLogoTexture(logo.name, logo.color);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(logoBadgeGeo, material);
      
      // Arrange in an elliptical cylinder around workspace
      const angle = (i / LOGO_LIST.length) * Math.PI * 2;
      const radiusX = 2.4 + Math.random() * 0.4;
      const radiusZ = 2.0 + Math.random() * 0.4;
      const x = Math.cos(angle) * radiusX;
      const y = 1.0 + Math.sin(angle * 2) * 0.4 + (Math.random() - 0.5) * 0.3;
      const z = Math.sin(angle) * radiusZ;

      mesh.position.set(x, y, z);
      floatGroup.add(mesh);
      logoMeshes.push(mesh);
    });

    // 11. PARALLAX COORDINATES (Mouse interactivity)
    const mousePos = { x: 0, y: 0 };
    const targetCamPos = new THREE.Vector3().copy(camera.position);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -0.5 to 0.5
      mousePos.x = (e.clientX / window.innerWidth) - 0.5;
      mousePos.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 12. NATURAL ANIMATION TIMINGS & LOOP
    let timer = new THREE.Timer();
    let isRunning = true;
    let typingTimer = 0;
    let mouseUseTimer = 0;
    let rightArmTarget = new THREE.Vector3(0.03, -0.28, -0.18); // Default on keyboard
    let useMouseState = false;

    // Benchmarking variables
    let frameCount = 0;
    let lastTime = performance.now();

    const animateLoop = () => {
      if (!isRunning) return;
      requestAnimationFrame(animateLoop);

      timer.update();
      const delta = timer.getDelta();
      const elapsedTime = timer.getElapsed();

      // Benchmark FPS
      frameCount++;
      const timeNow = performance.now();
      if (timeNow >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (timeNow - lastTime)));
        frameCount = 0;
        lastTime = timeNow;
      }

      // Dynamic Mouse Parallax (Slow, luxurious dampening effect)
      const targetX = 4 + mousePos.x * 1.8;
      const targetY = 3 - mousePos.y * 1.4;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.45, 0);

      // BLINKING LOGIC (Every 4-6 seconds, blink for 0.1s)
      const blinkCycle = elapsedTime % 5.0;
      if (blinkCycle > 4.8) {
        eyeL.scale.y = 0.1;
        eyeR.scale.y = 0.1;
      } else {
        eyeL.scale.y = 1.0;
        eyeR.scale.y = 1.0;
      }

      // NATURAL DEVELOPER MOVEMENTS
      // Head nods/tilts slightly based on math sine waves
      headGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.08;
      headGroup.rotation.z = Math.cos(elapsedTime * 0.5) * 0.04;
      headGroup.rotation.x = (Math.sin(elapsedTime * 1.2) * 0.03) + 0.05; // Nodding / scanning screens

      // Lean Forward slightly while thinking
      torso.rotation.x = Math.sin(elapsedTime * 0.4) * 0.02 + 0.04;
      headGroup.position.z = 0.1 + Math.sin(elapsedTime * 0.4) * 0.02;

      // NATURAL TYPING ANIMATION (Random slight offsets)
      typingTimer += delta;
      
      // Toggle Mouse interaction
      mouseUseTimer += delta;
      if (mouseUseTimer > 12) {
        useMouseState = !useMouseState;
        mouseUseTimer = 0;
      }

      // TYPING MOVEMENT FOR LEFT ARM
      leftHand.position.y = -0.28 + Math.sin(elapsedTime * 45) * 0.015 * (0.8 + Math.random() * 0.4);
      leftHand.position.z = -0.18 + Math.cos(elapsedTime * 30) * 0.01;

      // RIGHT ARM MOVEMENT (Either typing or using wireless mouse)
      if (useMouseState) {
        // Move arm/hand to the right mouse position
        rightArmTarget.set(0.18, -0.25, -0.12);
        // Mouse click click movement
        rightHand.position.y += (rightArmTarget.y + Math.sin(elapsedTime * 15) * 0.005 - rightHand.position.y) * 0.15;
        rightHand.position.x += (rightArmTarget.x - rightHand.position.x) * 0.15;
        rightHand.position.z += (rightArmTarget.z - rightHand.position.z) * 0.15;
      } else {
        // Back to keyboard typing rapidly
        rightArmTarget.set(0.03, -0.28, -0.18);
        rightHand.position.y += (rightArmTarget.y + Math.sin(elapsedTime * 55) * 0.015 - rightHand.position.y) * 0.15;
        rightHand.position.x += (rightArmTarget.x - rightHand.position.x) * 0.15;
        rightHand.position.z += (rightArmTarget.z - rightHand.position.z) * 0.15;
      }

      // Steam Particles rises and fades
      steamParticles.forEach((part, index) => {
        part.position.y += delta * 0.05 * (1 + index * 0.2);
        part.position.x += Math.sin(elapsedTime * 2 + index) * 0.001;
        if (part.position.y > 0.35) {
          part.position.y = 0.02;
          part.position.x = (Math.random() - 0.5) * 0.03;
        }
      });

      // Ambient Volumetric Particles movement
      const posAttr = backgroundParticles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1;
        const xIndex = i * 3;
        // Float particles upwards
        posAttr.array[yIndex] += delta * speedsArray[i] * 0.12;
        // Sine wave drift
        posAttr.array[xIndex] += Math.sin(elapsedTime * 0.5 + i) * 0.002;
        
        if (posAttr.array[yIndex] > 6) {
          posAttr.array[yIndex] = 0;
          posAttr.array[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      posAttr.needsUpdate = true;

      // Slow elegant orbit of technology badge cards
      floatGroup.rotation.y = elapsedTime * 0.06;
      // Also maintain billboard view (badges face screen/camera coordinates)
      logoMeshes.forEach((mesh) => {
        mesh.rotation.y = -floatGroup.rotation.y;
        mesh.rotation.x = Math.sin(elapsedTime * 0.8 + mesh.position.y) * 0.06; // Delicate organic tilt
      });

      renderer.render(scene, camera);
    };

    // Begin Animation Loop
    animateLoop();

    // 13. FLUID RESIZE LISTENER
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // Clean up all memory / event listeners on unmount
    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.innerHTML = '';
      }
      
      // Dispose ThreeJS resources properly to avoid leak
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      floorGeo.dispose();
      floorMat.dispose();
      deskTopGeo.dispose();
      deskTopMat.dispose();
      legGeo.dispose();
      legMat.dispose();
      laptopBaseGeo.dispose();
      laptopBaseMat.dispose();
      laptopLidGeo.dispose();
      laptopScreenGeo.dispose();
      laptopScreenMat.dispose();
      monStandGeo.dispose();
      monBaseGeo.dispose();
      monFrameGeo.dispose();
      monScreenGeo.dispose();
      monScreenMat.dispose();
      monScreenMat2.dispose();
      mugGeo.dispose();
      mugMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      steamGeo.dispose();
      steamMat.dispose();
      potGeo.dispose();
      potMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      keyboardGeo.dispose();
      keyboardMat.dispose();
      mouseGeo.dispose();
      mouseMat.dispose();
      phoneGeo.dispose();
      phoneMat.dispose();
      phoneScreenGeo.dispose();
      phoneScreenMat.dispose();
      lampBaseGeo.dispose();
      lampBaseMat.dispose();
      lampArmGeo.dispose();
      lampHeadGeo.dispose();
      notebookGeo.dispose();
      notebookMat.dispose();
      columnGeo.dispose();
      seatGeo.dispose();
      seatMat.dispose();
      backrestGeo.dispose();
      trimGeo.dispose();
      trimMat.dispose();
      thighGeo.dispose();
      pantsMat.dispose();
      torsoGeo.dispose();
      sweaterMat.dispose();
      headGeo.dispose();
      skinMat.dispose();
      frameGeo.dispose();
      glassFrameMat.dispose();
      lensGeo.dispose();
      lensMat.dispose();
      hairGeo.dispose();
      hairMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      leftArmGeo.dispose();
      rightArmGeo.dispose();
      leftHandGeo.dispose();
      rightHandGeo.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      logoBadgeGeo.dispose();
      
      logoMeshes.forEach(m => {
        m.geometry.dispose();
        if (Array.isArray(m.material)) {
          m.material.forEach(mat => mat.dispose());
        } else {
          m.material.dispose();
        }
      });

      vsCodeTex.dispose();
      gitHubTex.dispose();
      portfolioTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full absolute inset-0" />
      
      {/* Dynamic FPS Monitor HUD (Sci-fi Aesthetic) */}
      <div className="absolute top-4 right-4 bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-1 text-[11px] font-mono text-emerald-400 flex items-center space-x-1.5 backdrop-blur-md pointer-events-none z-30">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>CYBER_WORKSPACE_ONLINE : {fps} FPS</span>
      </div>
    </div>
  );
}
