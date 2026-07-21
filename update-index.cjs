const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

const headInsert = `
    <!-- Preloader Styles -->
    <style>
      body { margin: 0; background-color: #08090D; }
      #global-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #08090D;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .loader-ring-outer {
        position: absolute;
        width: 96px;
        height: 96px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: #FF5A36;
        border-right-color: #FF5A36;
        animation: spinOuter 4s linear infinite;
        opacity: 0.8;
      }
      .loader-ring-inner {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-bottom-color: rgba(255, 90, 54, 0.6);
        border-left-color: rgba(255, 90, 54, 0.6);
        animation: spinInner 3s linear infinite;
      }
      .loader-dot {
        width: 16px;
        height: 16px;
        background-color: #FF5A36;
        border-radius: 50%;
        animation: pulseDot 2s ease-in-out infinite;
        box-shadow: 0 0 15px rgba(255, 77, 77, 0.8);
        filter: blur(2px);
      }
      @keyframes spinOuter {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes spinInner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      @keyframes pulseDot {
        0%, 100% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1); opacity: 1; }
      }
      .loader-text {
        margin-top: 60px;
        font-family: monospace;
        font-size: 14px;
        letter-spacing: 0.3em;
        color: #B4B7C2;
        text-transform: uppercase;
        animation: fadeInText 1s ease-out 0.2s both;
      }
      @keyframes fadeInText {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .loader-bar-bg {
        margin-top: 10px;
        width: 128px;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 9999px;
        overflow: hidden;
        position: relative;
      }
      .loader-bar-fg {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        background: linear-gradient(to right, #FF5A36, #F97316);
        animation: loadBar 2s ease-in-out infinite;
      }
      @keyframes loadBar {
        0% { width: 0%; }
        50% { width: 100%; }
        100% { width: 0%; left: 100%; }
      }
      .loader-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40vw;
        height: 40vw;
        background-color: rgba(255, 90, 54, 0.05);
        border-radius: 50%;
        filter: blur(100px);
        pointer-events: none;
      }
    </style>
  </head>`;

const bodyInsert = `
  <body>
    <div id="global-preloader">
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 96px; height: 96px; z-index: 10;">
        <div class="loader-ring-outer"></div>
        <div class="loader-ring-inner"></div>
        <div class="loader-dot"></div>
      </div>
      <div class="loader-text">Initializing</div>
      <div class="loader-bar-bg">
        <div class="loader-bar-fg"></div>
      </div>
      <div class="loader-glow"></div>
    </div>`;

html = html.replace('</head>', headInsert);
html = html.replace('<body>', bodyInsert);
fs.writeFileSync('index.html', html);
console.log('Updated index.html');
