import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { AppButton, AppText, FormField, IconButton } from '@/components/ui';
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
  const saveArtifact = useDemoStore((state) => state.saveArtifact);
  const [fields, setFields] = useState(artifact?.fields ?? {});
  if (!artifact) return <View style={styles.empty}><AppText variant="title">Artifact not found</AppText></View>;
  const artifactRecord = artifact;
  function updateField(key: string, value: string) {
    const nextFields = { ...fields, [key]: value };
    setFields(nextFields);
    saveArtifact(artifactRecord.id, nextFields);
  }
  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><View style={styles.top}><IconButton label="Go back" icon={ArrowLeft} onPress={() => router.back()} /><AppText variant="caption" color={colors.inkMuted}>DRAFT</AppText><View style={{ width: 44 }} /></View><AppText variant="caption" color={colors.primary} style={styles.overline}>STRATEGY ARTIFACT</AppText><AppText variant="title">{artifact.title}</AppText><AppText variant="body" color={colors.inkMuted} style={styles.intro}>A useful canvas is specific enough to guide your next customer conversation.</AppText><View style={styles.form}>{fieldLabels.map(([key, label, hint]) => <FormField key={key} label={label} hint={hint} placeholder="Write a clear, specific answer" multiline value={fields[key] ?? ''} onChangeText={(value) => updateField(key, value)} />)}</View><View style={styles.actions}><AppButton label="Review with Coach" icon={Sparkles} onPress={() => router.push('/coach')} /><AppText variant="caption" color={colors.inkSoft} style={styles.save}>Saved automatically on this device</AppText></View></ScrollView></KeyboardAvoidingView>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.xl, paddingBottom: spacing.xxxl, maxWidth: 620, width: '100%', alignSelf: 'center' }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xxl }, overline: { letterSpacing: 1.1, fontWeight: '800', marginBottom: spacing.sm }, intro: { lineHeight: 24, marginTop: spacing.sm }, form: { gap: spacing.xl, marginTop: spacing.xxl }, actions: { marginTop: spacing.xxxl }, save: { textAlign: 'center', marginTop: spacing.md }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas } });
