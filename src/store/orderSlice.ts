import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BasketLine } from './basketSlice';

export type PaymentMethod = 'mpesa-on-delivery' | 'cash-on-delivery';

export interface Order {
  reference: string;
  restaurantId: string;
  lines: BasketLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  placedAt: number;
}

export interface OrderState {
  current: Order | null;
}

const initialState: OrderState = { current: null };

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderPlaced(state, action: PayloadAction<Order>) {
      state.current = action.payload;
    },
    orderClosed(state) {
      state.current = null;
    },
  },
});

export const { orderPlaced, orderClosed } = orderSlice.actions;
export default orderSlice.reducer;
