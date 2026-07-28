import { router } from 'expo-router';
import { AccessibilityInfo, Alert, Animated, Easing, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Blocks, Check, Flag, Lightbulb, LockKeyhole, Megaphone, Rocket, Sparkles, Sun, Target, TrendingUp, UsersRound } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import { MascotGuide } from '@/components/mascot-guide';
import { AppButton, AppText, ProgressBar, SkyCloud, StatusBadge } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';
import { Milestone, JourneyStage } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

const ROW_HEIGHT = 142;
const NODE_CENTER_Y = 44;

export default function JourneyScreen() {
  const startup = useDemoStore((state) => state.startup);
  const milestones = useDemoStore((state) => state.milestones);
  const metrics = useDemoStore((state) => state.metrics);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  const active = milestones.find((item) => item.status === 'in_progress') ?? milestones.find((item) => item.status === 'available');
  const completedCount = milestones.filter((item) => item.status === 'completed').length;

  return <ScrollView style={styles.page} contentContainerStyle={[styles.content, isWide && styles.contentWide]}>
    <View style={styles.topBar}>
      <View style={styles.topCopy}>
        <AppText variant="caption" color={colors.primary} style={styles.overline}>YOUR JOURNEY</AppText>
        <AppText variant="title">Build {startup?.name ?? 'your startup'}.</AppText>
      </View>
      <View style={styles.streak}><Sparkles color={colors.amber} size={15} /><AppText variant="caption" color={colors.amber}>3 day streak</AppText></View>
    </View>

    <View style={styles.progressStrip}><View style={styles.progressCopy}><AppText variant="caption" color={colors.inkMuted}>VALIDATE STAGE</AppText><AppText variant="headline">{metrics.progress}% clearer</AppText></View><ProgressBar value={metrics.progress} /><View style={styles.progressMeta}><AppText variant="caption" color={colors.inkMuted}>{completedCount} of {milestones.length} stops complete</AppText><View style={styles.progressSpark}><Sun color={colors.amber} fill={colors.amberSoft} size={14} /><AppText variant="caption" color={colors.inkMuted}>Keep going</AppText></View></View></View>

    <View style={[styles.skyScene, isWide && styles.skySceneWide]}>
      <SkyCloud size={92} style={styles.skyCloudOne} />
      <SkyCloud size={72} color={colors.blueSoft} style={styles.skyCloudTwo} />
      <View style={styles.skySun}><Sun color={colors.amber} fill={colors.amberSoft} size={26} /></View>
      <View style={styles.skyCopy}><AppText variant="title" color={colors.white}>From idea to launch.</AppText><AppText variant="small" color={colors.blueSoft}>One useful decision at a time.</AppText></View>
      <MascotGuide message={active ? `Pixel's pick: ${active.title}. Ready for one small step?` : 'Your path is ready. Pick a stop and keep learning.'} mood={active ? 'encouraging' : 'idle'} size={isWide ? 112 : 88} style={styles.skyGuide} />
    </View>

    {active && <View style={[styles.nextAction, isWide && styles.nextActionWide]}><View style={styles.actionCopy}><View style={styles.actionKicker}><Target color={colors.coral} size={15} /><AppText variant="caption" color={colors.coral}>NEXT BEST ACTION</AppText></View><AppText variant="headline">{active.title}</AppText>{isWide && <AppText variant="small" color={colors.inkMuted}>{active.subtitle}</AppText>}</View><AppButton label="Continue" icon={ArrowRight} onPress={() => openMilestone(active)} disabled={!active.lessonId && !active.artifactId} style={styles.continueButton} /></View>}

    <View style={styles.pathHeading}><View><AppText variant="headline">Your path</AppText>{isWide && <AppText variant="small" color={colors.inkMuted}>Follow the trail to your first customer.</AppText>}</View><View style={styles.milestoneCount}><Flag color={colors.primary} size={14} /><AppText variant="caption" color={colors.primary}>{completedCount}/{milestones.length}</AppText></View></View>
    <Roadmap milestones={milestones} isWide={isWide} />

    <Pressable accessibilityRole="button" accessibilityLabel="Open Coach" onPress={() => router.push('/coach')} style={({ pressed }) => [styles.coachLine, pressed && styles.pressed]}><View style={styles.coachSpark}><Sparkles color={colors.white} size={15} /></View><AppText variant="small" style={styles.coachText}>Need a nudge? Ask Pixel’s Coach.</AppText><ArrowRight color={colors.primary} size={17} /></Pressable>
  </ScrollView>;
}

function Roadmap({ milestones, isWide }: { milestones: Milestone[]; isWide: boolean }) {
  const [roadmapWidth, setRoadmapWidth] = useState(0);
  const height = milestones.length * ROW_HEIGHT;
  const points = milestones.map((_, index) => ({ x: index % 2 === 0 ? roadmapWidth * 0.28 : roadmapWidth * 0.72, y: NODE_CENTER_Y + index * ROW_HEIGHT }));
  const path = points.length && roadmapWidth ? buildPath(points) : '';

  return <View style={[styles.roadmapCanvas, { height }]} onLayout={(event) => setRoadmapWidth(event.nativeEvent.layout.width)}><SkyCloud size={76} style={styles.cloudOne} /><SkyCloud size={60} color={colors.blueSoft} style={styles.cloudTwo} />{path && <Svg width="100%" height={height} style={[StyleSheet.absoluteFill, styles.nonInteractive]}><Path d={path} fill="none" stroke={colors.white} strokeWidth={27} strokeLinecap="round" strokeLinejoin="round" /><Path d={path} fill="none" stroke={colors.primaryPath} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" /></Svg>}{milestones.map((milestone, index) => <RoadmapNode key={milestone.id} milestone={milestone} index={index} total={milestones.length} isWide={isWide} />)}</View>;
}

function RoadmapNode({ milestone, index, total, isWide }: { milestone: Milestone; index: number; total: number; isWide: boolean }) {
  const Icon = milestoneIcon(milestone.stage);
  const canOpen = milestone.status === 'locked' || Boolean(milestone.lessonId || milestone.artifactId);
  const pulse = useRef(new Animated.Value(1)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    void AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (milestone.status !== 'in_progress' || reduceMotion) {
      pulse.setValue(1);
      return;
    }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.07, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [milestone.status, pulse, reduceMotion]);

  return <View style={[styles.nodeRow, { top: index * ROW_HEIGHT }]}><View style={[styles.nodeCluster, index % 2 === 1 && styles.nodeClusterRight]}><Animated.View style={{ transform: [{ scale: pulse }] }}><Pressable accessibilityRole={canOpen ? 'button' : 'text'} accessibilityLabel={`${milestone.title}, ${milestone.status.replace('_', ' ')}`} accessibilityState={{ disabled: milestone.status === 'locked' }} onPress={canOpen ? () => openMilestone(milestone) : undefined} style={({ pressed }) => [styles.nodeButton, nodeButtonStyle(milestone.status), pressed && canOpen && milestone.status !== 'locked' && styles.pressed]}>{milestone.status === 'completed' ? <Check color={colors.white} size={25} strokeWidth={3.5} /> : milestone.status === 'locked' ? <LockKeyhole color={colors.inkSoft} size={22} /> : <Icon color={colors.white} size={25} strokeWidth={2.5} />}</Pressable></Animated.View><View style={styles.nodeLabel}><AppText variant="caption" color={stageColor(milestone.stage)} style={styles.nodeStage}>{milestone.stage.toUpperCase()}</AppText><AppText variant="small" style={milestone.status === 'locked' ? styles.lockedTitle : styles.nodeTitle}>{milestone.title}</AppText>{isWide && <StatusBadge label={milestone.status === 'completed' ? 'Done' : milestone.status === 'in_progress' ? 'Current stop' : milestone.status === 'locked' ? 'Locked' : 'Next stop'} tone={milestone.status === 'completed' ? 'success' : milestone.status === 'in_progress' ? 'warning' : milestone.status === 'locked' ? 'locked' : 'neutral'} />}<AppText variant="caption" color={colors.inkSoft} style={styles.stepCount}>{index + 1} / {total}</AppText></View></View></View>;
}

function openMilestone(milestone: Milestone) {
  if (milestone.status === 'locked') {
    Alert.alert('Milestone locked', 'Complete the previous stop to unlock this part of the journey.');
    return;
  }
  if (milestone.lessonId) router.push(`/lesson/${milestone.lessonId}`);
  else if (milestone.artifactId) router.push(`/artifact/${milestone.artifactId}`);
}

function milestoneIcon(stage: JourneyStage) {
  if (stage === 'Idea') return Lightbulb;
  if (stage === 'Validate') return UsersRound;
  if (stage === 'Plan') return Blocks;
  if (stage === 'Build') return Rocket;
  if (stage === 'Launch') return Megaphone;
  return TrendingUp;
}

function stageColor(stage: JourneyStage) {
  if (stage === 'Idea') return colors.amber;
  if (stage === 'Validate') return colors.coral;
  if (stage === 'Plan') return colors.primary;
  if (stage === 'Build') return colors.blue;
  if (stage === 'Launch') return colors.pink;
  return colors.primaryDark;
}

function nodeButtonStyle(status: Milestone['status']) {
  if (status === 'completed') return styles.nodeComplete;
  if (status === 'in_progress') return styles.nodeCurrent;
  if (status === 'available') return styles.nodeAvailable;
  return styles.nodeLocked;
}

function buildPath(points: { x: number; y: number }[]) {
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const middleY = (previous.y + point.y) / 2;
    return `${path} C ${previous.x} ${middleY - 26}, ${point.x} ${middleY + 26}, ${point.x} ${point.y}`;
  }, '');
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  content: { padding: spacing.lg, paddingBottom: 126, maxWidth: 680, width: '100%', alignSelf: 'center' },
  contentWide: { maxWidth: 1040, paddingHorizontal: spacing.xl },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  topCopy: { gap: 3 },
  overline: { letterSpacing: 1.2, fontWeight: '800' },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.amberSoft },
  progressStrip: { gap: spacing.sm, marginBottom: spacing.lg },
  progressCopy: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  progressMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressSpark: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  skyScene: { minHeight: 190, overflow: 'hidden', borderRadius: 28, padding: spacing.xl, backgroundColor: colors.blue, position: 'relative', justifyContent: 'space-between', marginBottom: spacing.lg },
  skySceneWide: { minHeight: 168, flexDirection: 'row', alignItems: 'center' },
  skyCloudOne: { top: -12, right: -18, opacity: 0.95 },
  skyCloudTwo: { bottom: -18, left: -12, opacity: 0.78 },
  skySun: { position: 'absolute', top: 20, right: 72, width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFF4B9', alignItems: 'center', justifyContent: 'center' },
  skyCopy: { gap: spacing.sm, zIndex: 2 },
  skyGuide: { marginTop: spacing.lg, zIndex: 2 },
  nextAction: { gap: spacing.lg, padding: spacing.lg, borderLeftWidth: 5, borderLeftColor: colors.coral, backgroundColor: colors.coralSoft, borderRadius: 16, marginBottom: spacing.xxl },
  nextActionWide: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actionCopy: { flex: 1, gap: 4 },
  actionKicker: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  continueButton: { minWidth: 150 },
  pathHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  milestoneCount: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.primarySoft },
  roadmapCanvas: { position: 'relative', overflow: 'hidden', borderRadius: 28, backgroundColor: colors.blueSoft, borderWidth: 1, borderColor: colors.blueLine },
  cloudOne: { top: 16, left: -18, opacity: 0.76 },
  cloudTwo: { bottom: 4, right: -14, opacity: 0.72 },
  nonInteractive: { pointerEvents: 'none' },
  nodeRow: { position: 'absolute', left: 0, right: 0, height: ROW_HEIGHT, paddingTop: 10 },
  nodeCluster: { width: '56%', alignItems: 'center' },
  nodeClusterRight: { alignSelf: 'flex-end' },
  nodeButton: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: colors.white },
  nodeComplete: { backgroundColor: colors.primary },
  nodeCurrent: { backgroundColor: colors.coral },
  nodeAvailable: { backgroundColor: colors.amber },
  nodeLocked: { backgroundColor: '#EEF5F8', borderColor: colors.white },
  nodeLabel: { alignItems: 'center', gap: 3, marginTop: spacing.sm, maxWidth: 156 },
  nodeStage: { fontWeight: '800', letterSpacing: 0.8 },
  nodeTitle: { fontWeight: '800', textAlign: 'center' },
  lockedTitle: { color: colors.inkMuted, textAlign: 'center' },
  stepCount: { fontWeight: '700' },
  coachLine: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderTopWidth: 1, borderTopColor: colors.line, marginTop: spacing.lg, paddingTop: spacing.lg },
  coachSpark: { width: 32, height: 32, borderRadius: 11, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  coachText: { flex: 1, fontWeight: '700' },
  pressed: { opacity: 0.72 },
});
