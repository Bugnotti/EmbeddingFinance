import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { MascotGuide } from '@/components/mascot-guide';
import { AppButton, AppText, FormField, IconButton, ProgressBar, SectionCard } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

export default function TaskScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const isInterview = taskId === 'prepare-interview';
  const draft = useDemoStore((state) => state.taskDraft);
  const saveTaskDraft = useDemoStore((state) => state.saveTaskDraft);
  const completeTask = useDemoStore((state) => state.completeTask);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [guideMessage, setGuideMessage] = useState(isInterview ? 'Pick a real customer conversation. Specific beats impressive.' : 'Name the belief that would hurt most if it turned out to be wrong.');
  const [guideMood, setGuideMood] = useState<'idle' | 'thinking' | 'encouraging' | 'celebrating'>('idle');
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  const assumption = isInterview ? draft.customer : draft.assumption;
  const valid = assumption.trim().length > (isInterview ? 5 : 12) && (!isInterview || draft.evidence.trim().length > 5);

  if (completed) return <View style={styles.completePage}><MascotGuide message={isInterview ? 'Interview guide ready! Pixel is cheering for your first honest conversation.' : 'You found the risky belief. That is exactly how strong startups get clearer.'} mood="celebrating" size={144} style={styles.completeGuide} /><View style={styles.completeIcon}><CheckCircle2 color={colors.white} size={35} /></View><AppText variant="title" style={styles.completeTitle}>{isInterview ? 'Interview milestone complete.' : 'Milestone unlocked.'}</AppText><AppText variant="body" color={colors.inkMuted} style={styles.completeCopy}>{isInterview ? 'You have a focused guide for your next customer conversation. Your value proposition canvas is now ready to shape.' : 'You turned a belief into something you can learn from. Your roadmap is ready for the next conversation.'}</AppText><AppButton label="Back to my journey" icon={ArrowRight} onPress={() => router.replace('/(tabs)/journey')} /></View>;

  if (!['write-assumption', 'prepare-interview'].includes(taskId ?? '')) return <View style={styles.completePage}><MascotGuide message="I cannot find that activity yet, but your journey is still here." mood="encouraging" size={120} /><AppText variant="title" style={styles.completeTitle}>Task not found</AppText><AppText variant="body" color={colors.inkMuted} style={styles.completeCopy}>This activity is not available in the current demo.</AppText><AppButton label="Back to my journey" icon={ArrowRight} onPress={() => router.replace('/(tabs)/journey')} /></View>;

  function updateField(field: 'assumption' | 'customer' | 'evidence', value: string) {
    saveTaskDraft({ [field]: value });
    const meaningful = value.trim().length >= (field === 'evidence' ? 6 : 10);
    if (meaningful) {
      setGuideMood('encouraging');
      setGuideMessage(field === 'evidence' ? 'That gives us something real to investigate.' : 'Good. Keep it concrete enough that a person could prove it true or false.');
    } else if (value.trim().length > 0) {
      setGuideMood('thinking');
      setGuideMessage('Pixel is thinking with you. Keep adding the detail that makes this testable.');
    }
  }

  function handleComplete() {
    setSubmitted(true);
    if (!valid) {
      setGuideMood('encouraging');
      setGuideMessage(isInterview ? 'Almost there. Add the person and their current workaround.' : 'Let’s sharpen that before we call it done. Add enough detail to test it with a real customer.');
      return;
    }
    setGuideMood('celebrating');
    setGuideMessage('That is a testable starting point. Unlocking your next stop!');
    completeTask(taskId ?? 'write-assumption');
    setCompleted(true);
  }

  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={[styles.content, isWide && styles.contentWide]} keyboardShouldPersistTaps="handled"><View style={styles.top}><IconButton label="Go back" icon={ArrowLeft} onPress={() => router.back()} /><AppText variant="caption" color={colors.inkMuted}>PRACTICAL TASK</AppText><View style={{ width: 44 }} /></View><View style={[styles.introLayout, isWide && styles.introLayoutWide]}><View style={styles.introCopy}><AppText variant="caption" color={colors.primary} style={styles.overline}>VALIDATE · 10 MINUTES</AppText><AppText variant="title">{isInterview ? 'Prepare your interview guide.' : 'Name your riskiest assumption.'}</AppText><AppText variant="body" color={colors.inkMuted} style={styles.intro}>{isInterview ? 'Choose the person you want to learn from and write three questions about what they do today.' : 'What needs to be true for NeighbourFix to work? Make the belief specific enough to test with a real person.'}</AppText></View><MascotGuide message={guideMessage} mood={guideMood} size={isWide ? 112 : 92} style={styles.guide} /></View><View style={styles.progress}><AppText variant="caption" color={colors.inkMuted}>YOUR PROGRESS</AppText><ProgressBar value={valid ? 70 : 30} /></View><View style={[styles.form, isWide && styles.formWide]}>{isInterview ? <><View style={[styles.fieldHalf, isWide && styles.fieldHalfWide]}><FormField label="Who will you interview?" placeholder="e.g. Busy homeowners in Milan" value={draft.customer} onChangeText={(value) => updateField('customer', value)} error={submitted && draft.customer.trim().length <= 5 ? 'Add the customer you want to learn from.' : undefined} /></View><View style={[styles.fieldHalf, isWide && styles.fieldHalfWide]}><FormField label="What do they do today?" placeholder="Describe their current workaround" value={draft.evidence} onChangeText={(value) => updateField('evidence', value)} multiline error={submitted && draft.evidence.trim().length <= 5 ? 'Describe their current workaround.' : undefined} /></View></> : <><View style={[styles.fieldHalf, isWide && styles.fieldHalfWide]}><FormField label="The assumption" placeholder="e.g. Homeowners struggle to find reliable help quickly" value={draft.assumption} onChangeText={(value) => updateField('assumption', value)} error={submitted && !valid ? 'Make the assumption more specific.' : undefined} multiline hint="Start with “We believe…” if it helps." /></View><View style={[styles.fieldHalf, isWide && styles.fieldHalfWide]}><FormField label="Who is affected?" placeholder="e.g. Busy homeowners in urban neighborhoods" value={draft.customer} onChangeText={(value) => updateField('customer', value)} /></View></>}</View><SectionCard style={styles.prompt}><AppText variant="caption" color={colors.primary}>A STRONG TEST</AppText><AppText variant="small" style={{ fontWeight: '700' }}>{isInterview ? 'Good questions are about recent moments, not imagined preferences.' : 'A good assumption has a customer, a behavior, and a signal you can observe.'}</AppText></SectionCard><View style={styles.bottom}><AppButton label="Complete task" icon={ArrowRight} onPress={handleComplete} /><AppText variant="caption" color={colors.inkSoft} style={styles.footer}>Your answer stays on this device in the demo.</AppText></View></ScrollView></KeyboardAvoidingView>;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.xl, paddingBottom: spacing.xxxl, maxWidth: 620, width: '100%', alignSelf: 'center', flexGrow: 1 }, contentWide: { maxWidth: 980, paddingHorizontal: spacing.xxl }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xxl }, introLayout: { gap: spacing.lg }, introLayoutWide: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xxl }, introCopy: { flex: 1 }, guide: { marginTop: spacing.lg }, overline: { letterSpacing: 1.1, fontWeight: '800', marginBottom: spacing.sm }, intro: { lineHeight: 24, marginTop: spacing.sm }, progress: { gap: spacing.sm, marginTop: spacing.xxl }, form: { gap: spacing.xl, marginTop: spacing.xxl }, formWide: { flexDirection: 'row', flexWrap: 'wrap', columnGap: spacing.lg }, fieldHalf: { width: '100%' }, fieldHalfWide: { flexGrow: 1, flexBasis: 280 }, prompt: { marginTop: spacing.xxl, gap: spacing.sm, backgroundColor: colors.surfaceMuted, borderColor: colors.amberSoft }, bottom: { marginTop: spacing.xxxl }, footer: { textAlign: 'center', marginTop: spacing.md }, completePage: { flex: 1, backgroundColor: colors.canvas, padding: spacing.xl, alignItems: 'center', justifyContent: 'center' }, completeGuide: { width: '100%', maxWidth: 460, justifyContent: 'center', marginBottom: spacing.lg }, completeIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl }, completeTitle: { textAlign: 'center' }, completeCopy: { textAlign: 'center', lineHeight: 24, maxWidth: 420, marginTop: spacing.md, marginBottom: spacing.xxxl } });
