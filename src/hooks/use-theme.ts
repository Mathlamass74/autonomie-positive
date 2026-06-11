/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { getTheme } from '@/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemeShape = Record<string, any>;

export function useTheme(): ThemeShape {
  const scheme = useColorScheme();
  const resolved = scheme === 'unspecified' ? 'dark' : (scheme as 'light' | 'dark');
  const full = getTheme(resolved);
  // flatten colors for backward compatibility with existing components
  return { ...full.colors, spacing: full.spacing, radius: full.radius, typography: full.typography } as ThemeShape;
}
