import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';

export default function Responsibilities() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('parentScreens.responsibilities')}</ThemedText>
      <ThemedText>{t('common.noData')}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
