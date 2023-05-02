import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormCard } from '../../types/Form';

interface ISubmittedFormsState {
  value: IFormCard[];
}

const initialState: ISubmittedFormsState = {
  value: [],
};

const submittedFormsSlice = createSlice({
  name: 'submitted-forms',
  initialState,
  reducers: {
    addSubmittedForm(state, action: PayloadAction<IFormCard>) {
      state.value.push(action.payload);
    },
  },
});

export const { addSubmittedForm } = submittedFormsSlice.actions;
export default submittedFormsSlice.reducer;
