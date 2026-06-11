import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AppScreen } from '@/components/ui/AppScreen';
import AppCard from '@/components/ui/AppCard';
import MetricCard from '@/components/ui/MetricCard';
import { teenTodayMock } from '@/services/mock-data';
import { useTranslation } from 'react-i18next';
import useResponsive from '@/hooks/use-responsive';

export default function TeenToday() {
  const { t } = useTranslation();
  const data = teenTodayMock;

  const { isTablet } = useResponsive();

  if (isTablet) {
    return (
      <AppScreen>
        <View style={styles.tabletContainer}>
          <View style={styles.colLeft}>
            <AppCard style={styles.header}>
              <ThemedText type="small">{t('teenScreens.level')}</ThemedText>
              <ThemedText type="title">{t(data.levelKey)}</ThemedText>
            </AppCard>

            <View style={styles.section}>
              <ThemedText type="subtitle">{t('teenScreens.today')}</ThemedText>
              {data.responsibilities.map((r) => (
                <ThemedText key={r.id}>• {t(r.titleKey)}</ThemedText>
              ))}
            </View>
          </View>

          <View style={styles.colRight}>
            <MetricCard label={t('teenScreens.score')} value={data.score} />
          </View>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppCard style={styles.header}>
          <ThemedText type="small">{t('teenScreens.level')}</ThemedText>
          <ThemedText type="title">{t(data.levelKey)}</ThemedText>
        </AppCard>

        <MetricCard label={t('teenScreens.score')} value={data.score} />

        <View style={styles.section}>
          <ThemedText type="subtitle">{t('teenScreens.today')}</ThemedText>
          {data.responsibilities.map((r) => (
            <ThemedText key={r.id}>• {t(r.titleKey)}</ThemedText>
          ))}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16 },
  header: { padding: 12 },
  section: { padding: 12 },
  tabletContainer: { flexDirection: 'row', gap: 16, padding: 20 },
  colLeft: { flex: 1, gap: 12 },
  colRight: { flex: 1, gap: 12 },
});
