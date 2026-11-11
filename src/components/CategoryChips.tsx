import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DishArt from './DishArt';
import { categories, type CategoryId } from '@/data/restaurants';
import { colors, radius } from '@/theme';

interface Props {
  selected: CategoryId | null;
  onSelect: (category: CategoryId | null) => void;
}

export default function CategoryChips({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityRole="tablist"
    >
      {categories.map((category) => {
        const active = category.id === selected;
        return (
          <Pressable
            key={category.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(active ? null : category.id)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <View style={styles.art}>
              <DishArt art={category.art} size={44} />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{category.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  chip: {
    alignItems: 'center',
    width: 82,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  art: { marginBottom: 4 },
  label: { fontSize: 12, fontWeight: '600', color: colors.ink },
  labelActive: { color: colors.primaryDark },
});
