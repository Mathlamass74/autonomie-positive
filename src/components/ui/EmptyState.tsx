import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';

export function EmptyState({ labelKey = 'common.noData' }: { labelKey?: string }) {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.muted }]}>{t(labelKey)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  text: { fontSize: 14 },
});

export default EmptyState;
