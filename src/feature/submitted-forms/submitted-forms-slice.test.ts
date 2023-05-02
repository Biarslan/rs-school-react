import submittedFormsReducer, { addSubmittedForm } from './submitted-forms-slice';

describe('submittedFormsReducer', () => {
  it('should return the initial state', () => {
    const initialState = { value: [] };
    const action = { type: 'unknown' };
    const state = submittedFormsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle addSubmittedForm', () => {
    const initialState = { value: [] };
    const form = {
      name: 'John Doe',
      date: 1625728629000,
      sex: 'male',
      isReactLiked: true,
      language: 'JavaScript',
      image: 'https://example.com/image.jpg',
    };
    const action = addSubmittedForm(form);
    const state = submittedFormsReducer(initialState, action);
    expect(state.value).toEqual([form]);
  });
});
