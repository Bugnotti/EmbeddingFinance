import { Activity, ArrowUpRight, CircleDollarSign, UsersRound } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, ScreenHeader, SectionCard } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

export default function MetricsScreen() {
  const metrics = useDemoStore((state) => state.metrics);
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}><ScreenHeader eyebrow="STARTUP SIGNALS" title="See what is moving." description="A simple view of the progress behind your next decision." /><View style={styles.grid}><Metric label="Journey progress" value={`${metrics.progress}%`} detail="+11% this week" icon={Activity} /><Metric label="Customer interviews" value={`${metrics.interviews}`} detail="2 remaining this stage" icon={UsersRound} /><Metric label="Experiments" value={`${metrics.experiments}`} detail="1 active" icon={ArrowUpRight} /><Metric label="Monthly spend" value={metrics.monthlySpend} detail="Illustrative sample" icon={CircleDollarSign} /></View><SectionCard style={styles.runway}><View style={styles.runwayTop}><View><AppText variant="caption" color={colors.primary}>RUNWAY SNAPSHOT</AppText><AppText variant="headline">{metrics.runway}</AppText></View><AppText variant="small" color={colors.inkMuted}>Sample data</AppText></View><View style={styles.bar}><View style={styles.barFill} /></View><View style={styles.legend}><AppText variant="caption" color={colors.inkMuted}>Cash available</AppText><AppText variant="caption" color={colors.inkMuted}>{metrics.revenue} revenue</AppText></View></SectionCard><AppText variant="caption" color={colors.inkSoft} style={styles.notice}>Metrics are illustrative demo values. Connect your sources when you are ready.</AppText></ScrollView>;
}

function Metric({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Activity }) {
  return <SectionCard style={styles.metric}><Icon color={colors.primary} size={18} /><AppText variant="title">{value}</AppText><AppText variant="small" style={{ fontWeight: '700' }}>{label}</AppText><AppText variant="caption" color={colors.inkMuted}>{detail}</AppText></SectionCard>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.xl, paddingBottom: 126, maxWidth: 620, width: '100%', alignSelf: 'center' }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, metric: { width: '48%', minWidth: 140, flexGrow: 1, gap: spacing.sm }, runway: { marginTop: spacing.sm, gap: spacing.lg }, runwayTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, bar: { height: 10, backgroundColor: colors.surfaceMuted, borderRadius: 99, overflow: 'hidden' }, barFill: { width: '68%', height: '100%', backgroundColor: colors.primary, borderRadius: 99 }, legend: { flexDirection: 'row', justifyContent: 'space-between' }, notice: { textAlign: 'center', marginTop: spacing.lg, lineHeight: 18 } });
