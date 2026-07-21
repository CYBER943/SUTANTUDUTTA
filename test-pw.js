const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

async function run() {
  const server = spawn('npm', ['run', 'preview', '--', '--port', '4173'], { stdio: 'pipe' });
  
  await new Promise(r => setTimeout(r, 2000)); // wait for server
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:4173');
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
  server.kill();
}
run();
