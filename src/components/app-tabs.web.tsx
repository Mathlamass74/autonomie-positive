import { Link, Slot } from 'expo-router';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View style={styles.wrapper as any}>
      <ThemedView type="backgroundElement" style={styles.innerContainer as any}>
        <ThemedText type="smallBold" style={styles.brandText as any}>
          Expo Starter
        </ThemedText>

        <View style={styles.group as any}>
          <Link href="/parent/dashboard" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Dashboard</ThemedText>
            </Pressable>
          </Link>
          <Link href="/parent/responsibilities" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Responsabilités</ThemedText>
            </Pressable>
          </Link>
          <Link href="/parent/validations" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Validations</ThemedText>
            </Pressable>
          </Link>
          <Link href="/parent/rewards" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Récompenses</ThemedText>
            </Pressable>
          </Link>
          <Link href="/parent/settings" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Paramètres</ThemedText>
            </Pressable>
          </Link>
        </View>

        <View style={styles.group as any}>
          <Link href="/teen/today" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Today</ThemedText>
            </Pressable>
          </Link>
          <Link href="/teen/initiatives" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Initiatives</ThemedText>
            </Pressable>
          </Link>
          <Link href="/teen/rewards" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Rewards</ThemedText>
            </Pressable>
          </Link>
          <Link href="/teen/progress" asChild>
            <Pressable style={styles.link as any}>
              <ThemedText type="small">Progress</ThemedText>
            </Pressable>
          </Link>
        </View>

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable as any}>
            <ThemedText type="link">Docs</ThemedText>
          </Pressable>
        </ExternalLink>
      </ThemedView>

      <View style={styles.slotContainer as any}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  brandText: { flex: 1 },
  group: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  link: { paddingVertical: Spacing.one, paddingHorizontal: Spacing.three, borderRadius: Spacing.three },
  externalPressable: { marginLeft: Spacing.three },
  slotContainer: { paddingTop: Spacing.six },
});
