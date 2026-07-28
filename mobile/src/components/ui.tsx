import { LucideIcon } from 'lucide-react-native';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle, useWindowDimensions } from 'react-native';
import { colors, radii, spacing, typography } from '@/constants/theme';

export function AppText({ children, variant = 'body', color = colors.ink, style }: { children: ReactNode; variant?: 'display' | 'title' | 'headline' | 'body' | 'small' | 'caption' | 'button'; color?: string; style?: StyleProp<any> }) {
  return <Text style={[styles.text, textVariants[variant], { color }, style]}>{children}</Text>;
}

export function AppButton({ label, onPress, icon: Icon, variant = 'primary', loading = false, disabled = false, style }: { label: string; onPress: () => void; icon?: LucideIcon; variant?: 'primary' | 'secondary' | 'quiet'; loading?: boolean; disabled?: boolean; style?: StyleProp<ViewStyle> }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.button, buttonVariants[variant], pressed && styles.pressed, (disabled || loading) && styles.disabled, style]}>
    {loading ? <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} /> : <>{Icon && <Icon color={variant === 'primary' ? colors.white : colors.primary} size={18} strokeWidth={2.2} />}<AppText variant="button" color={variant === 'primary' ? colors.white : colors.primary}>{label}</AppText></>}
  </Pressable>;
}

export function IconButton({ label, icon: Icon, onPress }: { label: string; icon: LucideIcon; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}><Icon size={20} color={colors.ink} /></Pressable>;
}

export function ScreenHeader({ eyebrow, title, description, action, compact = false }: { eyebrow?: string; title: string; description?: string; action?: ReactNode; compact?: boolean }) {
  const { width } = useWindowDimensions();
  const showDescription = Boolean(description && (!compact || width >= 760));
  return <View style={[styles.header, compact && styles.headerCompact]}><View style={styles.headerCopy}>{eyebrow && <AppText variant="caption" color={colors.primary} style={styles.eyebrow}>{eyebrow.toUpperCase()}</AppText>}<AppText variant="title">{title}</AppText>{showDescription && <AppText variant="body" color={colors.inkMuted} style={styles.description}>{description}</AppText>}</View>{action}</View>;
}

export function ScreenContent({ children, maxWidth = 620, style }: { children: ReactNode; maxWidth?: number; style?: StyleProp<ViewStyle> }) {
  const { width } = useWindowDimensions();
  return <View style={[styles.screenContent, { maxWidth }, width >= 760 && styles.screenContentWide, style]}>{children}</View>;
}

export function InlineNotice({ label, children, tone = 'info' }: { label: string; children: ReactNode; tone?: 'info' | 'success' | 'warning' }) {
  const toneStyle = { info: styles.noticeInfo, success: styles.noticeSuccess, warning: styles.noticeWarning }[tone];
  const color = tone === 'warning' ? colors.amber : colors.primary;
  return <View accessibilityLiveRegion="polite" style={[styles.notice, toneStyle]}><AppText variant="caption" color={color} style={styles.noticeLabel}>{label}</AppText><AppText variant="caption" color={colors.inkMuted}>{children}</AppText></View>;
}

export function ProgressBar({ value }: { value: number }) {
  return <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: value }} style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.max(0, Math.min(value, 100))}%` }]} /></View>;
}

export function StatusBadge({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'success' | 'warning' | 'locked' }) {
  const toneStyle = { neutral: styles.badgeNeutral, success: styles.badgeSuccess, warning: styles.badgeWarning, locked: styles.badgeLocked }[tone];
  const textColor = tone === 'success' ? colors.primary : tone === 'warning' ? colors.amber : colors.inkMuted;
  return <View style={[styles.badge, toneStyle]}><AppText variant="caption" color={textColor}>{label}</AppText></View>;
}

export function FormField({ label, hint, error, ...props }: TextInputProps & { label: string; hint?: string; error?: string }) {
  return <View style={styles.field}><AppText variant="small" style={styles.fieldLabel}>{label}</AppText><TextInput {...props} placeholderTextColor={colors.inkSoft} style={[styles.input, props.multiline && styles.multiline, error && styles.inputError]} accessibilityLabel={label} />{error ? <AppText variant="caption" color={colors.danger}>{error}</AppText> : hint ? <AppText variant="caption" color={colors.inkMuted}>{hint}</AppText> : null}</View>;
}

export function SectionCard({ children, style, accessibilityLabel }: { children: ReactNode; style?: StyleProp<ViewStyle>; accessibilityLabel?: string }) {
  return <View accessibilityLabel={accessibilityLabel} style={[styles.card, style]}>{children}</View>;
}

export function SkyCloud({ size = 72, color = colors.white, style }: { size?: number; color?: string; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.skyCloud, { width: size, height: size * 0.56 }, style]}>
    <View style={[styles.cloudBase, { width: size, height: size * 0.3, borderRadius: size * 0.16, backgroundColor: color }]} />
    <View style={[styles.cloudPuffLarge, { width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, left: size * 0.14, backgroundColor: color }]} />
    <View style={[styles.cloudPuffSmall, { width: size * 0.36, height: size * 0.36, borderRadius: size * 0.18, left: size * 0.52, backgroundColor: color }]} />
  </View>;
}

export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 118, maxWidth: 620, width: '100%', alignSelf: 'center' },
  text: { fontFamily: 'System', letterSpacing: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.lg, marginBottom: spacing.xl },
  headerCompact: { marginBottom: spacing.lg },
  headerCopy: { flex: 1, gap: spacing.sm },
  eyebrow: { fontWeight: '800', letterSpacing: 1.2 },
  description: { lineHeight: 23 },
  button: { minHeight: 52, paddingHorizontal: spacing.xl, borderRadius: radii.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonSecondary: { backgroundColor: colors.primarySoft },
  buttonQuiet: { backgroundColor: 'transparent', paddingHorizontal: spacing.sm },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.5 },
  iconButton: { width: 44, height: 44, borderRadius: radii.md, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line },
  progressTrack: { height: 8, backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: radii.pill },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 5, borderRadius: radii.pill, alignSelf: 'flex-start' },
  badgeNeutral: { backgroundColor: colors.surfaceMuted },
  badgeSuccess: { backgroundColor: colors.primarySoft },
  badgeWarning: { backgroundColor: colors.amberSoft },
  badgeLocked: { backgroundColor: '#ECEEEF' },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: spacing.lg },
  screenContent: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 126, width: '100%', alignSelf: 'center' },
  screenContentWide: { paddingHorizontal: spacing.xxl },
  notice: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md, gap: 3 },
  noticeInfo: { backgroundColor: colors.blueSoft, borderColor: colors.blueLine },
  noticeSuccess: { backgroundColor: colors.primarySoft, borderColor: '#D4CEFF' },
  noticeWarning: { backgroundColor: colors.amberSoft, borderColor: '#F7D984' },
  noticeLabel: { fontWeight: '800', letterSpacing: 0.8 },
  field: { gap: spacing.sm },
  fieldLabel: { fontWeight: '700' },
  input: { minHeight: 52, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.md, color: colors.ink, fontFamily: 'System', fontSize: typography.body },
  multiline: { minHeight: 116, textAlignVertical: 'top' },
  inputError: { borderColor: colors.danger },
  skyCloud: { position: 'absolute', pointerEvents: 'none' },
  cloudBase: { position: 'absolute', bottom: 0 },
  cloudPuffLarge: { position: 'absolute', bottom: 4 },
  cloudPuffSmall: { position: 'absolute', bottom: 4 },
});

const textVariants = StyleSheet.create({
  display: { fontSize: typography.display, lineHeight: 35, fontWeight: '800' },
  title: { fontSize: typography.title, lineHeight: 30, fontWeight: '800' },
  headline: { fontSize: typography.headline, lineHeight: 25, fontWeight: '700' },
  body: { fontSize: typography.body, lineHeight: 24 },
  small: { fontSize: typography.small, lineHeight: 19 },
  caption: { fontSize: typography.caption, lineHeight: 17, fontWeight: '600' },
  button: { fontSize: typography.body, lineHeight: 22, fontWeight: '700' },
});

const buttonVariants = StyleSheet.create({ primary: styles.buttonPrimary, secondary: styles.buttonSecondary, quiet: styles.buttonQuiet });
