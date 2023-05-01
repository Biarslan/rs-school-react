import fs from 'node:fs/promises';
import express from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';

const app = express();

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

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }
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

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
