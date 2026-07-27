import { router } from 'expo-router';
import { ArrowRight, Compass, Sparkles } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { AppButton, AppText } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

export default function WelcomeScreen() {
  const hydrated = useDemoStore((state) => state.hydrated);
  const onboardingComplete = useDemoStore((state) => state.onboardingComplete);

  useEffect(() => {
    if (hydrated && onboardingComplete) router.replace('/(tabs)/journey');
  }, [hydrated, onboardingComplete]);

  if (!hydrated) return <View style={styles.loading}><ActivityIndicator color={colors.primary} /></View>;

  return <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.mark}><Sparkles color={colors.white} size={24} /></View>
    <AppText variant="caption" color={colors.primary} style={styles.overline}>STARTUP COMPANION</AppText>
    <AppText variant="display" style={styles.title}>Make your idea real.</AppText>
    <AppText variant="body" color={colors.inkMuted} style={styles.lead}>A clear, guided path from first thought to first customer.</AppText>
    <View style={styles.preview}>
      <View style={styles.previewHeader}><Compass color={colors.primary} size={19} /><AppText variant="small" color={colors.primary}>Your founder journey</AppText></View>
      <View style={styles.previewLine}><View style={styles.dotDone} /><View style={styles.lineDone} /><AppText variant="body">Define the problem</AppText></View>
      <View style={styles.previewLine}><View style={styles.dotActive} /><View style={styles.line} /><AppText variant="body">Validate your first assumption</AppText></View>
      <View style={styles.previewLine}><View style={styles.dotLocked} /><AppText variant="body" color={colors.inkMuted}>Shape your business model</AppText></View>
    </View>
    <View style={styles.spacer} />
    <AppButton label="Start building" onPress={() => router.push('/onboarding')} icon={ArrowRight} />
    <AppText variant="caption" color={colors.inkSoft} style={styles.note}>A five-minute guided demo. No account required.</AppText>
  </ScrollView>;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas },
  content: { flexGrow: 1, padding: spacing.xl, paddingTop: 88, paddingBottom: 32, maxWidth: 620, width: '100%', alignSelf: 'center' },
  mark: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  overline: { letterSpacing: 1.6, fontWeight: '800', marginBottom: spacing.sm },
  title: { maxWidth: 330 },
  lead: { maxWidth: 340, marginTop: spacing.md, lineHeight: 25 },
  preview: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: spacing.lg, marginTop: 52, gap: spacing.md },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  previewLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 30 },
  dotDone: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  dotActive: { width: 12, height: 12, borderRadius: 6, borderWidth: 3, borderColor: colors.primary, backgroundColor: colors.white },
  dotLocked: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.line },
  lineDone: { width: 1, height: 22, backgroundColor: colors.primary, marginLeft: 5 },
  line: { width: 1, height: 22, backgroundColor: colors.line, marginLeft: 5 },
  spacer: { flex: 1, minHeight: 54 },
  note: { textAlign: 'center', marginTop: spacing.md },
});
