import { router } from 'expo-router';
import { Bell, ChevronRight, RotateCcw, ShieldCheck } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, View, useWindowDimensions } from 'react-native';
import { type ReactNode, useState } from 'react';

import { AppButton, AppText, InlineNotice, ScreenContent, ScreenHeader, SectionCard } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { countryOptions } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

export default function ProfileScreen() {
  const startup = useDemoStore((state) => state.startup);
  const resetDemo = useDemoStore((state) => state.resetDemo);
  const restoreSampleData = useDemoStore((state) => state.restoreSampleData);
  const country = countryOptions.find((item) => item.code === startup?.countryCode);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  return <ScrollView style={styles.page}><ScreenContent maxWidth={1040}><ScreenHeader compact eyebrow="YOUR SPACE" title="Profile" description="Keep your startup context close at hand." /><View style={[styles.layout, isWide && styles.layoutWide]}><SectionCard style={styles.identity}><View style={styles.logo}><AppText variant="headline" color={colors.primary}>{startup?.name?.slice(0, 2).toUpperCase() ?? 'SC'}</AppText></View><View style={styles.identityCopy}><AppText variant="headline">{startup?.name ?? 'Your startup'}</AppText><AppText variant="small" color={colors.inkMuted}>{country?.label ?? 'Choose a country'} · {startup?.industry ?? 'Choose an industry'}</AppText></View></SectionCard><View style={styles.settings}><Setting icon={Bell} label="Notifications" value={notificationsEnabled ? 'On' : 'Off'} trailing={<Switch accessibilityLabel="Notifications" value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: colors.line, true: colors.primarySoft }} thumbColor={notificationsEnabled ? colors.primary : colors.inkSoft} />} /><Setting icon={ShieldCheck} label="Data and privacy" value="Local demo" onPress={() => Alert.alert('Data and privacy', 'This preview stores startup information on this device only.')} /><Setting icon={ChevronRight} label="Legal education" value={`${country?.label ?? 'Country'} examples`} onPress={() => Alert.alert('Educational content', 'Legal steps shown in this preview are examples, not legal advice.')} /></View></View><InlineNotice label="LOCAL PREVIEW">Your startup context and drafts stay on this device in the demo.</InlineNotice><View style={styles.actions}><AppButton label="Restore sample startup" variant="secondary" onPress={() => { restoreSampleData(); router.replace('/(tabs)/journey'); }} /><Pressable accessibilityRole="button" accessibilityLabel="Reset demo data" onPress={() => Alert.alert('Reset demo?', 'This clears the local startup and returns to the welcome screen.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Reset', style: 'destructive', onPress: () => { resetDemo(); router.replace('/'); } }])} style={styles.reset}><RotateCcw color={colors.danger} size={17} /><AppText variant="small" color={colors.danger}>Reset demo data</AppText></Pressable></View><AppText variant="caption" color={colors.inkSoft} style={styles.version}>Startup Companion · UI preview 0.1</AppText></ScreenContent></ScrollView>;
}

function Setting({ icon: Icon, label, value, onPress, trailing }: { icon: typeof Bell; label: string; value: string; onPress?: () => void; trailing?: ReactNode }) {
  const content = <><View style={styles.settingIcon}><Icon color={colors.primary} size={18} /></View><AppText variant="small" style={styles.settingLabel}>{label}</AppText><AppText variant="caption" color={colors.inkMuted}>{value}</AppText>{trailing ?? <ChevronRight color={colors.inkSoft} size={17} />}</>;
  return onPress ? <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.setting}>{content}</Pressable> : <View style={styles.setting}>{content}</View>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, layout: { gap: spacing.lg }, layoutWide: { flexDirection: 'row', alignItems: 'flex-start' }, identity: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.md }, identityCopy: { flex: 1, gap: 3 }, logo: { width: 54, height: 54, borderRadius: 16, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, settings: { flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, overflow: 'hidden' }, setting: { minHeight: 64, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.line }, settingIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, settingLabel: { flex: 1, fontWeight: '700' }, actions: { gap: spacing.md, marginTop: spacing.xxl, maxWidth: 520 }, reset: { minHeight: 48, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm }, version: { textAlign: 'center', marginTop: spacing.xxl } });
