import { Link, Redirect } from 'expo-router';
import { ArrowRight, Check, Compass, Flag, Lightbulb, Sparkles, Target } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { AppText, SkyCloud } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

export default function WelcomeScreen() {
  const hydrated = useDemoStore((state) => state.hydrated);
  const onboardingComplete = useDemoStore((state) => state.onboardingComplete);
  const markHydrated = useDemoStore((state) => state.markHydrated);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!useDemoStore.getState().hydrated) markHydrated();
    }, 2500);
    return () => clearTimeout(timeout);
  }, [markHydrated]);

  if (!hydrated) return <View style={styles.loading}><ActivityIndicator color={colors.primary} /></View>;
  if (onboardingComplete) return <Redirect href="/(tabs)/journey" />;

  return <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.welcomeTop}><View style={styles.mark}><Sparkles color={colors.white} size={24} /></View><Image source={require('../../assets/images/mascots/startup-cat.png')} accessibilityLabel="Pixel-art cat startup guide" resizeMode="contain" style={styles.welcomeMascot} /></View>
    <AppText variant="caption" color={colors.primary} style={styles.overline}>STARTUP COMPANION</AppText>
    <AppText variant="display" style={styles.title}>Make your idea real.</AppText>
    <AppText variant="body" color={colors.inkMuted} style={styles.lead}>A clear, guided path from first thought to first customer.</AppText>
    <View style={styles.preview}>
      <View style={styles.previewHeader}><Compass color={colors.primary} size={18} /><AppText variant="caption" color={colors.primary}>YOUR FOUNDER JOURNEY</AppText></View>
      <SkyCloud size={66} style={styles.cloudOne} />
      <SkyCloud size={52} color={colors.blueSoft} style={styles.cloudTwo} />
      <Svg viewBox="0 0 342 220" preserveAspectRatio="none" width="100%" height="220" style={[StyleSheet.absoluteFill, styles.previewPath]}>
        <Path d="M 48 174 C 82 174, 92 112, 157 112 C 214 112, 224 54, 292 54" fill="none" stroke={colors.white} strokeWidth={22} strokeLinecap="round" />
        <Path d="M 48 174 C 82 174, 92 112, 157 112 C 214 112, 224 54, 292 54" fill="none" stroke={colors.primaryPath} strokeWidth={10} strokeLinecap="round" />
      </Svg>
      <JourneyPreviewNode style={styles.previewNodeOne} icon={Check} label="Problem" tone={colors.primary} />
      <JourneyPreviewNode style={styles.previewNodeTwo} icon={Target} label="Validate" tone={colors.coral} />
      <JourneyPreviewNode style={styles.previewNodeThree} icon={Flag} label="Launch" tone={colors.amber} />
      <View style={styles.ideaSpark}><Lightbulb color={colors.amber} fill={colors.amberSoft} size={18} /></View>
    </View>
    <View style={styles.spacer} />
    <Link href="/onboarding" accessibilityRole="button" accessibilityLabel="Start building" style={styles.startLink}><View style={styles.startLinkContent}><ArrowRight color={colors.white} size={18} strokeWidth={2.2} /><AppText variant="button" color={colors.white}>Start building</AppText></View></Link>
    <AppText variant="caption" color={colors.inkSoft} style={styles.note}>A five-minute guided demo. No account required.</AppText>
  </ScrollView>;
}

function JourneyPreviewNode({ icon: Icon, label, tone, style }: { icon: typeof Check; label: string; tone: string; style: object }) {
  return <View style={[styles.previewNodeGroup, style]}>
    <View style={[styles.previewNode, { backgroundColor: tone }]}><Icon color={colors.white} size={19} strokeWidth={3} /></View>
    <AppText variant="caption" style={styles.previewNodeLabel}>{label}</AppText>
  </View>;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas },
  content: { flexGrow: 1, padding: spacing.xl, paddingTop: 64, paddingBottom: 32, maxWidth: 620, width: '100%', alignSelf: 'center', overflow: 'hidden' },
  welcomeTop: { minHeight: 72, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.lg },
  mark: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  welcomeMascot: { width: 78, height: 78, marginTop: -10, marginRight: -4 },
  overline: { letterSpacing: 1.6, fontWeight: '800', marginBottom: spacing.sm },
  title: { maxWidth: 330 },
  lead: { maxWidth: 340, marginTop: spacing.md, lineHeight: 25 },
  preview: { height: 266, marginTop: spacing.xl, position: 'relative' },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, position: 'absolute', left: 0, top: 2, zIndex: 2 },
  previewPath: { top: 28, pointerEvents: 'none' },
  cloudOne: { position: 'absolute', left: -30, bottom: 20, opacity: 0.86 },
  cloudTwo: { position: 'absolute', right: -16, top: 45, opacity: 0.75 },
  previewNodeGroup: { position: 'absolute', alignItems: 'center', width: 80, zIndex: 3 },
  previewNodeOne: { left: 6, top: 173 },
  previewNodeTwo: { left: '39%', top: 111 },
  previewNodeThree: { right: 5, top: 53 },
  previewNode: { width: 48, height: 48, borderRadius: 24, borderWidth: 4, borderColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  previewNodeLabel: { marginTop: 3, color: colors.ink, fontWeight: '800', backgroundColor: colors.canvas, paddingHorizontal: 4, borderRadius: radii.sm },
  ideaSpark: { position: 'absolute', left: '27%', top: 88, width: 34, height: 34, borderRadius: 17, backgroundColor: colors.amberSoft, alignItems: 'center', justifyContent: 'center' },
  spacer: { flex: 1, minHeight: spacing.md },
  startLink: { minHeight: 52, borderRadius: radii.md, backgroundColor: colors.primary, justifyContent: 'center', textDecorationLine: 'none' },
  startLinkContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  note: { textAlign: 'center', marginTop: spacing.md },
});
