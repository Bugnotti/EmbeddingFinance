import { router } from 'expo-router';
import { ArrowRight, Check, LockKeyhole, Sparkles, Target } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppButton, AppText, ProgressBar, SectionCard, StatusBadge } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { JourneyStage, stages } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

export default function JourneyScreen() {
  const startup = useDemoStore((state) => state.startup);
  const milestones = useDemoStore((state) => state.milestones);
  const metrics = useDemoStore((state) => state.metrics);
  const active = milestones.find((item) => item.status === 'in_progress') ?? milestones.find((item) => item.status === 'available');
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}>
    <View style={styles.greeting}><View><AppText variant="caption" color={colors.primary} style={styles.overline}>YOUR STARTUP JOURNEY</AppText><AppText variant="title">Good morning, founder.</AppText></View><View style={styles.avatar}><AppText variant="small" color={colors.primary}>NF</AppText></View></View>
    <SectionCard style={styles.progressCard}><View style={styles.progressTop}><View><AppText variant="caption" color={colors.inkMuted}>CURRENT STAGE</AppText><AppText variant="headline">{startup?.stage ?? 'Idea'} validation</AppText></View><View style={styles.progressValue}><AppText variant="title" color={colors.primary}>{metrics.progress}%</AppText><AppText variant="caption" color={colors.inkMuted}>complete</AppText></View></View><ProgressBar value={metrics.progress} /><View style={styles.progressBottom}><AppText variant="caption" color={colors.inkMuted}>3 day streak</AppText><AppText variant="caption" color={colors.primary}>Keep going</AppText></View></SectionCard>
    {active && <SectionCard style={styles.nextCard}><View style={styles.nextHeader}><View style={styles.nextIcon}><Target color={colors.primary} size={18} /></View><View style={styles.nextCopy}><AppText variant="caption" color={colors.primary}>NEXT BEST ACTION</AppText><AppText variant="headline">{active.title}</AppText><AppText variant="small" color={colors.inkMuted}>{active.subtitle}</AppText></View></View><AppButton label="Continue" icon={ArrowRight} onPress={() => active.lessonId ? router.push(`/lesson/${active.lessonId}`) : undefined} /></SectionCard>}
    <View style={styles.sectionTitle}><AppText variant="headline">Your roadmap</AppText><AppText variant="small" color={colors.inkMuted}>{milestones.filter((item) => item.status === 'completed').length} of {milestones.length} milestones</AppText></View>
    <View style={styles.roadmap}>{stages.map((stage) => <StageSection key={stage} stage={stage} milestones={milestones.filter((item) => item.stage === stage)} />)}</View>
    <View style={styles.coachHint}><Sparkles color={colors.primary} size={18} /><View style={{ flex: 1 }}><AppText variant="small" style={{ fontWeight: '700' }}>Your Coach is ready when you are.</AppText><AppText variant="caption" color={colors.inkMuted}>Get feedback on any startup artifact.</AppText></View><Pressable accessibilityRole="button" accessibilityLabel="Open Coach" onPress={() => router.push('/coach')}><AppText variant="small" color={colors.primary}>Open</AppText></Pressable></View>
  </ScrollView>;
}

function StageSection({ stage, milestones }: { stage: JourneyStage; milestones: ReturnType<typeof useDemoStore.getState>['milestones'] }) {
  if (!milestones.length) return null;
  return <View style={styles.stage}><View style={styles.stageTitle}><AppText variant="caption" color={colors.inkMuted} style={styles.stageLabel}>{stage.toUpperCase()}</AppText><View style={styles.stageLine} /></View>{milestones.map((milestone, index) => <View key={milestone.id} style={styles.milestoneRow}><View style={styles.nodeColumn}><View style={[styles.node, milestone.status === 'completed' && styles.nodeDone, milestone.status === 'in_progress' && styles.nodeActive, milestone.status === 'locked' && styles.nodeLocked]}>{milestone.status === 'completed' ? <Check color={colors.white} size={14} strokeWidth={3} /> : milestone.status === 'locked' ? <LockKeyhole color={colors.inkSoft} size={13} /> : <View style={styles.nodeInner} />}</View>{index < milestones.length - 1 && <View style={[styles.connector, milestone.status === 'completed' && styles.connectorDone]} />}</View><View style={styles.milestoneCopy}><View style={styles.milestoneTop}><AppText variant="body" style={milestone.status === 'locked' && { color: colors.inkMuted }}>{milestone.title}</AppText>{milestone.status === 'completed' ? <StatusBadge label="Done" tone="success" /> : milestone.status === 'in_progress' ? <StatusBadge label="In progress" tone="warning" /> : milestone.status === 'locked' ? <StatusBadge label="Locked" tone="locked" /> : <StatusBadge label="Next" />}</View><AppText variant="small" color={colors.inkMuted}>{milestone.subtitle}</AppText></View></View>)}</View>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  content: { padding: spacing.xl, paddingBottom: 126, maxWidth: 620, width: '100%', alignSelf: 'center' },
  greeting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  overline: { letterSpacing: 1.2, fontWeight: '800', marginBottom: spacing.sm },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  progressCard: { gap: spacing.md },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  progressValue: { alignItems: 'flex-end' },
  progressBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  nextCard: { marginTop: spacing.md, gap: spacing.lg, backgroundColor: colors.primarySoft, borderColor: '#C7E3D9' },
  nextHeader: { flexDirection: 'row', gap: spacing.md },
  nextIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  nextCopy: { flex: 1, gap: 3 },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: spacing.xxxl, marginBottom: spacing.lg },
  roadmap: { gap: spacing.lg },
  stage: { gap: spacing.sm },
  stageTitle: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stageLabel: { letterSpacing: 1, fontWeight: '800' },
  stageLine: { height: 1, flex: 1, backgroundColor: colors.line },
  milestoneRow: { flexDirection: 'row', minHeight: 72 },
  nodeColumn: { width: 28, alignItems: 'center' },
  node: { width: 25, height: 25, borderRadius: 13, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  nodeDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  nodeActive: { borderColor: colors.primary, borderWidth: 2 },
  nodeLocked: { backgroundColor: colors.surfaceMuted },
  nodeInner: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.primary },
  connector: { width: 1, flex: 1, backgroundColor: colors.line, marginTop: -1 },
  connectorDone: { backgroundColor: colors.primary },
  milestoneCopy: { flex: 1, marginLeft: spacing.md, gap: 3, paddingBottom: spacing.lg },
  milestoneTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  coachHint: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg, padding: spacing.lg, borderRadius: 12, backgroundColor: colors.surfaceMuted },
});
