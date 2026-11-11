import type { Restaurant } from '@/data/restaurants';
import type { BasketLine } from '@/store/basketSlice';
import type { Order, PaymentMethod } from '@/store/orderSlice';

export function basketCount(lines: BasketLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export function basketSubtotal(lines: BasketLine[]): number {
  return lines.reduce((total, line) => total + line.item.price * line.quantity, 0);
}

export function quantityOf(lines: BasketLine[], itemId: string): number {
  return lines.find((line) => line.item.id === itemId)?.quantity ?? 0;
}

export function orderReference(now: number): string {
  return `MLO-${now.toString(36).toUpperCase().slice(-6)}`;
}

export function estimatedArrival(placedAt: number, etaMinutes: [number, number]): [Date, Date] {
  return [
    new Date(placedAt + etaMinutes[0] * 60_000),
    new Date(placedAt + etaMinutes[1] * 60_000),
  ];
}

export const stages = ['Confirmed', 'Preparing', 'On the way', 'Delivered'] as const;

export function deliveryProgress(placedAt: number, etaMinutes: [number, number], now: number): number {
  const expected = ((etaMinutes[0] + etaMinutes[1]) / 2) * 60_000;
  if (expected <= 0) {
    return 1;
  }
  return Math.min(1, Math.max(0, (now - placedAt) / expected));
}

export function deliveryStage(progress: number): number {
  if (progress >= 1) {
    return 3;
  }
  if (progress >= 0.55) {
    return 2;
  }
  if (progress >= 0.1) {
    return 1;
  }
  return 0;
}

export function buildOrder(
  restaurant: Restaurant,
  lines: BasketLine[],
  paymentMethod: PaymentMethod,
  now: number = Date.now()
): Order {
  const subtotal = basketSubtotal(lines);
  return {
    reference: orderReference(now),
    restaurantId: restaurant.id,
    lines,
    subtotal,
    deliveryFee: restaurant.deliveryFee,
    total: subtotal + restaurant.deliveryFee,
    paymentMethod,
    placedAt: now,
  };
}
