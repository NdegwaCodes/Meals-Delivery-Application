import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors } from '@/theme';

export interface MapPoint {
  latitude: number;
  longitude: number;
  title: string;
}

export interface DeliveryMapProps {
  from: MapPoint;
  to: MapPoint;
}

export default function DeliveryMap({ from, to }: DeliveryMapProps) {
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{
        latitude: (from.latitude + to.latitude) / 2,
        longitude: (from.longitude + to.longitude) / 2,
        latitudeDelta: Math.abs(from.latitude - to.latitude) * 2.4 + 0.01,
        longitudeDelta: Math.abs(from.longitude - to.longitude) * 2.4 + 0.01,
      }}
    >
      <Marker coordinate={from} title={from.title} pinColor={colors.primary} />
      <Marker coordinate={to} title={to.title} pinColor={colors.success} />
      <Polyline coordinates={[from, to]} strokeColor={colors.primary} strokeWidth={4} lineDashPattern={[8, 6]} />
    </MapView>
  );
}
