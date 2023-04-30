import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';

export function render(url: string) {
  console.log('YRL', url);
  const store = setupStore();
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
  console.log(html);

  return { html };
}
