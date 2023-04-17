import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../../types/Character';

interface ISearchResultsState {
  value: ICharacter[];
}

const initialState: ISearchResultsState = {
  value: [],
};

const searchResultsSlice = createSlice({
  name: 'search-results',
  initialState,
  reducers: {
    updateCharacterList(state, action: PayloadAction<ICharacter[]>) {
      state.value = action.payload;
    },
  },
});

export const { updateCharacterList } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
