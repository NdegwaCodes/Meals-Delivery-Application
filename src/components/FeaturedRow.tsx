import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RestaurantCard from './RestaurantCard';
import type { Restaurant } from '@/data/restaurants';
import { colors } from '@/theme';

interface Props {
  title: string;
  description: string;
  restaurants: Restaurant[];
}

export default function FeaturedRow({ title, description, restaurants }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 18 },
  title: { fontSize: 19, fontWeight: '800', color: colors.ink, paddingHorizontal: 16 },
  description: { fontSize: 13, color: colors.muted, paddingHorizontal: 16, marginTop: 2 },
  row: { paddingHorizontal: 16, paddingVertical: 12, gap: 14 },
});
