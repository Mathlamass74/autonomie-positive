import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import TeenToday from './today';
import { useTranslation } from 'react-i18next';

export default function TeenIndex() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <ThemedText type="title">{t('teenScreens.today')}</ThemedText>
        <TeenToday />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
