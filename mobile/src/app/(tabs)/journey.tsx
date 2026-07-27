import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ArrowRight, Blocks, Check, Cloud, Flag, Lightbulb, LockKeyhole, Megaphone, Rocket, Sparkles, Sun, Target, TrendingUp, UsersRound } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { useState } from 'react';

import { AppButton, AppText, ProgressBar, SectionCard, StatusBadge } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';
import { Milestone, JourneyStage } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

const ROW_HEIGHT = 154;
const NODE_CENTER_Y = 42;

export default function JourneyScreen() {
  const startup = useDemoStore((state) => state.startup);
  const milestones = useDemoStore((state) => state.milestones);
  const metrics = useDemoStore((state) => state.metrics);
  const active = milestones.find((item) => item.status === 'in_progress') ?? milestones.find((item) => item.status === 'available');
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}>
    <View style={styles.hero}>
      <Cloud color="#FFFFFF" fill="#FFFFFF" size={82} strokeWidth={1.5} style={styles.heroCloudOne} />
      <Cloud color="#DDF5FF" fill="#DDF5FF" size={68} strokeWidth={1.5} style={styles.heroCloudTwo} />
      <View style={styles.heroTop}>
        <View style={styles.heroCopy}>
          <AppText variant="caption" color="#FFFFFF" style={styles.overline}>YOUR STARTUP JOURNEY</AppText>
          <AppText variant="title" color="#FFFFFF">Build {startup?.name ?? 'your startup'}.</AppText>
          <AppText variant="small" color="#EEF8FF">One small step at a time, all the way to launch.</AppText>
        </View>
        <View style={styles.sun}><Sun color={colors.amber} fill="#FFF4B9" size={27} /></View>
      </View>
      <View style={styles.heroProgress}>
        <View style={styles.heroProgressTop}><AppText variant="caption" color="#FFFFFF">JOURNEY PROGRESS</AppText><AppText variant="headline" color="#FFFFFF">{metrics.progress}%</AppText></View>
        <ProgressBar value={metrics.progress} />
        <View style={styles.heroProgressBottom}><AppText variant="caption" color="#E5F6FF">Validate stage</AppText><View style={styles.streak}><Sparkles color={colors.amber} size={13} /><AppText variant="caption" color="#FFF9D2">3 day streak</AppText></View></View>
      </View>
    </View>

    {active && <SectionCard style={styles.nextCard}><View style={styles.nextHeader}><View style={styles.nextIcon}><Target color={colors.coral} size={20} /></View><View style={styles.nextCopy}><AppText variant="caption" color={colors.coral}>NEXT BEST ACTION</AppText><AppText variant="headline">{active.title}</AppText><AppText variant="small" color={colors.inkMuted}>{active.subtitle}</AppText></View></View><AppButton label="Continue" icon={ArrowRight} onPress={() => openMilestone(active)} disabled={!active.lessonId && !active.artifactId} /></SectionCard>}

    <View style={styles.sectionTitle}><View><AppText variant="headline">Your path to launch</AppText><AppText variant="small" color={colors.inkMuted}>Follow the trail. Each stop makes your startup clearer.</AppText></View><View style={styles.milestoneCount}><Flag color={colors.primary} size={15} /><AppText variant="caption" color={colors.primary}>{milestones.filter((item) => item.status === 'completed').length}/{milestones.length}</AppText></View></View>
    <Roadmap milestones={milestones} />

    <View style={styles.coachHint}><View style={styles.coachSpark}><Sparkles color={colors.white} size={17} /></View><View style={{ flex: 1 }}><AppText variant="small" style={{ fontWeight: '700' }}>Your Coach is waiting at the next stop.</AppText><AppText variant="caption" color={colors.inkMuted}>Get feedback on any startup artifact.</AppText></View><Pressable accessibilityRole="button" accessibilityLabel="Open Coach" onPress={() => router.push('/coach')}><AppText variant="small" color={colors.primary}>Open</AppText></Pressable></View>
  </ScrollView>;
}

function Roadmap({ milestones }: { milestones: Milestone[] }) {
  const [roadmapWidth, setRoadmapWidth] = useState(0);
  const height = milestones.length * ROW_HEIGHT;
  const points = milestones.map((_, index) => ({ x: index % 2 === 0 ? roadmapWidth * 0.28 : roadmapWidth * 0.72, y: NODE_CENTER_Y + index * ROW_HEIGHT }));
  const path = points.length && roadmapWidth ? buildPath(points) : '';

  return <View style={[styles.roadmapCanvas, { height }]} onLayout={(event) => setRoadmapWidth(event.nativeEvent.layout.width)}>
    <Cloud color="#FFFFFF" fill="#FFFFFF" size={76} strokeWidth={1.5} style={styles.cloudOne} />
    <Cloud color="#DDF5FF" fill="#DDF5FF" size={60} strokeWidth={1.5} style={styles.cloudTwo} />
    {path && <Svg width="100%" height={height} style={StyleSheet.absoluteFill} pointerEvents="none"><Path d={path} fill="none" stroke="#FFFFFF" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" /><Path d={path} fill="none" stroke="#9BDDF6" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" /></Svg>}
    {milestones.map((milestone, index) => <RoadmapNode key={milestone.id} milestone={milestone} index={index} />)}
  </View>;
}

function RoadmapNode({ milestone, index }: { milestone: Milestone; index: number }) {
  const Icon = milestoneIcon(milestone.stage);
  const canOpen = milestone.status === 'locked' || Boolean(milestone.lessonId || milestone.artifactId);
  return <View style={[styles.nodeRow, { top: index * ROW_HEIGHT }]}>
    <View style={[styles.nodeCluster, index % 2 === 1 && styles.nodeClusterRight]}>
      <Pressable accessibilityRole={canOpen ? 'button' : 'text'} accessibilityLabel={`${milestone.title}, ${milestone.status.replace('_', ' ')}`} accessibilityState={{ disabled: milestone.status === 'locked' }} onPress={canOpen ? () => openMilestone(milestone) : undefined} style={({ pressed }) => [styles.nodeButton, nodeButtonStyle(milestone.status), pressed && canOpen && milestone.status !== 'locked' && styles.pressed]}>
        {milestone.status === 'completed' ? <Check color={colors.white} size={25} strokeWidth={3.5} /> : milestone.status === 'locked' ? <LockKeyhole color={colors.inkSoft} size={22} /> : <Icon color={colors.white} size={25} strokeWidth={2.5} />}
      </Pressable>
      <View style={styles.nodeLabel}>
        <AppText variant="caption" color={stageColor(milestone.stage)} style={styles.nodeStage}>{milestone.stage.toUpperCase()}</AppText>
        <AppText variant="small" style={milestone.status === 'locked' ? styles.lockedTitle : styles.nodeTitle}>{milestone.title}</AppText>
        <StatusBadge label={milestone.status === 'completed' ? 'Done' : milestone.status === 'in_progress' ? 'Current stop' : milestone.status === 'locked' ? 'Locked' : 'Next stop'} tone={milestone.status === 'completed' ? 'success' : milestone.status === 'in_progress' ? 'warning' : milestone.status === 'locked' ? 'locked' : 'neutral'} />
      </View>
    </View>
  </View>;
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
  content: { padding: spacing.lg, paddingBottom: 126, maxWidth: 620, width: '100%', alignSelf: 'center' },
  hero: { minHeight: 226, overflow: 'hidden', borderRadius: 24, padding: spacing.xl, backgroundColor: colors.blue, position: 'relative' },
  heroCloudOne: { position: 'absolute', right: -18, top: -16, opacity: 0.94 },
  heroCloudTwo: { position: 'absolute', left: -12, bottom: -18, opacity: 0.82 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroCopy: { flex: 1, gap: spacing.sm },
  overline: { letterSpacing: 1.2, fontWeight: '800' },
  sun: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF4B9', alignItems: 'center', justifyContent: 'center' },
  heroProgress: { marginTop: spacing.xxl, gap: spacing.sm },
  heroProgressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroProgressBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nextCard: { marginTop: spacing.md, gap: spacing.lg, backgroundColor: colors.coralSoft, borderColor: '#FFD0C8', borderRadius: 18 },
  nextHeader: { flexDirection: 'row', gap: spacing.md },
  nextIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  nextCopy: { flex: 1, gap: 3 },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.md },
  milestoneCount: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.primarySoft },
  roadmapCanvas: { position: 'relative', overflow: 'hidden', borderRadius: 24, backgroundColor: '#CFF0FF', borderWidth: 1, borderColor: '#B9E7FA' },
  cloudOne: { position: 'absolute', top: 18, left: -18, opacity: 0.76 },
  cloudTwo: { position: 'absolute', bottom: 4, right: -14, opacity: 0.72 },
  nodeRow: { position: 'absolute', left: 0, right: 0, height: ROW_HEIGHT, paddingTop: 10 },
  nodeCluster: { width: '56%', alignItems: 'center' },
  nodeClusterRight: { alignSelf: 'flex-end' },
  nodeButton: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: '#FFFFFF' },
  nodeComplete: { backgroundColor: colors.primary },
  nodeCurrent: { backgroundColor: colors.coral },
  nodeAvailable: { backgroundColor: colors.amber },
  nodeLocked: { backgroundColor: '#EEF5F8', borderColor: '#FFFFFF' },
  nodeLabel: { alignItems: 'center', gap: 3, marginTop: spacing.sm, maxWidth: 150 },
  nodeStage: { fontWeight: '800', letterSpacing: 0.8 },
  nodeTitle: { fontWeight: '800', textAlign: 'center' },
  lockedTitle: { color: colors.inkMuted, textAlign: 'center' },
  pressed: { opacity: 0.72 },
  coachHint: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg, padding: spacing.lg, borderRadius: 18, backgroundColor: colors.surfaceMuted },
  coachSpark: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
