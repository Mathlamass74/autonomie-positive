import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export function AppCard({ children, style, ...other }: ViewProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow },
        style,
      ]}
      {...other}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    elevation: 6,
  },
});

export default AppCard;
