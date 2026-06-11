import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';
import useRewards from '@/hooks/useRewards';

export default function TeenRewards() {
  const { t } = useTranslation();
  const { items: rewards, loading, error } = useRewards()

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('teenScreens.rewards')}</ThemedText>
      {loading && <ThemedText>{t('common.loading')}</ThemedText>}
      {error && <ThemedText>{t('common.error')}: {error.message}</ThemedText>}
      {!loading && !error && rewards.length === 0 && <ThemedText>{t('common.noData')}</ThemedText>}
      {!loading && !error && rewards.map((r: any) => (
        <ThemedText key={r.id}>• {t(r.title)} — {r.costPoints} {t('common.points')}</ThemedText>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
