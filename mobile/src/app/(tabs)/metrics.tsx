import { Activity, ArrowUpRight, CircleDollarSign, UsersRound } from 'lucide-react-native';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { AppText, InlineNotice, ProgressBar, ScreenContent, ScreenHeader, SectionCard } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

export default function MetricsScreen() {
  const metrics = useDemoStore((state) => state.metrics);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  return <ScrollView style={styles.page}><ScreenContent maxWidth={1040}><ScreenHeader compact eyebrow="STARTUP SIGNALS" title="See what is moving." description="A simple view of the progress behind your next decision." /><View style={[styles.grid, isWide && styles.gridWide]}><Metric wide={isWide} label="Journey progress" value={`${metrics.progress}%`} detail="Derived from completed steps" icon={Activity} /><Metric wide={isWide} label="Customer interviews" value={`${metrics.interviews}`} detail="Conversations recorded" icon={UsersRound} /><Metric wide={isWide} label="Experiments" value={`${metrics.experiments}`} detail="Active learning loops" icon={ArrowUpRight} /><Metric wide={isWide} label="Monthly spend" value={metrics.monthlySpend} detail="Illustrative sample" icon={CircleDollarSign} /></View><SectionCard style={styles.runway}><View style={styles.runwayTop}><View><AppText variant="caption" color={colors.primary}>RUNWAY SNAPSHOT</AppText><AppText variant="headline">{metrics.runway}</AppText></View><AppText variant="small" color={colors.inkMuted}>Sample data</AppText></View><ProgressBar value={68} /><View style={styles.legend}><AppText variant="caption" color={colors.inkMuted}>Cash available</AppText><AppText variant="caption" color={colors.inkMuted}>{metrics.revenue} revenue</AppText></View></SectionCard><InlineNotice label="DEMO DATA">Financial and runway values are illustrative until real sources are connected.</InlineNotice></ScreenContent></ScrollView>;
}

function Metric({ label, value, detail, icon: Icon, wide }: { label: string; value: string; detail: string; icon: typeof Activity; wide: boolean }) {
  return <SectionCard accessibilityLabel={`${label}: ${value}. ${detail}`} style={[styles.metric, wide && styles.metricWide]}><Icon color={colors.primary} size={18} /><AppText variant="title">{value}</AppText><AppText variant="small" style={{ fontWeight: '700' }}>{label}</AppText><AppText variant="caption" color={colors.inkMuted}>{detail}</AppText></SectionCard>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, gridWide: { gap: spacing.lg }, metric: { width: '48%', minWidth: 140, flexGrow: 1, gap: spacing.sm }, metricWide: { width: '23%', minWidth: 0 }, runway: { marginTop: spacing.xl, gap: spacing.lg }, runwayTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, legend: { flexDirection: 'row', justifyContent: 'space-between' } });
