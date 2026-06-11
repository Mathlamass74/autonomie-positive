import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';
import { rewardsMock } from '@/services/mock-data';

export default function Rewards() {
  const { t } = useTranslation();
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">{t('parentScreens.rewards')}</ThemedText>
        {rewardsMock.map((r) => (
          <ThemedText key={r.id}>• {t(r.titleKey)} — {r.cost} pts</ThemedText>
        ))}
      </ThemedView>
    );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
