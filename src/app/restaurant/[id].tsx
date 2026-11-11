import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import BasketBar from '@/components/BasketBar';
import ConfirmDialog from '@/components/ConfirmDialog';
import DishArt from '@/components/DishArt';
import MenuItemRow from '@/components/MenuItemRow';
import { brand } from '@/config/brand';
import { findRestaurant, type MenuItem } from '@/data/restaurants';
import { quantityOf } from '@/lib/basket';
import { formatKES, formatMinutes } from '@/lib/format';
import { addItem, removeItem } from '@/store/basketSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors, radius } from '@/theme';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = findRestaurant(id);
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket);
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.missing}>
        <Text style={styles.missingTitle}>This restaurant is not on {brand.name} any more.</Text>
        <Pressable onPress={() => router.replace('/')} style={styles.missingButton} accessibilityRole="button">
          <Text style={styles.missingButtonText}>Back to restaurants</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const otherRestaurant =
    basket.restaurantId !== null && basket.restaurantId !== restaurant.id
      ? findRestaurant(basket.restaurantId)
      : undefined;
  const linesHere = basket.restaurantId === restaurant.id ? basket.lines : [];

  const add = (item: MenuItem) => {
    if (otherRestaurant) {
      setPendingItem(item);
      return;
    }
    dispatch(addItem({ restaurantId: restaurant.id, item }));
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: restaurant.tint }]}>
          <DishArt art={restaurant.art} size={170} />
          <SafeAreaView edges={['top']} style={styles.backWrap}>
            <Pressable
              onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
              style={styles.back}
              accessibilityRole="button"
              accessibilityLabel="Back"
            >
              <Ionicons name="arrow-back" size={22} color={colors.ink} />
            </Pressable>
          </SafeAreaView>
        </View>

        <View style={styles.info}>
          <Text style={styles.name} accessibilityRole="header">{restaurant.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={15} color={colors.star} />
            <Text style={styles.metaStrong}>{restaurant.rating.toFixed(1)}</Text>
            <Text style={styles.meta}>({restaurant.reviews}) · {restaurant.cuisine}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={15} color={colors.muted} />
            <Text style={styles.meta}>{restaurant.address}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="bicycle-outline" size={15} color={colors.muted} />
            <Text style={styles.meta}>
              {formatMinutes(restaurant.etaMinutes)} · Delivery {formatKES(restaurant.deliveryFee)}
            </Text>
          </View>
          <Text style={styles.description}>{restaurant.description}</Text>
        </View>

        <Text style={styles.menuTitle} accessibilityRole="header">Menu</Text>
        {restaurant.menu.map((item) => (
          <MenuItemRow
            key={item.id}
            item={item}
            quantity={quantityOf(linesHere, item.id)}
            onAdd={() => add(item)}
            onRemove={() => dispatch(removeItem({ itemId: item.id }))}
          />
        ))}
      </ScrollView>

      <BasketBar />

      <ConfirmDialog
        visible={pendingItem !== null}
        title="Start a new basket?"
        message={`Your basket has food from ${otherRestaurant?.name ?? 'another restaurant'}. Orders come from one kitchen at a time.`}
        confirmLabel="Start new basket"
        cancelLabel="Keep basket"
        onCancel={() => setPendingItem(null)}
        onConfirm={() => {
          if (pendingItem) {
            dispatch(addItem({ restaurantId: restaurant.id, item: pendingItem }));
          }
          setPendingItem(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 120 },
  hero: { height: 240, alignItems: 'center', justifyContent: 'center' },
  backWrap: { position: 'absolute', top: 0, left: 16 },
  back: {
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { backgroundColor: colors.surface, padding: 16, gap: 6 },
  name: { fontSize: 26, fontWeight: '900', color: colors.ink },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaStrong: { fontSize: 14, fontWeight: '700', color: colors.ink },
  meta: { fontSize: 14, color: colors.muted, flexShrink: 1 },
  description: { fontSize: 14, color: colors.muted, lineHeight: 20, marginTop: 4 },
  menuTitle: { fontSize: 20, fontWeight: '800', color: colors.ink, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  missingTitle: { fontSize: 18, fontWeight: '700', color: colors.ink, textAlign: 'center' },
  missingButton: { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: 18, paddingVertical: 12 },
  missingButtonText: { color: '#fff', fontWeight: '700' },
});
