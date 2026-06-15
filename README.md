<div align="center">

# ⚡ Sutantu Dutta — Personal Portfolio

**Vibe Coder & Student.**  
Crafting interactive web experiences, game mechanics, and AI-powered interfaces — learning relentlessly, shipping obsessively.

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-sutantu.vercel.app-5b6ef5?style=for-the-badge)](https://sutantu.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-CYBER943-181717?style=for-the-badge&logo=github)](https://github.com/CYBER943)
[![CodePen](https://img.shields.io/badge/CodePen-SUTANTU DUTTA--HOLDINGS-000000?style=for-the-badge&logo=codepen)](https://codepen.io/SUTANTU DUTTA-HOLDINGS)
[![Built with](https://img.shields.io/badge/Built_with-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Preview](#-live-preview)
- [Features](#-features)
- [Sections Breakdown](#-sections-breakdown)
- [Projects Featured](#-projects-featured)
- [Tech Stack](#-tech-stack)
- [Design System](#-design-system)
- [File Structure](#-file-structure)
- [Getting Started](#-getting-started)
- [Customization Guide](#-customization-guide)
- [Connecting a Real Email Backend](#-connecting-a-real-email-backend)
- [Deployment](#-deployment)
- [Performance Notes](#-performance-notes)
- [Browser Support](#-browser-support)
- [Roadmap](#-roadmap)
- [Connect](#-connect)
- [License](#-license)

---

## 🧭 Overview

This is my personal portfolio — a **fully hand-coded, single-file website** built with zero frameworks, zero npm packages, and zero build tools. Everything runs directly in the browser from one `.html` file.

The aesthetic is dark and futuristic — influenced by neural interfaces, terminal UIs, and the idea that a developer's portfolio should itself be a demonstration of their craft. Every animation, every layout, and every interaction was written by hand.

> **Philosophy:** A portfolio isn't just a list of projects. It's a product. Ship it like one.

---

## 🌐 Live Preview

**→ [sutantu.vercel.app](https://sutantu.vercel.app)**

The site is deployed on Vercel with automatic CI/CD from the main GitHub branch. Any push to `main` triggers a new deployment within ~30 seconds.

---

## ✨ Features

### 🎨 Visual & Animation
- **Animated neural particle network** — 120 interconnected nodes built on the raw HTML5 Canvas 2D API, with real-time mouse-reactive repulsion physics. Nodes drift organically, connect when within range, and scatter away from the cursor.
- **Staggered hero entrance sequence** — Each hero element (label, name, tagline, buttons, scroll indicator) animates in with a timed `slideUp` keyframe cascade using CSS `animation-delay`.
- **Scroll-triggered section reveals** — Every section and card fades and slides into view via `IntersectionObserver`. No scroll event listeners. No jank.
- **Live generative project card canvases** — Each of the 4 project cards has its own unique real-time Canvas 2D animation that plays in the card thumbnail, giving a visual preview of the project's character.
- **Gradient underline signature** — The hero name "SUTANTU DUTTA" has a coral→mint gradient underline rendered purely in CSS using a `::after` pseudo-element.

### 🧩 UX & Interaction
- **Fixed glassmorphism navbar** — Stays at the top with `backdrop-filter: blur(18px)` and a subtle border, turning translucent over the content beneath.
- **Smooth scroll navigation** — All nav links use `scroll-behavior: smooth` for native, jank-free anchor scrolling.
- **Contact form with validation** — Client-side validation checks for empty fields and valid email format before accepting a submission. Invalid attempts show a colored toast notification.
- **Toast notification system** — Non-blocking pop-up notifications appear bottom-right with dynamic color (green for success, coral for errors), and auto-dismiss after 3.5 seconds.
- **Hover micro-interactions** — Cards lift, borders glow, buttons drop shadows, links extend their gap — every interactive element responds to hover with a deliberate transition.

### 📐 Layout & Responsiveness
- **CSS Grid and Flexbox** — Layout is fully fluid, using `grid-template-columns`, `repeat(auto-fit, minmax(...))`, and flex wrapping throughout.
- **Fluid typography** — `clamp()` is used on all major headings so text scales smoothly between mobile and desktop without breakpoint jumps.
- **Mobile-first breakpoints** — A `@media (max-width: 900px)` block collapses the grid layouts to single-column, hides the desktop nav links, and adjusts padding throughout.

---

## 📄 Sections Breakdown

### 1. Navigation
Fixed top bar with:
- Wordmark logo (`SUT.` with mint accent dot)
- Desktop nav links: About, Work, Contact
- Coral CTA button: "Let's Connect →" — smooth-scrolls to the contact section

### 2. Hero
Full-viewport landing section with:
- Monospace eyebrow label (`// Portfolio — 2026`)
- Giant display heading using `Syne` typeface at up to `8rem`, fluid via `clamp()`
- Subtitle paragraph with a strong tagline
- Two CTAs: solid "See My Work" button + outline "GitHub ↗" link
- Animated scroll indicator (gradient line + uppercase label)
- Timed entrance animations on all elements

### 3. About
Two-column grid layout:
- **Left:** Bio text in three paragraphs, covering identity, approach, and current learning direction. Plus GitHub and CodePen quick-link buttons with SVG icons.
- **Right:** Glassmorphism skills panel showing 4 skill categories with color-coded tags:
  - 🔵 `hot` (indigo) — primary, most-used skills
  - 🟢 `warm` (mint) — secondary, actively growing skills
  - ⬜ Default — supporting/peripheral skills

### 4. Work (Projects)
2×2 grid of project cards, each containing:
- **Animated thumbnail** — a live Canvas 2D generative animation unique to each project
- Category kicker label (e.g. `Web · AI Platform`)
- Project title in `Syne` display font
- Description paragraph
- Tech tag pills
- External link with animated arrow

### 5. Contact
Two-column layout:
- **Left:** "Open to opportunities" header, descriptive paragraph, GitHub + CodePen social links with icon buttons
- **Right:** Glassmorphism contact form with Name, Email, and Message fields, client-side validation, and a full-width submit button

### 6. Footer
Minimal two-column footer:
- Left: wordmark + tagline
- Right: copyright notice

---

## 🗂️ Projects Featured

### 🧠 Sutantu AI
**Category:** Web · AI Platform  
A full enterprise AI marketing site with a live 3D neural network background (Three.js), a Gemini-powered reasoning sandbox with two modes (Architect + Core Agent), an animated DNA helix in the spotlight section, animated stat counters, and smooth scroll reveals. Built entirely in a single HTML file.  
**Tech:** HTML/CSS/JS · Three.js · Gemini API · WebGL · GLSL Shaders

---

### 🏎️ Turbo Rush
**Category:** Game · JavaScript  
A fully playable 2D top-down car racing game built with zero frameworks. Features include AI opponents with pathfinding logic, collision detection and response physics, a lap timer, speed boost pickups, a complete game state machine (menu → race → results), and a persistent high-score system.  
**Tech:** Canvas 2D · Vanilla JS · Game Physics · AI Opponents

---

### 🌍 World Environment Day 2026
**Category:** Web · Interactive  
A rich tribute site celebrating World Environment Day 2026. Features particle systems simulating natural phenomena, scroll-triggered animations on every section, interactive data visualizations showing environmental metrics, and a carefully tuned ambient visual soundscape.  
**Tech:** CSS Animations · Particle Systems · Data Viz · HTML/CSS

---

### ⚡ VOLTA — EV Marketing Site
**Category:** Web · Marketing  
An autonomous electric vehicle brand site built from a minimal brief. Features immersive full-page section transitions, animated vehicle specification reveals, a 3D-style car configurator panel, and cinematic parallax scrolling throughout. Fictional brand "VOLTA" designed from scratch.  
**Tech:** HTML/CSS/JS · Brand Design · CSS Transforms · Scroll FX

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Markup | HTML5 | Semantic structure |
| Styling | CSS3 | Layout, animation, theming |
| Logic | Vanilla JavaScript (ES6+) | All interactivity and canvas rendering |
| Canvas | HTML5 Canvas 2D API | Particle network, project card animations |
| Fonts | Google Fonts | Syne, Space Grotesk, JetBrains Mono |
| Hosting | Vercel | Static deployment + CDN |
| Version Control | Git + GitHub | Source management |

**Zero production dependencies.** No React, Vue, Angular, jQuery, Webpack, Vite, or any npm package is used or required.

---

## 🎨 Design System

### Color Palette

| Variable | Hex | Role |
|---|---|---|
| `--bg` | `#04060f` | Page background |
| `--surface` | `#080d1e` | Elevated surface |
| `--accent1` | `#5b6ef5` | Primary indigo — CTAs, highlights |
| `--accent2` | `#00e5c8` | Secondary mint — links, hovers |
| `--accent3` | `#ff5f8f` | Signature coral — nav CTA, accents |
| `--text` | `#e8eaf6` | Primary text |
| `--muted` | `#636b8a` | Secondary/disabled text |
| `--card` | `rgba(10,14,36,0.72)` | Glassmorphism card background |
| `--border` | `rgba(255,255,255,0.06)` | Subtle borders |

**Design decision:** The coral `#ff5f8f` is an intentional warm punch in a cold indigo-mint palette. Most dark developer portfolios stay entirely in the cool spectrum. The coral gives this one a signature.

### Typography

| Font | Weight | Usage |
|---|---|---|
| `Syne` | 700, 800 | Hero title, section headings, project titles |
| `Space Grotesk` | 300–700 | Body text, paragraphs, buttons |
| `JetBrains Mono` | 300–500 | Labels, tags, code-style UI elements |

### Spacing Scale
All spacing uses `rem` units. Key values: `0.5rem` (gap-xs), `1rem` (gap-sm), `1.5rem` (gap-md), `2rem` (gap-lg), `3.5rem` (section padding), `8rem` (section vertical rhythm).

### Animation Principles
- **Entrance:** `slideUp` (Y-axis + opacity), staggered with `animation-delay`
- **Scroll reveals:** `IntersectionObserver` triggers `.visible` class → CSS transition
- **Hover:** `transform: translateY(-Npx)` + `box-shadow` glow — never `top`/`left` (compositing performance)
- **Canvas:** `requestAnimationFrame` loop for all generative animations

---

## 📁 File Structure

```
sudantu-portfolio/
│
├── index.html                  ← The entire site (rename from sudantu-portfolio.html)
│
└── README.md                   ← This file
```

The entire site is self-contained in one HTML file. Here's how it's organized internally:

```
index.html
│
├── <head>
│   ├── Meta tags & viewport
│   ├── Google Fonts import (Syne, Space Grotesk, JetBrains Mono)
│   └── <style>
│       ├── CSS custom properties (:root variables)
│       ├── Reset & base styles
│       ├── Navigation styles
│       ├── Hero section styles
│       ├── About section styles
│       ├── Projects grid & card styles
│       ├── Contact form styles
│       ├── Footer styles
│       ├── Reveal animation system
│       ├── Keyframe definitions
│       ├── Toast notification styles
│       └── Responsive breakpoints (@media 900px)
│
├── <body>
│   ├── <canvas id="bg-canvas">         ← Neural particle background
│   ├── <nav>                           ← Fixed navigation
│   ├── <section id="hero">             ← Full-viewport landing
│   ├── <section id="about">            ← Bio + skills panel
│   ├── <section id="projects">         ← 2×2 project grid
│   ├── <section id="contact">          ← Contact form + social links
│   ├── <footer>                        ← Minimal footer
│   └── <div class="toast">             ← Toast notification element
│
└── <script>
    ├── // BACKGROUND NEURAL PARTICLE CANVAS
    │   ├── Node class (position, velocity, alpha, color)
    │   ├── Mouse repulsion physics
    │   ├── Connection line renderer (distance-based)
    │   └── requestAnimationFrame loop
    │
    ├── // PROJECT CARD MINI CANVASES
    │   ├── theme: 'neural' → orbiting nodes + connections
    │   ├── theme: 'race'   → scrolling road stripes + car dot
    │   ├── theme: 'nature' → green orbiting particles
    │   └── theme: 'ev'     → animated lightning bolt paths
    │
    ├── // SCROLL REVEAL SYSTEM
    │   └── IntersectionObserver → adds .visible class at 12% threshold
    │
    ├── // CONTACT FORM
    │   ├── handleFormSubmit() — validates name, email, message
    │   └── showToast(msg, color) — displays timed notification
```

---

## 🚀 Getting Started

### Option 1 — Just open it (fastest)
```bash
# Download the file and open in any browser
open index.html
```
No server needed. No `npm install`. No build step. It works immediately.

---

### Option 2 — Clone from GitHub
```bash
# Clone the repository
git clone https://github.com/CYBER943/portfolio.git

# Navigate into it
cd portfolio

# Open in browser
open index.html

# OR serve locally with Python (optional, for absolute paths)
python3 -m http.server 3000
# then visit http://localhost:3000
```

---

### Option 3 — VS Code with Live Server
1. Open the folder in VS Code
2. Install the **Live Server** extension by Ritwick Dey
3. Right-click `index.html` → **Open with Live Server**
4. Auto-refreshes on save

---

## 🔧 Customization Guide

### Update Your Name & Tagline
In the `<section id="hero">` block:
```html
<h1 class="hero-name">
  <span class="accent-word">YourName</span><br>
  builds<br>
  things.
</h1>
<p class="hero-tagline">
  <strong>Your Title.</strong> Your description here.
</p>
```

---

### Change the Color Palette
All colors are CSS custom properties at the top of the `<style>` block. Edit these and the entire site updates:
```css
:root {
  --bg:      #04060f;    /* page background */
  --accent1: #5b6ef5;    /* primary — buttons, highlights */
  --accent2: #00e5c8;    /* secondary — links, hovers */
  --accent3: #ff5f8f;    /* signature — nav CTA, accents */
  --text:    #e8eaf6;    /* primary text */
  --muted:   #636b8a;    /* secondary text */
}
```

---

### Add or Edit a Project Card
Copy this block and paste it inside `.projects-grid`:
```html
<div class="project-card reveal">
  <div class="project-thumb thumb-1">
    <!-- Optional: add a canvas for a live animation -->
    <div class="project-thumb-icon">🔥</div>
  </div>
  <div class="project-body">
    <p class="project-kicker">Category · Type</p>
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-desc">A concise description of what you built and what makes it interesting.</p>
    <div class="project-tags">
      <span class="project-tag">Tech 1</span>
      <span class="project-tag">Tech 2</span>
    </div>
    <a class="project-link" href="YOUR_URL" target="_blank" rel="noopener">
      View Project
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
      </svg>
    </a>
  </div>
</div>
```

---

### Update Project Links to Specific Pens
Replace the `href` on each `.project-link`:
```html
<!-- Before -->
<a class="project-link" href="https://codepen.io/SUTANTU DUTTA-HOLDINGS" ...>

<!-- After — link to a specific pen -->
<a class="project-link" href="https://codepen.io/SUTANTU DUTTA-HOLDINGS/pen/XXXXXXX" ...>
```

---

### Edit the Skills Panel
In `#about`, find the `.skills-panel` block and add/remove skill tags:
```html
<!-- Indigo (primary/hot skills) -->
<span class="skill-tag hot">React</span>

<!-- Mint (secondary/growing skills) -->
<span class="skill-tag warm">Node.js</span>

<!-- Default (peripheral/supporting) -->
<span class="skill-tag">Figma</span>
```

---

### Adjust the Particle Network Density
In the `<script>` section, find `const COUNT = 120;` and change it:
```js
const COUNT = 80;   // fewer nodes, lighter
const COUNT = 200;  // more nodes, denser (may impact low-end devices)
```

Also adjust the connection distance:
```js
const DIST = 130;   // increase for more connections, decrease for fewer
```

---

## 📧 Connecting a Real Email Backend

The contact form is currently client-side only (validates and shows a toast but doesn't send anywhere). To make it actually deliver messages, use one of these:

### Option A — Formspree (easiest, free tier available)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. Replace the `handleFormSubmit` function:

```js
async function handleFormSubmit() {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    showToast('⚠ Please fill in all fields.', '#ff5f8f');
    return;
  }

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    if (res.ok) {
      document.getElementById('form-name').value = '';
      document.getElementById('form-email').value = '';
      document.getElementById('form-message').value = '';
      showToast('✓ Message sent! Talk soon.', '#00e5c8');
    } else {
      showToast('⚠ Something went wrong. Try again.', '#ff5f8f');
    }
  } catch {
    showToast('⚠ Network error. Check your connection.', '#ff5f8f');
  }
}
```

---

### Option B — EmailJS (no backend, sends from your Gmail/Outlook)
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Add your EmailJS SDK in the `<head>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>emailjs.init("YOUR_PUBLIC_KEY");</script>
```
3. In `handleFormSubmit`, replace the fetch with:
```js
await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  from_name: name,
  from_email: email,
  message: message
});
```

---

## 🚢 Deployment

### Vercel (current — recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts. Your site will be live at a .vercel.app URL instantly.
```

Or use the Vercel dashboard:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo (`CYBER943/portfolio`)
3. Vercel detects it as a static site automatically
4. Click **Deploy** — done

Every future `git push` to `main` auto-deploys.

---

### GitHub Pages (free, no account needed beyond GitHub)
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select `main` branch and `/ (root)` folder
3. Click **Save**
4. Your site will be live at `https://CYBER943.github.io/portfolio/`

> Make sure your file is named `index.html`, not `sudantu-portfolio.html`

---

### Netlify (drag and drop)
1. Rename `sudantu-portfolio.html` to `index.html`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the file (or a folder containing it) onto the page
4. Live URL generated instantly — no account required for this method

---

## ⚡ Performance Notes

- **No layout shifts** — All animated elements use `transform` and `opacity` only (compositor-layer properties), never `top`, `left`, `width`, or `height`. Zero layout recalculation during animation.
- **Canvas efficiency** — The particle network uses a single flat `clearRect` + redraw loop. Node connections use early-exit distance checks to avoid O(n²) full-pair comparisons at scale.
- **Font loading** — Google Fonts loads asynchronously. No `font-display: block` used, so text renders with fallback immediately then swaps — no invisible text flash.
- **IntersectionObserver** — Scroll reveals use `IntersectionObserver` with `unobserve` after first trigger, so zero overhead after elements have animated in.
- **Backdrop filter note** — `backdrop-filter: blur()` on the navbar and cards is GPU-accelerated but can be expensive on older mobile devices. Remove it from `.skills-panel` and `.contact-form` if needed by deleting `backdrop-filter: blur(10px)` from those selectors.

---

## 🌍 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Opera 76+ | ✅ Full |
| IE 11 | ❌ Not supported (`CSS custom properties`, `Canvas`, `IntersectionObserver`) |

`backdrop-filter` has limited support in Firefox (requires enabling a flag in older versions). The site degrades gracefully — the glassmorphism effect simply shows a solid dark background instead.

---

## 🗺️ Roadmap

- [ ] Wire up contact form to Formspree or EmailJS
- [ ] Add a blog/writing section
- [ ] Add individual project detail pages or modals
- [ ] Implement a dark/light mode toggle
- [ ] Add more projects as they ship
- [ ] Add a resume/CV download button
- [ ] Create a `sitemap.xml` and `robots.txt` for SEO
- [ ] Add Open Graph meta tags for social sharing previews

---

## 🔗 Connect

| Platform | Link |
|---|---|
| 🌐 Portfolio | [sutantu.vercel.app](https://sutantu.vercel.app) |
| 🐙 GitHub | [github.com/CYBER943](https://github.com/CYBER943) |
| 🖊️ CodePen | [codepen.io/SUTANTU DUTTA-HOLDINGS](https://codepen.io/SUTANTU DUTTA-HOLDINGS) |

---

## 📜 License

```
MIT License

Copyright (c) 2026 Sutantu Dutta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

*Built with intent. Shipped with obsession.*

**⭐ If this helped you, star the repo.**

</div>
