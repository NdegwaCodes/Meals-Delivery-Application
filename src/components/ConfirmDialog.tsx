import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/theme';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.dialog} accessibilityRole="alert">
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={onCancel} style={[styles.button, styles.secondary]}>
              <Text style={styles.secondaryText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={onConfirm} style={[styles.button, styles.primary]}>
              <Text style={styles.primaryText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 20,
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: '800', color: colors.ink },
  message: { fontSize: 15, color: colors.muted, lineHeight: 21 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  button: { flex: 1, paddingVertical: 12, borderRadius: radius.md, alignItems: 'center' },
  secondary: { backgroundColor: colors.background },
  primary: { backgroundColor: colors.primary },
  secondaryText: { color: colors.ink, fontWeight: '700' },
  primaryText: { color: '#fff', fontWeight: '700' },
});
