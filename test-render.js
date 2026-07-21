import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: "http://localhost/" });
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  configurable: true
});

import { createServer } from 'vite';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  
  try {
    const main = await vite.ssrLoadModule('/src/main.tsx');
    console.log("main.tsx loaded successfully");
  } catch (e) {
    console.error("Error during rendering:", e);
  }
  await vite.close();
}
run();
