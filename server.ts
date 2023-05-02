import fs from 'node:fs/promises';
import express from 'express';
import { createServer } from 'vite';
import { IRender } from './src/entry-server';

const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const app = express();

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  base,
});
app.use(vite.middlewares);

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    let template: string;

    template = await fs.readFile('./index.html', 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    const render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render as IRender;

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
