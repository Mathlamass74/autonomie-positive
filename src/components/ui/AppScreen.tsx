import React from 'react';
import { SafeAreaView, StyleSheet, View, type ViewProps } from 'react-native';
import { AppTheme, getTheme } from '@/theme';
import { useTheme } from '@/hooks/use-theme';

export function AppScreen({ children, style, ...other }: ViewProps) {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} {...other}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
});

export default AppScreen;
