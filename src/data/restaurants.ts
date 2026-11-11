import type { ArtKey } from '@/components/DishArt';

export type CategoryId =
  | 'kenyan'
  | 'nyama-choma'
  | 'swahili'
  | 'pizza'
  | 'burgers'
  | 'healthy'
  | 'breakfast';

export interface Category {
  id: CategoryId;
  name: string;
  art: ArtKey;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  art: ArtKey;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  categories: CategoryId[];
  area: string;
  address: string;
  rating: number;
  reviews: number;
  deliveryFee: number;
  etaMinutes: [number, number];
  latitude: number;
  longitude: number;
  description: string;
  art: ArtKey;
  tint: string;
  menu: MenuItem[];
}

export interface FeaturedRowSpec {
  id: string;
  title: string;
  description: string;
  restaurantIds: string[];
}

export const categories: Category[] = [
  { id: 'kenyan', name: 'Kenyan', art: 'githeri' },
  { id: 'nyama-choma', name: 'Nyama Choma', art: 'choma' },
  { id: 'swahili', name: 'Swahili', art: 'biryani' },
  { id: 'pizza', name: 'Pizza', art: 'pizza' },
  { id: 'burgers', name: 'Burgers', art: 'burger' },
  { id: 'healthy', name: 'Healthy', art: 'bowl' },
  { id: 'breakfast', name: 'Breakfast', art: 'coffee' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'choma-corner',
    name: 'Choma Corner',
    cuisine: 'Grill',
    categories: ['nyama-choma', 'kenyan'],
    area: 'Kilimani',
    address: 'Argwings Kodhek Road, Kilimani',
    rating: 4.6,
    reviews: 412,
    deliveryFee: 150,
    etaMinutes: [35, 45],
    latitude: -1.2905,
    longitude: 36.7856,
    description: 'Goat and beef roasted slowly over charcoal, served with kachumbari and ugali.',
    art: 'choma',
    tint: '#FDE2CF',
    menu: [
      { id: 'cc-goat', name: 'Goat Nyama Choma, 1/2 kg', description: 'Charcoal-roasted goat ribs and leg, salted and served with kachumbari.', price: 950, art: 'choma' },
      { id: 'cc-beef', name: 'Beef Nyama Choma, 1/2 kg', description: 'Tender beef cuts roasted to order.', price: 850, art: 'choma' },
      { id: 'cc-ugali', name: 'Ugali', description: 'Firm white maize ugali, enough for two.', price: 120, art: 'ugali' },
      { id: 'cc-kachumbari', name: 'Kachumbari', description: 'Tomato, onion, coriander and chilli.', price: 150, art: 'salad' },
      { id: 'cc-mukimo', name: 'Mukimo', description: 'Mashed potato, maize, peas and pumpkin leaves.', price: 250, art: 'githeri' },
      { id: 'cc-soda', name: 'Soda, 500 ml', description: 'Ice cold.', price: 100, art: 'juice' },
    ],
  },
  {
    id: 'pwani-kitchen',
    name: 'Pwani Kitchen',
    cuisine: 'Swahili',
    categories: ['swahili', 'kenyan'],
    area: 'Westlands',
    address: 'Woodvale Grove, Westlands',
    rating: 4.7,
    reviews: 538,
    deliveryFee: 180,
    etaMinutes: [40, 50],
    latitude: -1.2676,
    longitude: 36.8065,
    description: 'Coastal cooking: fragrant biryani, pilau, coconut fish curry and fresh mahamri.',
    art: 'biryani',
    tint: '#FCE7C8',
    menu: [
      { id: 'pk-biryani', name: 'Chicken Biryani', description: 'Spiced rice layered with slow-cooked chicken and fried onions.', price: 650, art: 'biryani' },
      { id: 'pk-pilau', name: 'Beef Pilau', description: 'Rice cooked in pilau masala with beef, served with kachumbari.', price: 550, art: 'pilau' },
      { id: 'pk-samaki', name: 'Samaki wa Kupaka', description: 'Grilled fish in a creamy coconut and tamarind sauce.', price: 900, art: 'fish' },
      { id: 'pk-viazi', name: 'Viazi Karai', description: 'Battered potatoes with tamarind chutney.', price: 200, art: 'fries' },
      { id: 'pk-mahamri', name: 'Mahamri, 4 pieces', description: 'Cardamom and coconut doughnuts.', price: 160, art: 'chapati' },
      { id: 'pk-madafu', name: 'Madafu', description: 'Fresh coconut water.', price: 150, art: 'juice' },
    ],
  },
  {
    id: 'mama-wanjiku',
    name: "Mama Wanjiku's Kitchen",
    cuisine: 'Kenyan home cooking',
    categories: ['kenyan'],
    area: 'Ngara',
    address: 'Desai Road, Ngara',
    rating: 4.5,
    reviews: 289,
    deliveryFee: 120,
    etaMinutes: [25, 35],
    latitude: -1.274,
    longitude: 36.824,
    description: 'Everyday Kenyan food the way it is made at home, at prices that make sense.',
    art: 'githeri',
    tint: '#E9F2DD',
    menu: [
      { id: 'mw-githeri', name: 'Githeri', description: 'Maize and beans stewed with tomato and onion.', price: 250, art: 'githeri' },
      { id: 'mw-chapati', name: 'Chapati, 2 pieces', description: 'Soft layered chapati, cooked fresh.', price: 100, art: 'chapati' },
      { id: 'mw-stew', name: 'Beef Stew', description: 'Beef simmered with potatoes and carrots.', price: 400, art: 'stew' },
      { id: 'mw-sukuma', name: 'Sukuma Wiki', description: 'Kale sauteed with onion and tomato.', price: 120, art: 'salad' },
      { id: 'mw-matoke', name: 'Matoke', description: 'Green bananas cooked in a light tomato sauce.', price: 300, art: 'stew' },
      { id: 'mw-chai', name: 'Chai', description: 'Spiced milk tea.', price: 80, art: 'coffee' },
    ],
  },
  {
    id: 'kona-burgers',
    name: 'Kona Burgers',
    cuisine: 'Burgers',
    categories: ['burgers'],
    area: 'CBD',
    address: 'Kimathi Street, CBD',
    rating: 4.4,
    reviews: 361,
    deliveryFee: 150,
    etaMinutes: [25, 35],
    latitude: -1.2841,
    longitude: 36.8233,
    description: 'Smash burgers, crispy chicken and hand-cut fries.',
    art: 'burger',
    tint: '#FDE68A',
    menu: [
      { id: 'kb-classic', name: 'Classic Smash Burger', description: 'Double beef patty, cheese, pickles and house sauce.', price: 750, art: 'burger' },
      { id: 'kb-chicken', name: 'Crispy Chicken Burger', description: 'Buttermilk fried chicken with slaw.', price: 700, art: 'burger' },
      { id: 'kb-fries', name: 'Masala Fries', description: 'Hand-cut fries tossed in masala sauce.', price: 300, art: 'fries' },
      { id: 'kb-shake', name: 'Vanilla Milkshake', description: 'Thick and cold.', price: 400, art: 'juice' },
    ],
  },
  {
    id: 'slice-lavington',
    name: 'Slice Lavington',
    cuisine: 'Pizza',
    categories: ['pizza'],
    area: 'Lavington',
    address: 'James Gichuru Road, Lavington',
    rating: 4.5,
    reviews: 247,
    deliveryFee: 200,
    etaMinutes: [35, 45],
    latitude: -1.279,
    longitude: 36.769,
    description: 'Wood-fired pizza with a thin, blistered crust.',
    art: 'pizza',
    tint: '#FBD5D5',
    menu: [
      { id: 'sl-margherita', name: 'Margherita', description: 'Tomato, mozzarella and basil.', price: 850, art: 'pizza' },
      { id: 'sl-bbq', name: 'BBQ Chicken', description: 'Smoky chicken, red onion and barbecue sauce.', price: 1100, art: 'pizza' },
      { id: 'sl-veggie', name: 'Garden Veggie', description: 'Peppers, mushrooms, olives and spinach.', price: 950, art: 'pizza' },
      { id: 'sl-garlic', name: 'Garlic Bread', description: 'With herb butter.', price: 350, art: 'chapati' },
    ],
  },
  {
    id: 'green-bowl',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    categories: ['healthy', 'breakfast'],
    area: 'Karen',
    address: 'Langata South Road, Karen',
    rating: 4.8,
    reviews: 198,
    deliveryFee: 220,
    etaMinutes: [40, 55],
    latitude: -1.3197,
    longitude: 36.7073,
    description: 'Bowls, salads and fresh juice made with produce from nearby farms.',
    art: 'bowl',
    tint: '#D9F2E3',
    menu: [
      { id: 'gb-bowl', name: 'Harvest Bowl', description: 'Brown rice, roast pumpkin, avocado, greens and tahini.', price: 850, art: 'bowl' },
      { id: 'gb-salad', name: 'Avocado and Greens Salad', description: 'With toasted seeds and lemon dressing.', price: 650, art: 'salad' },
      { id: 'gb-toast', name: 'Avocado Toast', description: 'Sourdough, smashed avocado and chilli flakes.', price: 600, art: 'chapati' },
      { id: 'gb-juice', name: 'Passion and Mango Juice', description: 'Freshly squeezed, no added sugar.', price: 300, art: 'juice' },
    ],
  },
  {
    id: 'kahawa-house',
    name: 'Kahawa House',
    cuisine: 'Breakfast and coffee',
    categories: ['breakfast'],
    area: 'Upper Hill',
    address: 'Hospital Road, Upper Hill',
    rating: 4.6,
    reviews: 305,
    deliveryFee: 150,
    etaMinutes: [20, 30],
    latitude: -1.2987,
    longitude: 36.8155,
    description: 'Kenyan AA coffee and all-day breakfast.',
    art: 'coffee',
    tint: '#EADBC8',
    menu: [
      { id: 'kh-coffee', name: 'Kenyan AA Filter Coffee', description: 'Single origin from Nyeri.', price: 250, art: 'coffee' },
      { id: 'kh-breakfast', name: 'Full Breakfast', description: 'Eggs, sausages, toast, beans and fruit.', price: 750, art: 'breakfast' },
      { id: 'kh-pancakes', name: 'Pancakes', description: 'With honey and fresh fruit.', price: 500, art: 'breakfast' },
      { id: 'kh-smoothie', name: 'Banana Smoothie', description: 'Banana, yoghurt and honey.', price: 400, art: 'juice' },
    ],
  },
];

export const featuredRows: FeaturedRowSpec[] = [
  {
    id: 'popular',
    title: 'Popular near you',
    description: 'The kitchens Nairobi orders from most',
    restaurantIds: ['pwani-kitchen', 'choma-corner', 'green-bowl', 'kahawa-house'],
  },
  {
    id: 'kenyan-favourites',
    title: 'Kenyan favourites',
    description: 'Nyama choma, pilau, githeri and chapati',
    restaurantIds: ['mama-wanjiku', 'choma-corner', 'pwani-kitchen'],
  },
  {
    id: 'quick-bites',
    title: 'Quick bites',
    description: 'Burgers, pizza and coffee in under 45 minutes',
    restaurantIds: ['kona-burgers', 'slice-lavington', 'kahawa-house'],
  },
];

export function findRestaurant(id: string | undefined): Restaurant | undefined {
  return restaurants.find((restaurant) => restaurant.id === id);
}

export function searchRestaurants(
  query: string,
  category: CategoryId | null,
  source: Restaurant[] = restaurants
): Restaurant[] {
  const term = query.trim().toLowerCase();
  return source.filter((restaurant) => {
    if (category && !restaurant.categories.includes(category)) {
      return false;
    }
    if (!term) {
      return true;
    }
    return (
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.cuisine.toLowerCase().includes(term) ||
      restaurant.area.toLowerCase().includes(term) ||
      restaurant.menu.some((item) => item.name.toLowerCase().includes(term))
    );
  });
}
