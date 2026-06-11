import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppCard from './AppCard';
import { useTheme } from '@/hooks/use-theme';

export function MetricCard({ label, value }: { label: string; value: string | number }) {
  const theme = useTheme();
  return (
    <AppCard style={styles.card}>
      <Text style={[styles.label, { color: theme.colors.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12 },
  label: { fontSize: 12 },
  value: { fontSize: 20, fontWeight: '700' },
});

export default MetricCard;
