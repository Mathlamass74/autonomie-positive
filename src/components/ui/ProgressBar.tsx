import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export function ProgressBar({ value = 0 }: { value?: number }) {
  const theme = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.track, { backgroundColor: theme.colors.surface }]}> 
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: theme.colors.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});

export default ProgressBar;
