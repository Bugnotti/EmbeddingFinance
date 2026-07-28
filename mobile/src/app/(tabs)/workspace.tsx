import { router } from 'expo-router';
import { ArrowUpRight, FileText, LockKeyhole } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';

import { MascotGuide } from '@/components/mascot-guide';
import { AppText, ScreenHeader, SectionCard, StatusBadge } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

export default function WorkspaceScreen() {
  const artifacts = useDemoStore((state) => state.artifacts);
  const startup = useDemoStore((state) => state.startup);
  const [filter, setFilter] = useState<'all' | 'attention'>('all');
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  const visibleArtifacts = filter === 'all' ? artifacts : artifacts.filter((artifact) => artifact.status === 'draft' || artifact.status === 'needs_review');
  const groupedArtifacts = visibleArtifacts.reduce<Record<string, typeof visibleArtifacts>>((groups, artifact) => {
    groups[artifact.category] = [...(groups[artifact.category] ?? []), artifact];
    return groups;
  }, {});
  return <ScrollView style={styles.page} contentContainerStyle={[styles.content, isWide && styles.contentWide]}><ScreenHeader eyebrow="STARTUP WORKSPACE" title="Everything you build, in one place." description="Your startup gets clearer every time you complete a task." /><View style={styles.guideRow}><MascotGuide message={filter === 'attention' ? 'These are the pieces Pixel would look at next. Small updates add up.' : `Your ${startup?.name ?? 'startup'} has a home for every useful decision.`} mood={filter === 'attention' ? 'encouraging' : 'idle'} size={isWide ? 88 : 78} /><AppText variant="caption" color={colors.inkMuted} style={styles.guideNote}>A living library of your startup decisions.</AppText></View><View style={styles.filterRow}><FilterChip label="All artifacts" selected={filter === 'all'} onPress={() => setFilter('all')} /><FilterChip label="Needs attention" selected={filter === 'attention'} onPress={() => setFilter('attention')} /></View>{visibleArtifacts.length ? <View style={[styles.groupGrid, isWide && styles.groupGridWide]}>{Object.entries(groupedArtifacts).map(([category, categoryArtifacts]) => <View key={category} style={[styles.group, isWide && styles.groupWide]}><View style={styles.groupHeader}><AppText variant="headline">{category}</AppText><AppText variant="caption" color={colors.inkMuted}>{categoryArtifacts.length} {categoryArtifacts.length === 1 ? 'artifact' : 'artifacts'}</AppText></View><View style={styles.list}>{categoryArtifacts.map((artifact) => <ArtifactRow key={artifact.id} artifact={artifact} />)}</View></View>)}</View> : <SectionCard style={styles.empty}><AppText variant="headline">Nothing needs attention yet.</AppText><AppText variant="small" color={colors.inkMuted}>Complete a task or update an artifact to see it here.</AppText></SectionCard>}<SectionCard style={styles.tip}><AppText variant="caption" color={colors.primary}>A GOOD HABIT</AppText><AppText variant="headline">Build while you learn.</AppText><AppText variant="small" color={colors.inkMuted}>Every lesson leaves you with something useful for your company. Keep your artifacts honest and current.</AppText></SectionCard></ScrollView>;
}

function ArtifactRow({ artifact }: { artifact: ReturnType<typeof useDemoStore.getState>['artifacts'][number] }) {
  const canOpen = artifact.id === 'value-proposition';
  return <Pressable accessibilityRole={canOpen ? 'button' : 'text'} accessibilityLabel={canOpen ? `Open ${artifact.title}` : artifact.title} accessibilityState={{ disabled: !canOpen }} onPress={canOpen ? () => router.push('/artifact/value-proposition') : undefined} style={({ pressed }) => [styles.artifact, pressed && canOpen && styles.pressed]}><View style={styles.artifactIcon}>{artifact.status === 'not_started' ? <LockKeyhole color={colors.inkSoft} size={18} /> : <FileText color={colors.primary} size={18} />}</View><View style={styles.artifactCopy}><AppText variant="small" style={{ fontWeight: '750' }}>{artifact.title}</AppText><AppText variant="caption" color={colors.inkMuted}>{canOpen ? 'Editable canvas' : 'Preview available'}</AppText></View><View style={styles.artifactMeta}>{artifact.status === 'draft' ? <StatusBadge label="Draft" tone="warning" /> : artifact.status === 'needs_review' ? <StatusBadge label="Review" tone="success" /> : artifact.status === 'complete' ? <StatusBadge label="Done" tone="success" /> : <StatusBadge label="Not started" tone="locked" />}{canOpen && <ArrowUpRight size={17} color={colors.inkSoft} />}</View></Pressable>;
}

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={[styles.filterChip, selected && styles.filterChipSelected]}><AppText variant="caption" color={selected ? colors.primary : colors.inkMuted}>{label}</AppText></Pressable>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.xl, paddingBottom: 126, maxWidth: 620, width: '100%', alignSelf: 'center' }, contentWide: { maxWidth: 1040, paddingHorizontal: spacing.xxl }, guideRow: { gap: spacing.sm, marginBottom: spacing.xl }, guideNote: { marginLeft: spacing.sm }, filterRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }, filterChip: { minHeight: 36, paddingHorizontal: spacing.md, borderRadius: 999, backgroundColor: colors.surfaceMuted, justifyContent: 'center' }, filterChipSelected: { backgroundColor: colors.primarySoft }, groupGrid: { gap: spacing.xl }, groupGridWide: { flexDirection: 'row', flexWrap: 'wrap', columnGap: spacing.xl, alignItems: 'flex-start' }, group: { gap: spacing.sm }, groupWide: { width: '48%' }, groupHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: spacing.md }, list: { gap: spacing.sm }, artifact: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 12, padding: spacing.md, gap: spacing.md, minHeight: 72 }, pressed: { opacity: 0.72 }, artifactIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, artifactCopy: { flex: 1, gap: 2 }, artifactMeta: { alignItems: 'flex-end', gap: 6 }, empty: { gap: spacing.sm, backgroundColor: colors.surfaceMuted, borderColor: colors.surfaceMuted }, tip: { marginTop: spacing.xxl, gap: spacing.sm, backgroundColor: colors.surfaceMuted, borderColor: colors.surfaceMuted } });
