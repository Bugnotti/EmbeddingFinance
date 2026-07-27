import { Tabs } from 'expo-router';
import { BarChart3, Compass, FolderKanban, UserRound } from 'lucide-react-native';
import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.inkSoft, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line, height: 84, paddingTop: 8 }, tabBarLabelStyle: { fontSize: 11, fontWeight: '700' } }}>
    <Tabs.Screen name="journey" options={{ title: 'Journey', tabBarIcon: ({ color }) => <Compass size={22} color={color} /> }} />
    <Tabs.Screen name="workspace" options={{ title: 'Workspace', tabBarIcon: ({ color }) => <FolderKanban size={22} color={color} /> }} />
    <Tabs.Screen name="metrics" options={{ title: 'Metrics', tabBarIcon: ({ color }) => <BarChart3 size={22} color={color} /> }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <UserRound size={22} color={color} /> }} />
  </Tabs>;
}
