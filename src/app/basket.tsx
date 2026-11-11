import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DishArt from '@/components/DishArt';
import QuantityStepper from '@/components/QuantityStepper';
import { findRestaurant } from '@/data/restaurants';
import { basketSubtotal, buildOrder } from '@/lib/basket';
import { formatKES, formatMinutes } from '@/lib/format';
import { addItem, clearBasket, removeItem } from '@/store/basketSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { orderPlaced, type PaymentMethod } from '@/store/orderSlice';
import { colors, radius } from '@/theme';

const paymentOptions: { id: PaymentMethod; title: string; detail: string }[] = [
  { id: 'mpesa-on-delivery', title: 'M-Pesa on delivery', detail: 'Pay the rider by M-Pesa when your food arrives' },
  { id: 'cash-on-delivery', title: 'Cash on delivery', detail: 'Have the exact amount ready if you can' },
];

export default function BasketScreen() {
  const dispatch = useAppDispatch();
  const { restaurantId, lines } = useAppSelector((state) => state.basket);
  const restaurant = findRestaurant(restaurantId ?? undefined);
  const [address, setAddress] = useState('Kilimani, Nairobi');
  const [payment, setPayment] = useState<PaymentMethod>('mpesa-on-delivery');

  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (!restaurant || lines.length === 0) {
    return (
      <SafeAreaView style={styles.emptyScreen}>
        <Ionicons name="basket-outline" size={56} color={colors.faint} />
        <Text style={styles.emptyTitle}>Your basket is empty</Text>
        <Pressable onPress={close} style={styles.primaryButton} accessibilityRole="button">
          <Text style={styles.primaryButtonText}>Find something to eat</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const subtotal = basketSubtotal(lines);
  const total = subtotal + restaurant.deliveryFee;
  const canOrder = address.trim().length >= 3;

  const placeOrder = () => {
    dispatch(orderPlaced(buildOrder(restaurant, lines, payment)));
    dispatch(clearBasket());
    router.replace('/preparing');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title} accessibilityRole="header">Your basket</Text>
          <Text style={styles.subtitle}>{restaurant.name}</Text>
        </View>
        <Pressable onPress={close} accessibilityRole="button" accessibilityLabel="Close basket" hitSlop={8}>
          <Ionicons name="close-circle" size={34} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.deliveryRow}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
            <Text style={styles.deliveryText}>Delivery in {formatMinutes(restaurant.etaMinutes)}</Text>
          </View>
          <Text style={styles.label}>Delivery address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholder="Estate, street and house number"
            placeholderTextColor={colors.faint}
            accessibilityLabel="Delivery address"
          />
        </View>

        <View style={styles.card}>
          {lines.map((line) => (
            <View key={line.item.id} style={styles.line}>
              <View style={styles.lineArt}>
                <DishArt art={line.item.art} size={44} />
              </View>
              <View style={styles.lineText}>
                <Text style={styles.lineName}>{line.item.name}</Text>
                <Text style={styles.linePrice}>{formatKES(line.item.price * line.quantity)}</Text>
              </View>
              <QuantityStepper
                quantity={line.quantity}
                label={line.item.name}
                onAdd={() => dispatch(addItem({ restaurantId: restaurant.id, item: line.item }))}
                onRemove={() => dispatch(removeItem({ itemId: line.item.id }))}
              />
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Payment</Text>
          {paymentOptions.map((option) => {
            const selected = option.id === payment;
            return (
              <Pressable
                key={option.id}
                onPress={() => setPayment(option.id)}
                style={[styles.option, selected && styles.optionSelected]}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
              >
                <Ionicons
                  name={selected ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color={selected ? colors.primary : colors.faint}
                />
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDetail}>{option.detail}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.card}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatKES(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.totalValue}>{formatKES(restaurant.deliveryFee)}</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandLabel}>Total</Text>
            <Text style={styles.grandValue}>{formatKES(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={placeOrder}
          disabled={!canOrder}
          style={[styles.primaryButton, !canOrder && styles.disabled]}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canOrder }}
        >
          <Text style={styles.primaryButtonText}>Place order · {formatKES(total)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  headerText: { flex: 1 },
  title: { fontSize: 20, fontWeight: '900', color: colors.ink },
  subtitle: { fontSize: 14, color: colors.muted, marginTop: 2 },
  content: { padding: 16, gap: 12, paddingBottom: 24 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14, gap: 10 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  deliveryText: { fontSize: 15, fontWeight: '700', color: colors.ink },
  label: { fontSize: 13, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.ink,
  },
  line: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  lineArt: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineText: { flex: 1 },
  lineName: { fontSize: 15, fontWeight: '700', color: colors.ink },
  linePrice: { fontSize: 14, color: colors.muted, marginTop: 2 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  optionText: { flex: 1 },
  optionTitle: { fontSize: 15, fontWeight: '700', color: colors.ink },
  optionDetail: { fontSize: 13, color: colors.muted, marginTop: 2 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 15, color: colors.muted },
  totalValue: { fontSize: 15, color: colors.ink },
  grandTotal: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line, paddingTop: 10 },
  grandLabel: { fontSize: 17, fontWeight: '800', color: colors.ink },
  grandValue: { fontSize: 17, fontWeight: '800', color: colors.ink },
  footer: { padding: 16, backgroundColor: colors.surface, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  primaryButton: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: 15, paddingHorizontal: 18, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  disabled: { opacity: 0.5 },
  emptyScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24, backgroundColor: colors.background },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.ink },
});
