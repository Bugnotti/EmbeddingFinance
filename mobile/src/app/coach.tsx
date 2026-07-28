import { router } from 'expo-router';
import { ArrowLeft, ArrowUp, Sparkles, UserRound } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';

import { MascotGuide } from '@/components/mascot-guide';
import { AppText, IconButton } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';
import { useDemoStore } from '@/store/use-demo-store';

type Message = { role: 'coach' | 'user'; text: string };

export default function CoachScreen() {
  const startup = useDemoStore((state) => state.startup);
  const artifact = useDemoStore((state) => state.artifacts.find((item) => item.id === 'value-proposition'));
  const [messages, setMessages] = useState<Message[]>([{ role: 'coach', text: `I’m looking at ${startup?.name ?? 'your startup'} with you. I can review an artifact, sharpen an assumption, or help choose your next step.` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<string | null>(null);
  const responseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;

  useEffect(() => () => {
    if (responseTimer.current) clearTimeout(responseTimer.current);
  }, []);

  function respond(message: string, appendUser: boolean) {
    if (loading) return;
    setError(null);
    setLastRequest(message);
    if (appendUser) setMessages((current) => [...current, { role: 'user', text: message }]);
    setLoading(true);
    responseTimer.current = setTimeout(() => {
      if (message.toLowerCase().includes('simulate error')) {
        setError('Coach could not prepare a response. Your message is safe; try again.');
      } else {
        setMessages((current) => [...current, { role: 'coach', text: getCoachResponse(message, startup?.name ?? 'your startup', artifact?.fields ?? {}) }]);
      }
      setLoading(false);
    }, 700);
  }

  function send(text = input) {
    const message = text.trim();
    if (!message || loading) return;
    setInput('');
    respond(message, true);
  }

  function retry() {
    if (lastRequest && !loading) respond(lastRequest, false);
  }

  const guideMessage = error ? 'That answer got stuck. I kept your message safe, so we can try it again.' : loading ? 'Pixel is thinking through the startup context…' : 'Bring me one fuzzy decision and I’ll help turn it into a useful next step.';
  const guideMood = error ? 'encouraging' : loading ? 'thinking' : 'idle';

  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><View style={styles.header}><IconButton label="Close coach" icon={ArrowLeft} onPress={() => router.back()} /><View style={styles.headerCenter}><View style={styles.coachIcon}><Sparkles color={colors.white} size={16} /></View><View><AppText variant="small" style={{ fontWeight: '750' }}>Coach</AppText><AppText variant="caption" color={colors.primary}>MOCK COACH · READY TO HELP</AppText></View></View><View style={{ width: 44 }} /></View><View style={[styles.main, isWide && styles.mainWide]}><View style={styles.chatColumn}>{!isWide && <MascotGuide message={guideMessage} mood={guideMood} size={82} style={styles.mobileGuide} />}<ScrollView contentContainerStyle={styles.messages} keyboardShouldPersistTaps="handled">{messages.map((message, index) => <View key={`${message.role}-${index}`} style={[styles.messageRow, message.role === 'user' && styles.userRow]}>{message.role === 'coach' && <View style={styles.messageIcon}><Sparkles color={colors.primary} size={15} /></View>}<View style={[styles.bubble, message.role === 'user' ? styles.userBubble : styles.coachBubble]}><AppText variant="body" color={message.role === 'user' ? colors.white : colors.ink}>{message.text}</AppText></View>{message.role === 'user' && <View style={styles.messageIcon}><UserRound color={colors.inkMuted} size={15} /></View>}</View>)}{loading && <View style={styles.typing}><AppText variant="caption" color={colors.inkMuted}>Coach is thinking…</AppText></View>}{error && <View style={styles.errorState}><AppText variant="small" color={colors.danger} style={styles.errorText}>{error}</AppText><Pressable accessibilityRole="button" accessibilityLabel="Retry Coach response" onPress={retry} style={styles.retry}><AppText variant="caption" color={colors.danger}>Retry</AppText></Pressable></View>}</ScrollView><View style={styles.suggestions}><Pressable accessibilityRole="button" accessibilityLabel="Ask Coach to review the canvas" onPress={() => send('Review my canvas')} disabled={loading} style={[styles.suggestion, loading && styles.disabled]}><AppText variant="caption" color={colors.primary}>Review my canvas</AppText></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Ask Coach what to do next" onPress={() => send('What should I do next?')} disabled={loading} style={[styles.suggestion, loading && styles.disabled]}><AppText variant="caption" color={colors.primary}>What next?</AppText></Pressable></View><View style={styles.composer}><TextInput accessibilityLabel="Message Coach" value={input} onChangeText={setInput} onSubmitEditing={() => send()} placeholder="Ask Coach anything…" placeholderTextColor={colors.inkSoft} style={styles.input} returnKeyType="send" editable={!loading} /><Pressable accessibilityRole="button" accessibilityLabel="Send message" disabled={!input.trim() || loading} onPress={() => send()} style={[styles.send, (!input.trim() || loading) && styles.sendDisabled]}><ArrowUp color={colors.white} size={18} /></Pressable></View></View>{isWide && <View style={styles.aside}><MascotGuide message={guideMessage} mood={guideMood} size={128} /><View style={styles.asideCopy}><AppText variant="caption" color={colors.coral}>STARTUP CONTEXT</AppText><AppText variant="headline">{startup?.name ?? 'Your startup'}</AppText><AppText variant="small" color={colors.inkMuted}>Coach uses your local demo context to keep feedback practical and specific.</AppText></View><View style={styles.asideNote}><AppText variant="caption" color={colors.inkMuted}>PREVIEW ONLY</AppText><AppText variant="caption" color={colors.inkMuted}>Coach suggestions are educational demo content, not legal or financial advice.</AppText></View></View>}</View></KeyboardAvoidingView>;
}

function getCoachResponse(message: string, startupName: string, fields: Record<string, string>) {
  const normalized = message.toLowerCase();
  const customerJob = fields.customerJobs?.trim();
  const pain = fields.pains?.trim();
  if (normalized.includes('review') || normalized.includes('canvas')) {
    if (customerJob || pain) return `For ${startupName}, the clearest signal so far is ${customerJob ? `the customer job “${customerJob}”` : 'the customer problem you are exploring'}. ${pain ? `You have also named a real source of friction: “${pain}”.` : 'Add one recent customer pain in their own words next.'} Next action: compare this canvas with one real conversation before polishing the wording.`;
    return `Your ${startupName} canvas has a useful starting structure, but it is still mostly open. Start with one customer job and one recent pain, then test both with a real person before adding more detail.`;
  }
  if (normalized.includes('assumption')) return 'Make the assumption observable: name the customer, the behavior you expect, and the signal that would prove you wrong. Then ask one person about their most recent experience.';
  if (normalized.includes('next') || normalized.includes('do')) return 'Your next useful move is one short customer conversation. Ask about what they did most recently, capture their exact words, and bring the evidence back to the canvas.';
  return `For ${startupName}, keep the next move small enough to learn from this week. What customer behavior would make your current idea clearly more or less likely?`;
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.canvas }, header: { padding: spacing.lg, paddingTop: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerCenter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, coachIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, main: { flex: 1 }, mainWide: { flexDirection: 'row', width: '100%', maxWidth: 1100, alignSelf: 'center' }, chatColumn: { flex: 1, minWidth: 0 }, mobileGuide: { marginHorizontal: spacing.lg, marginTop: spacing.lg }, messages: { padding: spacing.xl, gap: spacing.lg, maxWidth: 680, width: '100%', alignSelf: 'center', flexGrow: 1 }, messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, maxWidth: '92%' }, userRow: { alignSelf: 'flex-end' }, messageIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' }, bubble: { padding: spacing.md, borderRadius: 14, maxWidth: '86%' }, coachBubble: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }, userBubble: { backgroundColor: colors.primary }, typing: { paddingLeft: 38 }, errorState: { marginLeft: 38, padding: spacing.md, borderRadius: radii.md, backgroundColor: colors.coralSoft, borderWidth: 1, borderColor: '#FFD0C8', gap: spacing.sm }, errorText: { lineHeight: 19 }, retry: { alignSelf: 'flex-start', minHeight: 34, justifyContent: 'center', paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.white }, suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, maxWidth: 680, width: '100%', alignSelf: 'center' }, suggestion: { minHeight: 36, justifyContent: 'center', paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.primarySoft }, composer: { borderTopWidth: 1, borderTopColor: colors.line, padding: spacing.md, flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.surface }, input: { flex: 1, minHeight: 48, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, paddingHorizontal: spacing.md, color: colors.ink, fontSize: 15 }, send: { width: 48, height: 48, borderRadius: radii.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, sendDisabled: { opacity: 0.4 }, disabled: { opacity: 0.5 }, aside: { width: 300, margin: spacing.xl, marginLeft: 0, padding: spacing.xl, borderRadius: radii.lg, backgroundColor: colors.surfaceMuted, gap: spacing.lg, alignSelf: 'flex-start' }, asideCopy: { gap: spacing.sm, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.amberSoft }, asideNote: { gap: spacing.sm, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.amberSoft } });
