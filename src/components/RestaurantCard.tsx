import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DishArt from './DishArt';
import type { Restaurant } from '@/data/restaurants';
import { formatKES, formatMinutes } from '@/lib/format';
import { colors, radius, shadow } from '@/theme';

interface Props {
  restaurant: Restaurant;
  wide?: boolean;
}

export default function RestaurantCard({ restaurant, wide = false }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${restaurant.name}, ${restaurant.cuisine}, rated ${restaurant.rating}`}
      onPress={() => router.push(`/restaurant/${restaurant.id}`)}
      style={[styles.card, wide ? styles.wide : styles.narrow]}
    >
      <View style={[styles.hero, { backgroundColor: restaurant.tint }]}>
        <DishArt art={restaurant.art} size={wide ? 112 : 100} />
        <View style={styles.eta}>
          <Text style={styles.etaText}>{formatMinutes(restaurant.etaMinutes)}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.meta}>
          <Ionicons name="star" size={14} color={colors.star} />
          <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
          <Text style={styles.muted} numberOfLines={1}> · {restaurant.cuisine} · {restaurant.area}</Text>
        </View>
        <Text style={styles.muted}>Delivery {formatKES(restaurant.deliveryFee)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, overflow: 'hidden', ...shadow },
  narrow: { width: 240 },
  wide: { width: '100%' },
  hero: { height: 132, alignItems: 'center', justifyContent: 'center' },
  eta: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  etaText: { fontSize: 12, fontWeight: '700', color: colors.ink },
  body: { padding: 12, gap: 4 },
  name: { fontSize: 16, fontWeight: '700', color: colors.ink },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 13, fontWeight: '700', color: colors.ink },
  muted: { fontSize: 13, color: colors.muted, flexShrink: 1 },
});
