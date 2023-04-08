import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grocery: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    items: null,
  },
};

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    setGrocery: (state, action) => {
        state.grocery=action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGrocery } = grocerySlice.actions;
export const selectGrocery = (state) => state.grocery.items;
export default grocerySlice.reducer;