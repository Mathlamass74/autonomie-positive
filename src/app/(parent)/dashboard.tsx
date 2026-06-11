import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AppScreen } from '@/components/ui/AppScreen';
import MetricCard from '@/components/ui/MetricCard';
import AppCard from '@/components/ui/AppCard';
import useFamily from '@/hooks/useFamily';
import useResponsibilities from '@/hooks/useResponsibilities';
import useRewards from '@/hooks/useRewards';
import { useTranslation } from 'react-i18next';
import useResponsive from '@/hooks/use-responsive';

export default function ParentDashboard() {
  const { t } = useTranslation();
  const { family, loading: familyLoading } = useFamily();
  const { items: responsibilities } = useResponsibilities();
  const { items: rewards } = useRewards();

  const data = {
    score: 0,
    currentSeries: 0,
    pointsMonth: 0,
    initiativesMonth: 0,
    todayResponsibilities: responsibilities.map((r: any) => ({ id: r.id, titleKey: r.title })),
    pendingRewards: rewards.map((p: any) => ({ id: p.id, titleKey: p.title, points: p.costPoints }))
  }

  const { isTablet } = useResponsive();

  if (isTablet) {
    return (
      <AppScreen>
        <View style={styles.tabletContainer}>
          <View style={styles.colLeft}>
            <AppCard style={styles.headerCard}>
              <ThemedText type="subtitle">{t('parentScreens.score')}</ThemedText>
              <ThemedText type="title">{data.score}</ThemedText>
            </AppCard>

            <View style={styles.section}>
              <ThemedText type="subtitle">{t('parentScreens.todayResponsibilities')}</ThemedText>
                  {data.todayResponsibilities.map((r) => (
                    <ThemedText key={r.id}>• {t(r.titleKey)}</ThemedText>
                  ))}
            </View>
          </View>

          <View style={styles.colRight}>
            <View style={styles.row}>
              <MetricCard label={t('parentScreens.currentSeries')} value={data.currentSeries} />
              <MetricCard label={t('parentScreens.pointsMonth')} value={data.pointsMonth} />
            </View>

            <View style={styles.section}>
              <ThemedText type="subtitle">{t('parentScreens.pendingRewards')}</ThemedText>
              {data.pendingRewards.map((p) => (
                <ThemedText key={p.id}>• {t(p.titleKey)} ({p.points})</ThemedText>
              ))}
            </View>
          </View>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppCard style={styles.headerCard}>
          <ThemedText type="subtitle">{t('parentScreens.score')}</ThemedText>
          <ThemedText type="title">{data.score}</ThemedText>
        </AppCard>

        <View style={styles.row}>
          <MetricCard label={t('parentScreens.currentSeries')} value={data.currentSeries} />
          <MetricCard label={t('parentScreens.pointsMonth')} value={data.pointsMonth} />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">{t('parentScreens.todayResponsibilities')}</ThemedText>
          {data.todayResponsibilities.map((r) => (
            <ThemedText key={r.id}>• {t(r.titleKey)}</ThemedText>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">{t('parentScreens.pendingRewards')}</ThemedText>
          {data.pendingRewards.map((p) => (
            <ThemedText key={p.id}>• {t(p.titleKey)} ({p.points})</ThemedText>
          ))}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, padding: 16 },
  headerCard: { padding: 16 },
  row: { flexDirection: 'row', gap: 12 },
  section: { padding: 12 },
  tabletContainer: { flexDirection: 'row', gap: 16, padding: 20 },
  colLeft: { flex: 1, gap: 12 },
  colRight: { flex: 1, gap: 12 },
});
