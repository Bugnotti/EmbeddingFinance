import { router } from 'expo-router';
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppButton, AppText, FormField, IconButton } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';
import { countryOptions, defaultStartup, industryOptions, Startup } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

export default function OnboardingScreen() {
  const completeOnboarding = useDemoStore((state) => state.completeOnboarding);
  const [name, setName] = useState('');
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState(industryOptions[0]);
  const [countryCode, setCountryCode] = useState('IT');
  const [submitted, setSubmitted] = useState(false);
  const [showIndustries, setShowIndustries] = useState(false);

  const errors = { name: submitted && name.trim().length < 2 ? 'Add a startup name.' : undefined, idea: submitted && idea.trim().length < 20 ? 'Describe the idea in a little more detail.' : undefined };

  function handleSubmit() {
    setSubmitted(true);
    if (errors.name || errors.idea) return;
    const startup: Startup = { ...defaultStartup, id: `startup-${Date.now()}`, name: name.trim(), idea: idea.trim(), industry, countryCode, stage: 'Idea' };
    completeOnboarding(startup);
    router.replace('/(tabs)/journey');
  }

  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.top}><IconButton label="Go back" icon={ArrowLeft} onPress={() => router.back()} /><AppText variant="caption" color={colors.inkMuted}>1 OF 1</AppText><View style={styles.topSpacer} /></View>
      <AppText variant="title">Tell us about your idea</AppText>
      <AppText variant="body" color={colors.inkMuted} style={styles.intro}>We’ll use this to shape your first roadmap. You can change it later.</AppText>
      <View style={styles.form}>
        <FormField label="Startup name" placeholder="e.g. NeighbourFix" value={name} onChangeText={setName} error={errors.name} autoCapitalize="words" />
        <FormField label="What are you building?" placeholder="Describe the problem and who it helps" value={idea} onChangeText={setIdea} error={errors.idea} multiline maxLength={500} />
        <View style={styles.field}><AppText variant="small" style={styles.label}>Industry</AppText><Pressable style={styles.select} accessibilityRole="button" accessibilityLabel="Choose industry" onPress={() => setShowIndustries((value) => !value)}><AppText variant="body">{industry}</AppText><ChevronDown color={colors.inkMuted} size={18} /></Pressable>{showIndustries && <View style={styles.menu}>{industryOptions.map((option) => <Pressable key={option} onPress={() => { setIndustry(option); setShowIndustries(false); }} style={styles.menuItem}><AppText variant="small">{option}</AppText>{option === industry && <Check color={colors.primary} size={17} />}</Pressable>)}</View>}</View>
        <View style={styles.field}><AppText variant="small" style={styles.label}>Operating country</AppText><View style={styles.countryRow}>{countryOptions.map((option) => <Pressable key={option.code} accessibilityRole="radio" accessibilityState={{ selected: countryCode === option.code }} onPress={() => setCountryCode(option.code)} style={[styles.country, countryCode === option.code && styles.countrySelected]}><AppText variant="caption" color={countryCode === option.code ? colors.primary : colors.inkMuted}>{option.flag}</AppText><AppText variant="small" color={countryCode === option.code ? colors.ink : colors.inkMuted}>{option.label}</AppText></Pressable>)}</View></View>
      </View>
      <View style={styles.bottom}><AppButton label="Build my roadmap" icon={ArrowRight} onPress={handleSubmit} /><AppText variant="caption" color={colors.inkSoft} style={styles.disclaimer}>Legal steps are educational examples, not legal advice.</AppText></View>
    </ScrollView>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  content: { padding: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxl, maxWidth: 620, width: '100%', alignSelf: 'center', flexGrow: 1 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xxl },
  topSpacer: { width: 44 },
  intro: { marginTop: spacing.sm, lineHeight: 24, maxWidth: 400 },
  form: { gap: spacing.xl, marginTop: spacing.xxl },
  field: { gap: spacing.sm },
  label: { fontWeight: '700' },
  select: { minHeight: 52, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: radii.md, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menu: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, overflow: 'hidden' },
  menuItem: { paddingHorizontal: spacing.md, paddingVertical: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  countryRow: { gap: spacing.sm },
  country: { minHeight: 52, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  countrySelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  bottom: { marginTop: 'auto', paddingTop: spacing.xxxl },
  disclaimer: { textAlign: 'center', marginTop: spacing.md },
});
