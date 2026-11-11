import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import DeliveryMap from '@/components/DeliveryMap';
import { findRestaurant } from '@/data/restaurants';
import { deliveryProgress, deliveryStage, estimatedArrival, stages } from '@/lib/basket';
import { formatKES } from '@/lib/format';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { orderClosed } from '@/store/orderSlice';
import { colors, radius, shadow } from '@/theme';

const CUSTOMER = { latitude: -1.293, longitude: 36.787, title: 'You' };

function clock(date: Date): string {
  return date.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
}

export default function DeliveryScreen() {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.current);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(timer);
  }, []);

  const restaurant = findRestaurant(order?.restaurantId);
  if (!order || !restaurant) {
    return <Redirect href="/" />;
  }

  const [earliest, latest] = estimatedArrival(order.placedAt, restaurant.etaMinutes);
  const progress = deliveryProgress(order.placedAt, restaurant.etaMinutes, now);
  const stage = deliveryStage(progress);
  const payByMpesa = order.paymentMethod === 'mpesa-on-delivery';

  const done = () => {
    dispatch(orderClosed());
    router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <DeliveryMap
        from={{ latitude: restaurant.latitude, longitude: restaurant.longitude, title: restaurant.name }}
        to={CUSTOMER}
      />

      <SafeAreaView edges={['top']} style={styles.topWrap} pointerEvents="box-none">
        <View style={styles.topBar}>
          <Pressable onPress={done} style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Close tracking">
            <Ionicons name="close" size={22} color={colors.ink} />
          </Pressable>
          <View style={styles.reference}>
            <Text style={styles.referenceText}>Order {order.reference}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Estimated arrival</Text>
          <Text style={styles.eta}>
            {clock(earliest)} to {clock(latest)}
          </Text>
          <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ now: Math.round(progress * 100), min: 0, max: 100 }}>
            <View style={[styles.trackFill, { width: `${Math.max(6, progress * 100)}%` }]} />
          </View>
          <View style={styles.stages}>
            {stages.map((label, index) => (
              <Text key={label} style={[styles.stage, index <= stage && styles.stageDone]}>
                {label}
              </Text>
            ))}
          </View>
          <Text style={styles.status}>
            {stage < 2
              ? `${restaurant.name} is preparing your order`
              : stage === 2
                ? 'Your rider is on the way'
                : 'Your order should have arrived'}
          </Text>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} style={styles.bottom}>
        <View style={styles.rider}>
          <View style={styles.avatar}>
            <Ionicons name="bicycle" size={24} color={colors.primary} />
          </View>
          <View style={styles.riderText}>
            <Text style={styles.riderName}>Kevin O.</Text>
            <Text style={styles.riderRole}>Your rider</Text>
          </View>
          <View style={styles.payment}>
            <Text style={styles.paymentLabel}>{payByMpesa ? 'Pay by M-Pesa' : 'Pay in cash'}</Text>
            <Text style={styles.paymentAmount}>{formatKES(order.total)}</Text>
          </View>
        </View>
        <Text style={styles.demo}>Demo app: no real order was sent to the restaurant.</Text>
        <Pressable onPress={done} style={styles.doneButton} accessibilityRole="button">
          <Text style={styles.doneText}>Back to restaurants</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  topWrap: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 16 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  reference: { backgroundColor: colors.surface, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8, ...shadow },
  referenceText: { fontWeight: '700', color: colors.ink },
  card: { marginTop: 12, backgroundColor: colors.surface, borderRadius: radius.lg, padding: 16, gap: 8, ...shadow },
  cardLabel: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  eta: { fontSize: 28, fontWeight: '900', color: colors.ink },
  track: { height: 8, borderRadius: radius.pill, backgroundColor: colors.line, overflow: 'hidden' },
  trackFill: { height: 8, backgroundColor: colors.primary },
  stages: { flexDirection: 'row', justifyContent: 'space-between' },
  stage: { fontSize: 11, color: colors.faint, fontWeight: '600' },
  stageDone: { color: colors.primaryDark },
  status: { fontSize: 14, color: colors.ink },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
    ...shadow,
  },
  rider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderText: { flex: 1 },
  riderName: { fontSize: 16, fontWeight: '800', color: colors.ink },
  riderRole: { fontSize: 13, color: colors.muted },
  payment: { alignItems: 'flex-end' },
  paymentLabel: { fontSize: 12, color: colors.muted },
  paymentAmount: { fontSize: 16, fontWeight: '800', color: colors.ink },
  demo: { fontSize: 12, color: colors.faint, textAlign: 'center' },
  doneButton: { backgroundColor: colors.ink, borderRadius: radius.md, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  doneText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
