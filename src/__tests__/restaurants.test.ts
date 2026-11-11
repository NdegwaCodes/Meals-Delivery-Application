import { artKeys } from '@/components/DishArt';
import { categories, featuredRows, findRestaurant, restaurants, searchRestaurants } from '@/data/restaurants';
import { formatKES, formatMinutes } from '@/lib/format';

const ids = (list: { id: string }[]) => list.map((entry) => entry.id);

describe('search', () => {
  it('returns everything for an empty query and no category', () => {
    expect(searchRestaurants('', null)).toHaveLength(restaurants.length);
  });

  it('matches restaurant names, cuisines, areas and dishes, ignoring case', () => {
    expect(ids(searchRestaurants('PWANI', null))).toEqual(['pwani-kitchen']);
    expect(ids(searchRestaurants('pizza', null))).toContain('slice-lavington');
    expect(ids(searchRestaurants('westlands', null))).toEqual(['pwani-kitchen']);
    expect(ids(searchRestaurants('githeri', null))).toEqual(['mama-wanjiku']);
  });

  it('filters by category and combines with the query', () => {
    expect(ids(searchRestaurants('', 'breakfast')).sort()).toEqual(['green-bowl', 'kahawa-house']);
    expect(ids(searchRestaurants('juice', 'breakfast'))).toEqual(['green-bowl']);
    expect(searchRestaurants('pizza', 'swahili')).toEqual([]);
  });
});

describe('catalogue data', () => {
  it('has unique restaurant and menu item ids', () => {
    const restaurantIds = ids(restaurants);
    const itemIds = restaurants.flatMap((restaurant) => ids(restaurant.menu));
    expect(new Set(restaurantIds).size).toBe(restaurantIds.length);
    expect(new Set(itemIds).size).toBe(itemIds.length);
  });

  it('only uses artwork, categories and restaurants that exist', () => {
    const categoryIds = ids(categories);
    for (const restaurant of restaurants) {
      expect(artKeys).toContain(restaurant.art);
      restaurant.categories.forEach((category) => expect(categoryIds).toContain(category));
      restaurant.menu.forEach((item) => expect(artKeys).toContain(item.art));
    }
    categories.forEach((category) => expect(artKeys).toContain(category.art));
    featuredRows.forEach((row) => row.restaurantIds.forEach((id) => expect(findRestaurant(id)).toBeDefined()));
  });

  it('prices everything in whole, positive shillings and places restaurants in Nairobi', () => {
    for (const restaurant of restaurants) {
      expect(restaurant.deliveryFee).toBeGreaterThan(0);
      expect(restaurant.etaMinutes[0]).toBeLessThan(restaurant.etaMinutes[1]);
      expect(restaurant.latitude).toBeGreaterThan(-1.45);
      expect(restaurant.latitude).toBeLessThan(-1.15);
      restaurant.menu.forEach((item) => {
        expect(Number.isInteger(item.price)).toBe(true);
        expect(item.price).toBeGreaterThan(0);
      });
    }
  });
});

describe('formatting', () => {
  it('formats shillings and minutes', () => {
    expect(formatKES(1250)).toBe('KSh 1,250');
    expect(formatKES(99.6)).toBe('KSh 100');
    expect(formatMinutes([25, 35])).toBe('25-35 min');
  });
});
