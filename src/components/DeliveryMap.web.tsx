import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { DeliveryMapProps } from './DeliveryMap';
import { colors } from '@/theme';

export default function DeliveryMap({ from, to }: DeliveryMapProps) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <Rect width="400" height="800" fill="#EEF2E6" />
        <Path d="M0 300 H400 M0 520 H400 M0 700 H400 M120 0 V800 M280 0 V800" stroke="#FFFFFF" strokeWidth={14} />
        <Path d="M0 240 L400 620 M60 800 L380 160" stroke="#FFFFFF" strokeWidth={8} opacity={0.8} />
        <Rect x="150" y="380" width="100" height="90" rx="10" fill="#D6E5C9" />
        <Rect x="300" y="560" width="80" height="110" rx="10" fill="#D6E5C9" />
        <Path
          d="M120 580 C170 520 210 470 280 360"
          stroke={colors.primary}
          strokeWidth={6}
          strokeDasharray="12 9"
          fill="none"
        />
        <Circle cx="120" cy="580" r="13" fill={colors.primary} stroke="#fff" strokeWidth={4} />
        <Circle cx="280" cy="360" r="13" fill={colors.success} stroke="#fff" strokeWidth={4} />
      </Svg>
      <View style={styles.legend}>
        <Text style={styles.legendText}>
          {from.title} to {to.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    position: 'absolute',
    left: 12,
    top: '62%',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  legendText: { fontSize: 12, color: colors.ink, fontWeight: '600' },
});
