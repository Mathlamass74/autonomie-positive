import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';
import useInitiatives from '@/hooks/useInitiatives';

export default function Initiatives() {
  const { t } = useTranslation();
  const { items: initiatives, loading, error } = useInitiatives()

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('teenScreens.initiatives')}</ThemedText>
      {loading && <ThemedText type="subtitle">{t('common.loading')}</ThemedText>}
      {error && <ThemedText type="subtitle">{t('common.error')}: {error.message}</ThemedText>}
      {!loading && !error && initiatives.length === 0 && <ThemedText type="subtitle">{t('teenScreens.noInitiatives')}</ThemedText>}
      {!loading && !error && initiatives.map((it: any) => (
        <ThemedText key={it.id}>• {t(it.title)}</ThemedText>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
