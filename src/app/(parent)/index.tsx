import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';
import ParentDashboard from './dashboard';

export default function ParentIndex() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <ThemedText type="title">{t('parentScreens.dashboard')}</ThemedText>
        <ParentDashboard />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
