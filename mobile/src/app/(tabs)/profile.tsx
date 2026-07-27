import { router } from 'expo-router';
import { Bell, ChevronRight, RotateCcw, ShieldCheck } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppButton, AppText, ScreenHeader, SectionCard } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { countryOptions } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

export default function ProfileScreen() {
  const startup = useDemoStore((state) => state.startup);
  const resetDemo = useDemoStore((state) => state.resetDemo);
  const restoreSampleData = useDemoStore((state) => state.restoreSampleData);
  const country = countryOptions.find((item) => item.code === startup?.countryCode);
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}><ScreenHeader eyebrow="YOUR SPACE" title="Profile" description="Keep your startup context close at hand." /><SectionCard style={styles.identity}><View style={styles.logo}><AppText variant="headline" color={colors.primary}>{startup?.name?.slice(0, 2).toUpperCase() ?? 'SC'}</AppText></View><View style={{ flex: 1, gap: 3 }}><AppText variant="headline">{startup?.name ?? 'Your startup'}</AppText><AppText variant="small" color={colors.inkMuted}>{country?.label ?? 'Choose a country'} · {startup?.industry ?? 'Choose an industry'}</AppText></View></SectionCard><View style={styles.settings}><Setting icon={Bell} label="Notifications" value="On" /><Setting icon={ShieldCheck} label="Data and privacy" value="Local demo" /><Setting icon={ChevronRight} label="Legal education" value="Italy examples" /></View><View style={styles.actions}><AppButton label="Restore sample startup" variant="secondary" onPress={() => { restoreSampleData(); router.replace('/(tabs)/journey'); }} /><Pressable accessibilityRole="button" onPress={() => Alert.alert('Reset demo?', 'This clears the local startup and returns to the welcome screen.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Reset', style: 'destructive', onPress: () => { resetDemo(); router.replace('/'); } }])} style={styles.reset}><RotateCcw color={colors.danger} size={17} /><AppText variant="small" color={colors.danger}>Reset demo data</AppText></Pressable></View><AppText variant="caption" color={colors.inkSoft} style={styles.version}>Startup Companion · UI preview 0.1</AppText></ScrollView>;
}

function Setting({ icon: Icon, label, value }: { icon: typeof Bell; label: string; value: string }) {
  return <View style={styles.setting}><View style={styles.settingIcon}><Icon color={colors.primary} size={18} /></View><AppText variant="small" style={{ flex: 1, fontWeight: '700' }}>{label}</AppText><AppText variant="caption" color={colors.inkMuted}>{value}</AppText><ChevronRight color={colors.inkSoft} size={17} /></View>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.xl, paddingBottom: 126, maxWidth: 620, width: '100%', alignSelf: 'center' }, identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg }, logo: { width: 54, height: 54, borderRadius: 16, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, settings: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, overflow: 'hidden' }, setting: { minHeight: 64, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.line }, settingIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, actions: { gap: spacing.md, marginTop: spacing.xxl }, reset: { minHeight: 48, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm }, version: { textAlign: 'center', marginTop: spacing.xxl } });
