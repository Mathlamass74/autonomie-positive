/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { getTheme } from '@/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemeShape = Record<string, any>;

export function useTheme(): ThemeShape {
  const scheme = useColorScheme();
  const resolved = !scheme || scheme === 'unspecified' ? 'dark' : (scheme as 'light' | 'dark');
  const full = getTheme(resolved);

  // Return full theme object under `colors` while preserving top-level color shortcuts
  // to remain backward-compatible with older components that expect theme.background, theme.text, etc.
  return {
    ...full,
    // spread color keys at top level (background, text, ...)
    ...full.colors,
  } as ThemeShape;
}
