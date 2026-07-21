import { createServer } from 'vite';
async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  try {
    const main = await vite.ssrLoadModule('/src/main.tsx');
    console.log("Loaded main.tsx successfully!");
  } catch (e) {
    console.error("Error loading main.tsx:", e);
  }
  await vite.close();
}
run();
