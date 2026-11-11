import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import DishArt from '@/components/DishArt';
import { findRestaurant } from '@/data/restaurants';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

const PREPARING_DELAY_MS = 3500;

export default function PreparingScreen() {
  const order = useAppSelector((state) => state.order.current);
  const [rise] = useState(() => new Animated.Value(40));
  const [fade] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rise, { toValue: 0, duration: 700, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: Platform.OS !== 'web' }),
    ]).start();
    const timer = setTimeout(() => router.replace('/delivery'), PREPARING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [rise, fade]);

  if (!order) {
    return <Redirect href="/" />;
  }
  const restaurant = findRestaurant(order.restaurantId);

  return (
    <SafeAreaView style={styles.screen}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>
        <DishArt art={restaurant?.art ?? 'chapati'} size={200} />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fade }]}>Order {order.reference} received</Animated.Text>
      <Text style={styles.subtitle}>{restaurant?.name ?? 'The kitchen'} is getting your food ready</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.spinner} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 28, textAlign: 'center' },
  subtitle: { color: '#FFE8D6', fontSize: 16, marginTop: 8, textAlign: 'center' },
  spinner: { marginTop: 28 },
});
