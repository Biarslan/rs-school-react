import { fetch, Headers, Request, Response } from 'cross-fetch';
import { updateCharacterList } from '../feature/search-results/search-results-slice';
Object.assign(globalThis, {
  fetch: fetch,
  Headers: Headers,
  Request: Request,
  Response: Response,
  AbortController: AbortController,
});

import {
  buildCreateApi,
  coreModule,
  reactHooksModule,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const apiServerSlice = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
    fetchFn: fetch,
  }),
  endpoints: (builder) => ({
    getAllChars: builder.query({
      query(name) {
        return `/character/?name=${name}`;
      },
      async onQueryStarted(name, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(updateCharacterList(data.data.results));
        } catch (err) {
          dispatch(updateCharacterList([]));
        }
      },
    }),
  }),
});
