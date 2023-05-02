import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import { apiServerSlice } from './app/serverApi';
import { ICharacter } from './types/Character';
import App from './App';

export interface IRender {
  (url: string, options?: ReactDOMServer.RenderToPipeableStreamOptions): Promise<{
    stream: ReactDOMServer.PipeableStream;
    prefetchedChars: ICharacter[];
  }>;
}

export const render: IRender = async (url, options) => {
  const store = setupStore();
  const prefetchedChars: ICharacter[] = (
    await store.dispatch(apiServerSlice.endpoints.getAllChars.initiate(''))
  ).data.results;

  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
    options
  );

  return { stream, prefetchedChars };
};
