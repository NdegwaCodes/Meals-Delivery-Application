import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '@/store/hooks';
import { basketCount, basketSubtotal } from '@/lib/basket';
import { formatKES } from '@/lib/format';
import { colors, radius, shadow } from '@/theme';

export default function BasketBar() {
  const lines = useAppSelector((state) => state.basket.lines);
  const insets = useSafeAreaInsets();
  const count = basketCount(lines);
  if (count === 0) {
    return null;
  }
  const subtotal = formatKES(basketSubtotal(lines));
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View basket, ${count} items, ${subtotal}`}
        onPress={() => router.push('/basket')}
        style={styles.bar}
      >
        <View style={styles.count}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        <Text style={styles.label}>View basket</Text>
        <Text style={styles.total}>{subtotal}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...shadow,
  },
  count: { backgroundColor: colors.primaryDark, borderRadius: radius.sm, paddingHorizontal: 9, paddingVertical: 3 },
  countText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  label: { flex: 1, textAlign: 'center', color: '#fff', fontWeight: '800', fontSize: 16 },
  total: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
