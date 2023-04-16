import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  value: string;
}

const initialState: ISearchState = {
  value: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    update(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { update } = searchSlice.actions;
export default searchSlice.reducer;
