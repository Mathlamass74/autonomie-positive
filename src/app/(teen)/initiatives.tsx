import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { initiativesMock } from '@/services/mock-data';
import { useTranslation } from 'react-i18next';

export default function Initiatives() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('teenScreens.initiatives')}</ThemedText>
      {initiativesMock.map((i) => (
        <ThemedText key={i.id}>• {t(i.titleKey)} — {i.date}</ThemedText>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
