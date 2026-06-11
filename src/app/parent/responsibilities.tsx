import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useResponsibilities from '@/hooks/useResponsibilities';
import { useTranslation } from 'react-i18next';

export default function Responsibilities() {
  const { t } = useTranslation();
  const { items, loading, error } = useResponsibilities()

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('parentScreens.responsibilities')}</ThemedText>
      {loading && <ThemedText>{t('common.loading')}</ThemedText>}
      {error && <ThemedText>{t('common.error')}: {error.message}</ThemedText>}
      {!loading && !error && items.length === 0 && <ThemedText>{t('common.noData')}</ThemedText>}
      {!loading && !error && items.map((r:any) => <ThemedText key={r.id}>• {t(r.title)}</ThemedText>)}
    </ThemedView>
  )
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
