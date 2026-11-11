import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem } from '@/data/restaurants';

export interface BasketLine {
  item: MenuItem;
  quantity: number;
}

export interface BasketState {
  restaurantId: string | null;
  lines: BasketLine[];
}

const initialState: BasketState = { restaurantId: null, lines: [] };

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ restaurantId: string; item: MenuItem }>) {
      const { restaurantId, item } = action.payload;
      if (state.restaurantId !== restaurantId) {
        state.restaurantId = restaurantId;
        state.lines = [];
      }
      const line = state.lines.find((entry) => entry.item.id === item.id);
      if (line) {
        line.quantity += 1;
      } else {
        state.lines.push({ item, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<{ itemId: string }>) {
      const line = state.lines.find((entry) => entry.item.id === action.payload.itemId);
      if (!line) {
        return;
      }
      line.quantity -= 1;
      if (line.quantity <= 0) {
        state.lines = state.lines.filter((entry) => entry.item.id !== action.payload.itemId);
      }
      if (state.lines.length === 0) {
        state.restaurantId = null;
      }
    },
    clearBasket() {
      return initialState;
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
