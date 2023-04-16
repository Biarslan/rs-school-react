import { setupStore } from './store';

describe('store', () => {
  it('should create a store with the correct reducer', () => {
    const store = setupStore();
    expect(store.getState().search.value).toEqual('');
  });

  it('should be able to handle preloaded state', () => {
    const preloadedState = {
      search: { value: 'TestName' },
      searchResults: { value: [] },
      submittedForms: { value: [] },
    };
    const store = setupStore(preloadedState);
    expect(store.getState().search.value).toEqual('TestName');
  });
});
