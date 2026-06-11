import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTranslation } from 'react-i18next';
import useValidations from '@/hooks/useValidations'

export default function Validations() {
  const { t } = useTranslation();
  const { items: validations, loading, error } = useValidations()

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('parentScreens.validations')}</ThemedText>
      {loading && <ThemedText>{t('common.loading')}</ThemedText>}
      {error && <ThemedText>{t('common.error')}: {error.message}</ThemedText>}
      {!loading && !error && validations.length === 0 && <ThemedText>{t('parentScreens.noPendingValidations')}</ThemedText>}
      {!loading && !error && validations.map((v: any) => (
        <ThemedText key={v.id}>• {v.targetType === 'responsibility' ? t('common.submissionResponsibility') : t('common.submissionInitiative')}</ThemedText>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
