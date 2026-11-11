import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import RootLayout from '@/app/_layout';
import HomeScreen from '@/app/index';
import RestaurantScreen from '@/app/restaurant/[id]';
import BasketScreen from '@/app/basket';
import PreparingScreen from '@/app/preparing';
import DeliveryScreen from '@/app/delivery';
import { store } from '@/store/store';
import { addItem, clearBasket } from '@/store/basketSlice';
import { findRestaurant } from '@/data/restaurants';
import { orderClosed } from '@/store/orderSlice';

jest.mock('react-native-maps', () => {
  const { View } = jest.requireActual('react-native');
  const MapView = (props: object) => <View {...props} />;
  const Stub = () => null;
  return { __esModule: true, default: MapView, Marker: Stub, Polyline: Stub };
});

const routes = {
  _layout: RootLayout,
  index: HomeScreen,
  'restaurant/[id]': RestaurantScreen,
  basket: BasketScreen,
  preparing: PreparingScreen,
  delivery: DeliveryScreen,
};

beforeEach(() => {
  store.dispatch(clearBasket());
  store.dispatch(orderClosed());
});

describe('ordering flow', () => {
  it('searches, opens a restaurant, fills the basket and places an order', async () => {
    await renderRouter(routes, { initialUrl: '/' });

    await fireEvent.changeText(screen.getByLabelText('Search restaurants and dishes'), 'biryani');
    expect(screen.getByText(/1 place matching "biryani"/)).toBeTruthy();

    await fireEvent.press(screen.getByLabelText(/^Pwani Kitchen, Swahili/));
    expect(screen).toHavePathname('/restaurant/pwani-kitchen');

    await fireEvent.press(screen.getByLabelText('Add one Chicken Biryani'));
    await fireEvent.press(screen.getByLabelText('Add one Chicken Biryani'));
    await fireEvent.press(screen.getByLabelText('Add one Madafu'));
    expect(screen.getByLabelText('View basket, 3 items, KSh 1,450')).toBeTruthy();

    await fireEvent.press(screen.getByLabelText('View basket, 3 items, KSh 1,450'));
    expect(screen).toHavePathname('/basket');
    expect(screen.getByText('Place order · KSh 1,630')).toBeTruthy();

    await fireEvent.press(screen.getByText('Cash on delivery'));
    jest.useFakeTimers();
    await fireEvent.press(screen.getByText('Place order · KSh 1,630'));
    expect(screen).toHavePathname('/preparing');
    expect(store.getState().basket.lines).toHaveLength(0);
    expect(store.getState().order.current).toMatchObject({
      restaurantId: 'pwani-kitchen',
      subtotal: 1450,
      deliveryFee: 180,
      total: 1630,
      paymentMethod: 'cash-on-delivery',
    });

    await act(async () => {
      jest.advanceTimersByTime(3600);
    });
    expect(screen).toHavePathname('/delivery');
    expect(screen.getByText('Pay in cash')).toBeTruthy();
    expect(screen.getByText('KSh 1,630')).toBeTruthy();
    jest.useRealTimers();
  });

  it('asks before replacing a basket from another restaurant', async () => {
    const ugali = findRestaurant('choma-corner')!.menu[2];
    store.dispatch(addItem({ restaurantId: 'choma-corner', item: ugali }));
    await renderRouter(routes, { initialUrl: '/restaurant/kona-burgers' });

    await fireEvent.press(screen.getByLabelText('Add one Masala Fries'));
    expect(screen.getByText('Start a new basket?')).toBeTruthy();
    await fireEvent.press(screen.getByText('Keep basket'));
    expect(store.getState().basket.restaurantId).toBe('choma-corner');

    await fireEvent.press(screen.getByLabelText('Add one Masala Fries'));
    await fireEvent.press(screen.getByText('Start new basket'));
    expect(store.getState().basket.restaurantId).toBe('kona-burgers');
    expect(store.getState().basket.lines).toHaveLength(1);
  });
});
