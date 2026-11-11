import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface Props {
  quantity: number;
  label: string;
  onAdd: () => void;
  onRemove: () => void;
}

export default function QuantityStepper({ quantity, label, onAdd, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove one ${label}`}
        disabled={quantity === 0}
        onPress={onRemove}
        hitSlop={8}
      >
        <Ionicons name="remove-circle" size={32} color={quantity === 0 ? colors.line : colors.primary} />
      </Pressable>
      <Text style={styles.count} accessibilityLabel={`${quantity} in basket`}>{quantity}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Add one ${label}`} onPress={onAdd} hitSlop={8}>
        <Ionicons name="add-circle" size={32} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  count: { minWidth: 22, textAlign: 'center', fontSize: 16, fontWeight: '700', color: colors.ink },
});
