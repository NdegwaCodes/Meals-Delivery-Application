import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./features/basketSlice";
import groceryReducer from "./features/grocerySlice";


export const store = configureStore({
  reducer: {
    basket: basketReducer,
    grocery: groceryReducer,
  },
});