import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8')
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }
    // const rendered = await render('/' + url, ssrManifest);
    const { stream, prefetchedChars } = await render('/' + url, {
      onAllReady() {
        const html = template.replace(
          `<!--app-initial-state-->`,
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(prefetchedChars)}</script>`
        );
        const parts = html.split('<!--app-html-->');
        res.write(parts[0]);
        stream.pipe(res);
        res.write(parts[1]);
        res.end();
      },
    });
  } catch (e) {
    console.log(e);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
