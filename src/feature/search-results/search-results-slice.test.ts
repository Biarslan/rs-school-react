import searchResultsReducer, { updateCharacterList } from './search-results-slice';

import { testCharacter } from '../../utils/test-data';

describe('searchResultsReducer', () => {
  it('should return the initial state', () => {
    const initialState = { value: [] };
    const action = { type: 'unknown' };
    const state = searchResultsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle updateCharacterList', () => {
    const initialState = { value: [] };
    const action = updateCharacterList([testCharacter]);
    const state = searchResultsReducer(initialState, action);
    expect(state.value).toEqual([testCharacter]);
  });
});
