import reducer, { addItem, clearBasket, removeItem, type BasketState } from '@/store/basketSlice';
import {
  basketCount,
  basketSubtotal,
  deliveryProgress,
  deliveryStage,
  estimatedArrival,
  orderReference,
  quantityOf,
} from '@/lib/basket';
import { findRestaurant } from '@/data/restaurants';

const choma = findRestaurant('choma-corner')!;
const pwani = findRestaurant('pwani-kitchen')!;
const goat = choma.menu[0];
const ugali = choma.menu[2];
const biryani = pwani.menu[0];

const empty: BasketState = { restaurantId: null, lines: [] };

describe('basket slice', () => {
  it('adds items and counts repeated adds as quantity', () => {
    let state = reducer(empty, addItem({ restaurantId: choma.id, item: goat }));
    state = reducer(state, addItem({ restaurantId: choma.id, item: goat }));
    state = reducer(state, addItem({ restaurantId: choma.id, item: ugali }));
    expect(state.restaurantId).toBe(choma.id);
    expect(quantityOf(state.lines, goat.id)).toBe(2);
    expect(basketCount(state.lines)).toBe(3);
    expect(basketSubtotal(state.lines)).toBe(goat.price * 2 + ugali.price);
  });

  it('starts a new basket when an item comes from another restaurant', () => {
    let state = reducer(empty, addItem({ restaurantId: choma.id, item: goat }));
    state = reducer(state, addItem({ restaurantId: pwani.id, item: biryani }));
    expect(state.restaurantId).toBe(pwani.id);
    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].item.id).toBe(biryani.id);
  });

  it('removes one at a time and forgets the restaurant when empty', () => {
    let state = reducer(empty, addItem({ restaurantId: choma.id, item: goat }));
    state = reducer(state, addItem({ restaurantId: choma.id, item: goat }));
    state = reducer(state, removeItem({ itemId: goat.id }));
    expect(quantityOf(state.lines, goat.id)).toBe(1);
    state = reducer(state, removeItem({ itemId: goat.id }));
    expect(state).toEqual(empty);
  });

  it('ignores removing something that is not in the basket', () => {
    const state = reducer(empty, removeItem({ itemId: 'missing' }));
    expect(state).toEqual(empty);
  });

  it('clears everything', () => {
    const state = reducer(reducer(empty, addItem({ restaurantId: choma.id, item: goat })), clearBasket());
    expect(state).toEqual(empty);
  });
});

describe('delivery tracking', () => {
  const placedAt = Date.UTC(2026, 10, 11, 12, 0, 0);

  it('estimates the arrival window from the restaurant ETA', () => {
    const [earliest, latest] = estimatedArrival(placedAt, [35, 45]);
    expect(earliest.getTime() - placedAt).toBe(35 * 60_000);
    expect(latest.getTime() - placedAt).toBe(45 * 60_000);
  });

  it('moves through the stages as time passes', () => {
    const at = (minutes: number) => deliveryStage(deliveryProgress(placedAt, [35, 45], placedAt + minutes * 60_000));
    expect(at(0)).toBe(0);
    expect(at(10)).toBe(1);
    expect(at(30)).toBe(2);
    expect(at(40)).toBe(3);
    expect(at(90)).toBe(3);
  });

  it('never reports progress outside 0 to 1', () => {
    expect(deliveryProgress(placedAt, [20, 30], placedAt - 60_000)).toBe(0);
    expect(deliveryProgress(placedAt, [20, 30], placedAt + 999 * 60_000)).toBe(1);
  });

  it('builds a short order reference', () => {
    expect(orderReference(placedAt)).toMatch(/^MLO-[0-9A-Z]{6}$/);
  });
});
