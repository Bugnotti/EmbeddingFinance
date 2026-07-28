import { router } from 'expo-router';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { MascotGuide } from '@/components/mascot-guide';
import { AppButton, AppText, FormField, IconButton } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';
import { countryOptions, industryOptions, Startup } from '@/data/demo';
import { useDemoStore } from '@/store/use-demo-store';

export default function OnboardingScreen() {
  const completeOnboarding = useDemoStore((state) => state.completeOnboarding);
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  const [name, setName] = useState('');
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState(industryOptions[0]);
  const [countryCode, setCountryCode] = useState('IT');
  const [submitted, setSubmitted] = useState(false);
  const [showIndustries, setShowIndustries] = useState(false);
  const [guideMessage, setGuideMessage] = useState('Tell me what you want to bring into the world.');

  const errors = {
    name: submitted && name.trim().length < 2 ? 'Add a startup name.' : undefined,
    idea: submitted && idea.trim().length < 20 ? 'Describe the idea in a little more detail.' : undefined,
  };

  function updateName(value: string) {
    setName(value);
    if (value.trim().length === 2) setGuideMessage(`${value.trim()} already has a good ring to it.`);
  }

  function chooseIndustry(option: string) {
    setIndustry(option);
    setShowIndustries(false);
    setGuideMessage(`${option} it is. We will make your first steps fit that world.`);
  }

  function chooseCountry(code: string, label: string) {
    setCountryCode(code);
    setGuideMessage(`${label} selected. I will shape the roadmap around that context.`);
  }

  function handleSubmit() {
    const nameError = name.trim().length < 2;
    const ideaError = idea.trim().length < 20;
    setSubmitted(true);
    if (nameError || ideaError) {
      setGuideMessage(nameError ? 'Give your startup a name, then we can start the adventure.' : 'Tell me a little more about the problem you want to solve.');
      return;
    }
    const startup: Startup = { id: `startup-${Date.now()}`, name: name.trim(), idea: idea.trim(), industry, countryCode, stage: 'Validate' };
    completeOnboarding(startup);
    router.replace('/(tabs)/journey');
  }

  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={[styles.content, isWide && styles.contentWide]} keyboardShouldPersistTaps="handled">
      <View style={styles.top}><IconButton label="Go back" icon={ArrowLeft} onPress={() => router.back()} /><AppText variant="caption" color={colors.inkMuted}>STEP 1 OF 6</AppText><View style={styles.topSpacer} /></View>
      <View style={[styles.shell, isWide && styles.shellWide]}>
        <View style={[styles.introColumn, isWide && styles.introColumnWide]}>
          <AppText variant="caption" color={colors.primary} style={styles.overline}>STARTUP SETUP</AppText>
          <AppText variant="display" style={styles.title}>What are we building?</AppText>
          <AppText variant="body" color={colors.inkMuted} style={styles.intro}>A few details are enough for Pixel to build your first founder roadmap. You can refine everything later.</AppText>
          <MascotGuide message={guideMessage} size={isWide ? 120 : 96} style={styles.guide} />
          {isWide && <View style={styles.setupNote}><Sparkles color={colors.amber} size={17} /><AppText variant="small" color={colors.inkMuted} style={{ flex: 1 }}>Your idea stays editable as your startup becomes clearer.</AppText></View>}
        </View>

        <View style={styles.formPanel}>
          <View style={styles.formHeader}><View><AppText variant="caption" color={colors.primary} style={styles.formOverline}>YOUR STARTUP</AppText><AppText variant="headline">Give Pixel a starting point.</AppText></View><View style={styles.formStep}><AppText variant="caption" color={colors.primary}>01</AppText></View></View>
          <View style={styles.form}>
            <View style={[styles.shortFields, isWide && styles.shortFieldsWide]}>
              <View style={styles.shortField}><FormField label="Startup name" placeholder="e.g. NeighbourFix" value={name} onChangeText={updateName} error={errors.name} autoCapitalize="words" /></View>
              <View style={[styles.field, styles.shortField, styles.industryField]}><AppText variant="small" style={styles.label}>Industry</AppText><Pressable style={styles.select} accessibilityRole="button" accessibilityLabel="Choose industry" accessibilityState={{ expanded: showIndustries }} onPress={() => { setShowIndustries((value) => !value); setGuideMessage(showIndustries ? 'No rush. Pick the industry that feels closest.' : 'Choose the world where you want to make a difference.'); }}><AppText variant="body" style={styles.selectText}>{industry}</AppText><ChevronDown color={colors.inkMuted} size={18} /></Pressable>{showIndustries && <View style={styles.menu}>{industryOptions.map((option) => <Pressable key={option} accessibilityRole="radio" accessibilityState={{ selected: option === industry }} onPress={() => chooseIndustry(option)} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}><AppText variant="small" style={{ flex: 1 }}>{option}</AppText>{option === industry && <Check color={colors.primary} size={17} />}</Pressable>)}</View>}</View>
            </View>
            <FormField label="What are you building?" placeholder="Describe the problem, who it helps, and what changes for them." value={idea} onChangeText={setIdea} error={errors.idea} multiline maxLength={500} />
            <View style={styles.field}><AppText variant="small" style={styles.label}>Operating country</AppText><View style={[styles.countryRow, isWide && styles.countryRowWide]}>{countryOptions.map((option) => <Pressable key={option.code} accessibilityRole="radio" accessibilityState={{ selected: countryCode === option.code }} onPress={() => chooseCountry(option.code, option.label)} style={[styles.country, isWide && styles.countryWide, countryCode === option.code && styles.countrySelected]}><AppText variant="caption" color={countryCode === option.code ? colors.primary : colors.inkMuted}>{option.flag}</AppText><AppText variant="small" color={countryCode === option.code ? colors.ink : colors.inkMuted} style={isWide && styles.countryWideLabel}>{option.label}</AppText>{countryCode === option.code && <Check color={colors.primary} size={16} style={styles.countryCheck} />}</Pressable>)}</View></View>
          </View>
          <View style={styles.bottom}><AppButton label="Build my roadmap" icon={ArrowRight} onPress={handleSubmit} /><AppText variant="caption" color={colors.inkSoft} style={styles.disclaimer}>Legal steps are educational examples, not legal advice.</AppText></View>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxxl, flexGrow: 1 },
  contentWide: { maxWidth: 1080, paddingHorizontal: spacing.xxl, paddingTop: spacing.xl },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl },
  topSpacer: { width: 44 },
  shell: { gap: spacing.xxl },
  shellWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 64 },
  introColumn: { gap: spacing.md },
  introColumnWide: { width: 360, paddingTop: spacing.xl },
  overline: { fontWeight: '800', letterSpacing: 1.4 },
  title: { maxWidth: 340 },
  intro: { lineHeight: 24, maxWidth: 360 },
  guide: { marginTop: spacing.sm, maxWidth: 420 },
  setupNote: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.line },
  formPanel: { flex: 1, minWidth: 0, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: spacing.xl },
  formHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  formOverline: { fontWeight: '800', letterSpacing: 1, marginBottom: 3 },
  formStep: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  form: { gap: spacing.xl, marginTop: spacing.xxl },
  shortFields: { gap: spacing.xl },
  shortFieldsWide: { flexDirection: 'row', alignItems: 'flex-start' },
  shortField: { flex: 1 },
  field: { gap: spacing.sm, flex: 1 },
  label: { fontWeight: '700' },
  industryField: { zIndex: 3 },
  select: { minHeight: 52, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: radii.md, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  selectText: { flex: 1 },
  menu: { position: 'absolute', top: 77, left: 0, right: 0, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, overflow: 'hidden', zIndex: 5 },
  menuItem: { minHeight: 48, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  countryRow: { gap: spacing.sm },
  countryRowWide: { flexDirection: 'row' },
  country: { minHeight: 52, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  countryWide: { flex: 1, minHeight: 92, paddingVertical: spacing.md, alignItems: 'flex-start', justifyContent: 'center' },
  countryWideLabel: { paddingRight: 14 },
  countryCheck: { position: 'absolute', right: spacing.sm, top: spacing.sm },
  countrySelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  bottom: { marginTop: spacing.xxxl },
  disclaimer: { textAlign: 'center', marginTop: spacing.md },
  pressed: { opacity: 0.72 },
});
