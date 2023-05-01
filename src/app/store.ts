import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import searchReducer from '../feature/search/search-slice';
import searchResultsReducer from '../feature/search-results/search-results-slice';
import submittedFormsReducer from '../feature/submitted-forms/submitted-forms-slice';
import { apiSlice } from '../feature/characters/characters-api-slice';
import { apiServerSlice } from './serverApi';

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsReducer,
  submittedForms: submittedFormsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiServerSlice.reducerPath]: apiServerSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware).concat(apiServerSlice.middleware);
    },
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
