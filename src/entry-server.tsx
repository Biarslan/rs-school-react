import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import { apiServerSlice } from './app/serverApi';
import App from './App';

export async function render(url: string, options?: object) {
  const store = setupStore();
  const prefetchedChars = (await store.dispatch(apiServerSlice.endpoints.getAllChars.initiate('')))
    .data.results;

  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
    options
  );

  return { stream, prefetchedChars };
}
