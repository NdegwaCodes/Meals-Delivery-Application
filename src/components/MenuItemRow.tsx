import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DishArt from './DishArt';
import QuantityStepper from './QuantityStepper';
import type { MenuItem } from '@/data/restaurants';
import { formatKES } from '@/lib/format';
import { colors, radius } from '@/theme';

interface Props {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MenuItemRow({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{formatKES(item.price)}</Text>
        <View style={styles.stepper}>
          <QuantityStepper quantity={quantity} label={item.name} onAdd={onAdd} onRemove={onRemove} />
        </View>
      </View>
      <View style={styles.art}>
        <DishArt art={item.art} size={84} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  text: { flex: 1, gap: 4 },
  name: { fontSize: 16, fontWeight: '700', color: colors.ink },
  description: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  price: { fontSize: 15, fontWeight: '700', color: colors.ink, marginTop: 2 },
  stepper: { marginTop: 6 },
  art: {
    width: 92,
    height: 92,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
