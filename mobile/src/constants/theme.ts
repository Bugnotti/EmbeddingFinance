import { Platform } from 'react-native';

// Keep the active palette in one place so visual experiments stay cheap.
// The product surfaces use semantic roles below rather than raw colors.
export const palettes = {
  playful: {
    ink: '#25334D',
    inkMuted: '#667895',
    inkSoft: '#9AAAC0',
    canvas: '#EAF7FF',
    surface: '#FFFFFF',
    surfaceMuted: '#FFF5DC',
    line: '#D7E7F5',
    primary: '#6B5CE7',
    primaryDark: '#5141C9',
    primarySoft: '#EAE7FF',
    blue: '#45B9E9',
    blueSoft: '#DDF5FF',
    amber: '#F3B63F',
    amberSoft: '#FFF0BE',
    coral: '#FF7D6E',
    coralSoft: '#FFE3DD',
    pink: '#F47DAE',
    danger: '#DF5C6B',
    white: '#FFFFFF',
    black: '#000000',
  },
  sunset: {
    ink: '#3F2E45',
    inkMuted: '#80647C',
    inkSoft: '#B49CAF',
    canvas: '#FFF1ED',
    surface: '#FFFFFF',
    surfaceMuted: '#FFF6D9',
    line: '#F0D7D1',
    primary: '#E45E72',
    primaryDark: '#B9425D',
    primarySoft: '#FFE0E6',
    blue: '#61BCE1',
    blueSoft: '#E2F6FC',
    amber: '#F3AE3D',
    amberSoft: '#FFF0BE',
    coral: '#F78261',
    coralSoft: '#FFE3D4',
    pink: '#E46C9F',
    danger: '#D24E60',
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;

export const colors = palettes.playful;

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
  dark: { text: colors.white, background: colors.ink, backgroundElement: '#3D4965', backgroundSelected: '#5141C9', textSecondary: '#C8D5E7' },
} as const;
export const Spacing = { one: spacing.xs, two: spacing.sm, three: spacing.lg, four: spacing.xl, five: spacing.xxl, six: spacing.xxxl } as const;
export type ThemeColor = keyof typeof Colors.light;

export const radii = {
  sm: 8,
  md: 10,
  lg: 16,
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
