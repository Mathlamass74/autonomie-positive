import React from 'react';
import { TouchableOpacity, Text, StyleSheet, type TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

type Props = TouchableOpacityProps & { variant?: 'primary' | 'ghost'; label: string };

export function AppButton({ label, variant = 'primary', style, ...props }: Props) {
  const theme = useTheme();
  const bg = variant === 'primary' ? theme.colors.primary : 'transparent';
  const color = variant === 'primary' ? '#081122' : theme.colors.text;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bg }, style]} {...props}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AppButton;
