import { X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, radii, spacing } from '@/constants/theme';

type MascotGuideProps = {
  message: string;
  label?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function MascotGuide({ message, label = 'Talk to Pixel, your startup guide', size = 104, style }: MascotGuideProps) {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    void AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setDialogOpen(true);
  }, [message]);

  useEffect(() => {
    if (reduceMotion) {
      bob.setValue(0);
      return;
    }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(bob, { toValue: -5, duration: 850, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      Animated.timing(bob, { toValue: 0, duration: 850, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [bob, reduceMotion]);

  return <View style={[styles.container, style]}>
    {dialogOpen && <View accessibilityLiveRegion="polite" style={styles.dialog}>
      <AppText variant="caption" color={colors.primary} style={styles.eyebrow}>PIXEL SAYS</AppText>
      <AppText variant="small" style={styles.message}>{message}</AppText>
      <Pressable accessibilityRole="button" accessibilityLabel="Hide Pixel's message" onPress={() => setDialogOpen(false)} style={styles.dismiss}><X color={colors.inkMuted} size={15} /></Pressable>
      <View style={styles.tail} />
    </View>}
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityHint="Opens or hides Pixel's message" onPress={() => setDialogOpen((open) => !open)} style={({ pressed }) => [styles.mascotPressable, pressed && styles.pressed, { width: size, height: size }]}>
      <Animated.View style={{ transform: [{ translateY: bob }] }}>
        <Image source={require('../../assets/images/mascots/startup-cat.png')} resizeMode="contain" style={{ width: size, height: size }} />
      </Animated.View>
    </Pressable>
  </View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dialog: { position: 'relative', flex: 1, minHeight: 78, paddingVertical: spacing.md, paddingLeft: spacing.md, paddingRight: 34, borderRadius: radii.lg, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: '#D4CEFF', justifyContent: 'center' },
  eyebrow: { fontWeight: '800', letterSpacing: 1, marginBottom: 3 },
  message: { fontWeight: '800', lineHeight: 19 },
  dismiss: { position: 'absolute', top: 7, right: 7, width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  tail: { position: 'absolute', right: -7, top: '50%', width: 14, height: 14, marginTop: -7, backgroundColor: colors.primarySoft, borderTopWidth: 1, borderRightWidth: 1, borderColor: '#D4CEFF', transform: [{ rotate: '45deg' }] },
  mascotPressable: { alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.72 },
});
