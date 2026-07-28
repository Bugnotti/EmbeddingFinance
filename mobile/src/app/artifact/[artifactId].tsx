import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CheckCircle2, Clock3, Sparkles } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { MascotGuide } from '@/components/mascot-guide';
import { AppButton, AppText, FormField, IconButton, StatusBadge } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

const fieldLabels = [
  ['customerJobs', 'Customer jobs', 'What is your customer trying to get done?'],
  ['pains', 'Pains', 'What makes that job difficult, expensive, or risky?'],
  ['gains', 'Gains', 'What would a better outcome feel like?'],
  ['products', 'Your product', 'What are you offering?'],
  ['painRelievers', 'Pain relievers', 'How does your product reduce the pain?'],
  ['gainCreators', 'Gain creators', 'How does your product create the desired gain?'],
] as const;

export default function ArtifactScreen() {
  const { artifactId } = useLocalSearchParams<{ artifactId: string }>();
  const artifact = useDemoStore((state) => state.artifacts.find((item) => item.id === artifactId));
  const artifactFields = artifact?.fields;
  const saveArtifact = useDemoStore((state) => state.saveArtifact);
  const [fields, setFields] = useState(artifact?.fields ?? {});
  const [saveState, setSaveState] = useState<'saved' | 'saving'>('saved');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }, []);

  useEffect(() => {
    if (artifactFields) setFields(artifactFields);
  }, [artifactFields]);

  if (!artifact) return <View style={styles.empty}><AppText variant="title">Artifact not found</AppText></View>;
  const artifactRecord = artifact;
  function updateField(key: string, value: string) {
    const nextFields = { ...fields, [key]: value };
    setFields(nextFields);
    setSaveState('saving');
    saveArtifact(artifactRecord.id, nextFields);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveState('saved'), 450);
  }
  const hasContent = Object.values(fields).some((value) => value.trim().length > 0);
  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={[styles.content, isWide && styles.contentWide]} keyboardShouldPersistTaps="handled"><View style={styles.top}><IconButton label="Go back" icon={ArrowLeft} onPress={() => router.back()} /><View style={styles.topStatus}><StatusBadge label={artifact.status === 'draft' ? 'Draft' : 'Editable'} tone="warning" /><View style={{ width: 4 }} /></View><View style={{ width: 44 }} /></View><View style={[styles.introLayout, isWide && styles.introLayoutWide]}><View style={styles.introCopy}><AppText variant="caption" color={colors.primary} style={styles.overline}>STRATEGY ARTIFACT</AppText><AppText variant="title">{artifact.title}</AppText><AppText variant="body" color={colors.inkMuted} style={styles.intro}>A useful canvas is specific enough to guide your next customer conversation.</AppText><View style={styles.artifactMeta}><Clock3 color={colors.inkMuted} size={14} /><AppText variant="caption" color={colors.inkMuted}>6 prompts · built for quick customer learning</AppText></View></View><MascotGuide message={hasContent ? 'This is getting clearer. Keep the customer’s exact words close to the canvas.' : 'Start with the customer’s job. Specific language gives the rest of the canvas somewhere to land.'} mood={hasContent ? 'encouraging' : 'idle'} size={isWide ? 120 : 92} style={styles.guide} /></View><View style={styles.formHeader}><AppText variant="headline">Shape the value map</AppText><AppText variant="small" color={colors.inkMuted}>Short, specific answers are more useful than polished guesses.</AppText></View><View style={[styles.form, isWide && styles.formWide]}>{fieldLabels.map(([key, label, hint]) => <View key={key} style={[styles.fieldWrap, isWide && styles.fieldWrapWide]}><FormField label={label} hint={hint} placeholder="Write a clear, specific answer" multiline value={fields[key] ?? ''} onChangeText={(value) => updateField(key, value)} /></View>)}</View><View style={styles.actions}><AppButton label="Review with Coach" icon={Sparkles} onPress={() => router.push('/coach')} /><View style={styles.saveRow}>{saveState === 'saved' ? <CheckCircle2 color={colors.primary} size={15} /> : <Clock3 color={colors.amber} size={15} />}<AppText variant="caption" color={saveState === 'saved' ? colors.primary : colors.amber}>{saveState === 'saved' ? 'Saved on this device' : 'Saving your latest answer…'}</AppText></View></View></ScrollView></KeyboardAvoidingView>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.xl, paddingBottom: spacing.xxxl, maxWidth: 620, width: '100%', alignSelf: 'center' }, contentWide: { maxWidth: 1040, paddingHorizontal: spacing.xxl }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xxl }, topStatus: { flexDirection: 'row', alignItems: 'center' }, introLayout: { gap: spacing.lg }, introLayoutWide: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xxl }, introCopy: { flex: 1 }, overline: { letterSpacing: 1.1, fontWeight: '800', marginBottom: spacing.sm }, intro: { lineHeight: 24, marginTop: spacing.sm }, artifactMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md }, guide: { marginTop: spacing.lg }, formHeader: { gap: spacing.xs, marginTop: spacing.xxxl }, form: { gap: spacing.xl, marginTop: spacing.xl }, formWide: { flexDirection: 'row', flexWrap: 'wrap', columnGap: spacing.lg }, fieldWrap: { width: '100%' }, fieldWrapWide: { flexGrow: 1, flexBasis: 300 }, actions: { marginTop: spacing.xxxl, gap: spacing.md }, saveRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas } });
