import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
      }),
    };
  },
});

export const { useFetchCharactersQuery } = apiSlice;
