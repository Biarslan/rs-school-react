import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import searchReducer from '../feature/search/search-slice';
import searchResultsReducer from '../feature/search-results/search-results-slice';
import submittedFormsReducer from '../feature/submitted-forms/submitted-forms-slice';
import { apiSlice } from '../feature/characters/characters-api-slice';

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsReducer,
  submittedForms: submittedFormsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    },
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
