import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CategoryChips from '@/components/CategoryChips';
import FeaturedRow from '@/components/FeaturedRow';
import RestaurantCard from '@/components/RestaurantCard';
import BasketBar from '@/components/BasketBar';
import { brand } from '@/config/brand';
import {
  categories,
  featuredRows,
  findRestaurant,
  restaurants,
  searchRestaurants,
  type CategoryId,
  type Restaurant,
} from '@/data/restaurants';
import { colors, radius } from '@/theme';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | null>(null);

  const filtering = query.trim().length > 0 || category !== null;
  const results = useMemo(() => searchRestaurants(query, category), [query, category]);
  const categoryName = categories.find((entry) => entry.id === category)?.name;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>{brand.name}</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.deliverTo}>Deliver to</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.locationText}>Kilimani, {brand.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.faint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search pilau, pizza, Westlands..."
          placeholderTextColor={colors.faint}
          style={styles.searchInput}
          accessibilityLabel="Search restaurants and dishes"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Ionicons name="close-circle" size={18} color={colors.faint} onPress={() => setQuery('')} accessibilityLabel="Clear search" />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <CategoryChips selected={category} onSelect={setCategory} />

        {filtering ? (
          <View style={styles.results}>
            <Text style={styles.resultsTitle} accessibilityRole="header">
              {results.length} {results.length === 1 ? 'place' : 'places'}
              {categoryName ? ` for ${categoryName}` : ''}
              {query.trim() ? ` matching "${query.trim()}"` : ''}
            </Text>
            {results.length === 0 ? (
              <Text style={styles.empty}>Nothing matches yet. Try another dish or area.</Text>
            ) : (
              results.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} wide />)
            )}
          </View>
        ) : (
          <>
            {featuredRows.map((row) => (
              <FeaturedRow
                key={row.id}
                title={row.title}
                description={row.description}
                restaurants={row.restaurantIds
                  .map((id) => findRestaurant(id))
                  .filter((entry): entry is Restaurant => entry !== undefined)}
              />
            ))}
            <View style={styles.results}>
              <Text style={styles.resultsTitle} accessibilityRole="header">All restaurants</Text>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} wide />
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <BasketBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8 },
  logo: { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 8 },
  logoText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  location: { flex: 1 },
  deliverTo: { fontSize: 12, color: colors.muted, fontWeight: '600' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 16, fontWeight: '800', color: colors.ink },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchInput: { flex: 1, paddingVertical: 11, fontSize: 15, color: colors.ink },
  content: { paddingBottom: 120 },
  results: { paddingHorizontal: 16, marginTop: 18, gap: 14 },
  resultsTitle: { fontSize: 19, fontWeight: '800', color: colors.ink },
  empty: { fontSize: 15, color: colors.muted },
});
