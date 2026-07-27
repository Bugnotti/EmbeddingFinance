import { Platform } from 'react-native';

export const colors = {
  ink: '#18212B',
  inkMuted: '#64717D',
  inkSoft: '#8B97A3',
  canvas: '#F7F8F6',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2EF',
  line: '#E2E8E3',
  primary: '#176B5B',
  primaryDark: '#0E5145',
  primarySoft: '#DDEEE8',
  blue: '#3E67B1',
  blueSoft: '#E7EDFA',
  amber: '#A96918',
  amberSoft: '#FFF0D3',
  danger: '#B64B47',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Compatibility aliases are kept for the remaining Expo template files while
// the product UI is built on the new semantic token names.
export const Colors = {
  light: { text: colors.ink, background: colors.canvas, backgroundElement: colors.surfaceMuted, backgroundSelected: colors.primarySoft, textSecondary: colors.inkMuted },
  dark: { text: colors.white, background: colors.ink, backgroundElement: '#26322E', backgroundSelected: '#315A4E', textSecondary: '#B9C6C0' },
} as const;
export const Spacing = { one: spacing.xs, two: spacing.sm, three: spacing.lg, four: spacing.xl, five: spacing.xxl, six: spacing.xxxl } as const;
export type ThemeColor = keyof typeof Colors.light;

export const radii = {
  sm: 6,
  md: 8,
  lg: 14,
  pill: 999,
} as const;

export const typography = {
  display: 30,
  title: 24,
  headline: 19,
  body: 16,
  small: 13,
  caption: 12,
} as const;

export const Fonts = Platform.select({
  ios: { sans: 'System', rounded: 'System', mono: 'Menlo' },
  web: { sans: 'Inter, system-ui, -apple-system, sans-serif', rounded: 'Inter, system-ui, sans-serif', mono: 'ui-monospace' },
  default: { sans: 'sans-serif', rounded: 'sans-serif', mono: 'monospace' },
});

export const MaxContentWidth = 620;
