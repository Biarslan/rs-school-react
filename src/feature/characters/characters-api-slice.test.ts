import { apiSlice } from './characters-api-slice';
import { it } from 'vitest';

describe('apiSlice', () => {
  it('should have the correct reducerPath', () => {
    expect(apiSlice.reducerPath).toEqual('api');
  });

  it('should have the fetchCharacters endpoint', () => {
    expect(apiSlice.endpoints.fetchCharacters).toBeDefined();
  });
});
