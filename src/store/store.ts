import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import orderReducer from './orderSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      basket: basketReducer,
      order: orderReducer,
    },
  });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
