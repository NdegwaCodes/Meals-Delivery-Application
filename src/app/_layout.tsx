import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="restaurant/[id]" />
        <Stack.Screen name="basket" options={{ presentation: 'modal' }} />
        <Stack.Screen name="preparing" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
        <Stack.Screen name="delivery" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
      </Stack>
    </Provider>
  );
}
