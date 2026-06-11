import { Platform } from 'react-native';

export const tokens = {
  colors: {
    background: '#0B0B0D',
    surface: '#0F1113',
    card: '#121316',
    muted: '#9AA0A6',
    text: '#FFFFFF',
    primary: '#60A5FA',
    accent: '#7C3AED',
    success: '#34D399',
    shadow: 'rgba(0,0,0,0.6)'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 18,
  },
  typography: {
    fontFamily: Platform.select({ web: 'var(--font-display)', default: 'system-ui' }),
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 28,
      title: 40,
    },
    weights: {
      regular: '500',
      medium: '600',
      bold: '700',
    },
  },
};

export function getTheme(scheme: 'dark' | 'light' = 'dark') {
  // For now we only support dark-first theme; map to tokens
  return {
    colors: tokens.colors,
    spacing: tokens.spacing,
    radius: tokens.radius,
    typography: tokens.typography,
    scheme,
  } as const;
}

export type AppTheme = ReturnType<typeof getTheme>;
