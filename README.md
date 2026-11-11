# Mlo

[![CI](https://github.com/NdegwaCodes/Meals-Delivery-Application/actions/workflows/ci.yml/badge.svg)](https://github.com/NdegwaCodes/Meals-Delivery-Application/actions/workflows/ci.yml)

A food delivery app for Nairobi, built with Expo and React Native. Browse kitchens across the city, search by dish or area, fill a basket, choose to pay by M-Pesa or cash on delivery, and follow the order on a live map.

*Mlo* is Swahili for "meal".

## Features

- **Home:** featured rows ("Popular near you", "Kenyan favourites", "Quick bites"), category chips and a full restaurant list
- **Search:** matches restaurant names, cuisines, neighbourhoods and individual dishes, combined with a category filter
- **Restaurant pages:** rating, address, delivery time and fee, and a menu with add and remove controls
- **One kitchen per order:** adding food from a second restaurant asks before replacing the basket
- **Basket:** delivery address, M-Pesa or cash on delivery, subtotal, delivery fee and total in KES
- **Order tracking:** an estimated arrival window, progress through Confirmed, Preparing, On the way and Delivered, and a map of the route (native maps on Android and iOS, a drawn map on the web)
- Seven Nairobi kitchens with real dishes (nyama choma, biryani, pilau, githeri, chapati) and artwork drawn in SVG

This is a portfolio demo: orders stay on the device and are never sent to a restaurant.

## Tech stack

| Area | Technology |
| --- | --- |
| App | Expo SDK 58, React Native 0.88, React 19, TypeScript (strict) |
| Navigation | Expo Router (file-based routes, modal and full-screen modal presentation) |
| State | Redux Toolkit with typed hooks |
| Maps and graphics | react-native-maps, react-native-svg |
| Quality | Jest (jest-expo), React Native Testing Library, Expo Router testing library, ESLint, GitHub Actions |

## Project structure

```
src/
  app/                 routes: index, restaurant/[id], basket, preparing, delivery
  components/          cards, rows, basket bar, stepper, confirm dialog, dish artwork, delivery map
  data/restaurants.ts  restaurants, menus, categories and search
  store/               basket and order slices
  lib/                 totals, order building, delivery progress, KES formatting
  __tests__/           unit tests and a full ordering flow test
```

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on Android or the Camera app on iOS, or press `w` to open it in a browser.

## Checks

```bash
npm run lint
npm run typecheck
npm test            # 18 tests, including search to order to tracking through the real routes
npm run build:web   # static web build in dist/
```

## History

The first version of this repository followed a Deliveroo-clone tutorial and never ran: screens used components they had not imported, and the Sanity content backend it depended on was empty. Mlo is a rewrite of that idea on the current Expo SDK, with its own Nairobi data, design and tests.
