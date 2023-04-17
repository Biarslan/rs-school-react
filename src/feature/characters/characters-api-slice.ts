import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { updateCharacterList } from '../search-results/search-results-slice';
import { IAPIResponse } from '../../types/api';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
  }),
  endpoints(builder) {
    return {
      fetchCharacters: builder.query<IAPIResponse, string>({
        query(name) {
          return `/character/?name=${name}`;
        },
        async onQueryStarted(name, { dispatch, queryFulfilled }) {
          dispatch(updateCharacterList([]));
          try {
            const data = await queryFulfilled;
            dispatch(updateCharacterList(data.data.results));
          } catch (err) {
            dispatch(updateCharacterList([]));
          }
        },
      }),
    };
  },
});

export const { useFetchCharactersQuery } = apiSlice;
