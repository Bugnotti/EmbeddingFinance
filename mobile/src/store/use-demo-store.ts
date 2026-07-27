import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';

import { Artifact, createArtifacts, createRoadmap, defaultArtifacts, defaultStartup, demoMetrics, Milestone, Startup } from '@/data/demo';
import { completeTaskTransition } from '@/domain/progress';

type DemoState = {
  hydrated: boolean;
  onboardingComplete: boolean;
  startup: Startup | null;
  milestones: Milestone[];
  artifacts: Artifact[];
  taskDraft: { assumption: string; customer: string; evidence: string };
  metrics: typeof demoMetrics;
  completeOnboarding: (startup: Startup) => void;
  saveTaskDraft: (draft: Partial<DemoState['taskDraft']>) => void;
  completeTask: (taskId: string) => void;
  saveArtifact: (artifactId: string, fields: Record<string, string>) => void;
  resetDemo: () => void;
  restoreSampleData: () => void;
  markHydrated: () => void;
};

const emptyDraft = { assumption: '', customer: '', evidence: '' };
const storageKey = 'startup-companion-demo';
type PersistedDemoState = Pick<DemoState, 'onboardingComplete' | 'startup' | 'milestones' | 'artifacts' | 'taskDraft' | 'metrics'>;

export const useDemoStore = create<DemoState>()((set) => ({
  hydrated: Platform.OS === 'web',
  onboardingComplete: false,
  startup: null,
  milestones: createRoadmap(),
  artifacts: defaultArtifacts.map((artifact) => ({ ...artifact, fields: { ...artifact.fields } })),
  taskDraft: emptyDraft,
  metrics: demoMetrics,
  completeOnboarding: (startup) => set({ onboardingComplete: true, startup, milestones: createRoadmap(), artifacts: createArtifacts(startup), taskDraft: emptyDraft, metrics: demoMetrics }),
  saveTaskDraft: (draft) => set((state) => ({ taskDraft: { ...state.taskDraft, ...draft } })),
  completeTask: (taskId) => set((state) => {
    const milestones = completeTaskTransition(state.milestones, taskId);
    if (milestones === state.milestones) return state;
    return {
      milestones,
      metrics: {
        ...state.metrics,
        progress: taskId === 'prepare-interview' ? 60 : 45,
        artifacts: Math.max(state.metrics.artifacts, 1),
      },
      artifacts: state.artifacts.map((item) => taskId === 'write-assumption' && item.id === 'value-proposition' ? { ...item, status: 'draft' } : item),
    };
  }),
  saveArtifact: (artifactId, fields) => set((state) => ({ artifacts: state.artifacts.map((item) => item.id === artifactId ? { ...item, fields, status: 'draft' } : item) })),
  resetDemo: () => set({ onboardingComplete: false, startup: null, milestones: createRoadmap(), artifacts: defaultArtifacts.map((artifact) => ({ ...artifact, fields: { ...artifact.fields } })), taskDraft: emptyDraft, metrics: demoMetrics }),
  restoreSampleData: () => set({ onboardingComplete: true, startup: defaultStartup, milestones: createRoadmap(), artifacts: defaultArtifacts.map((artifact) => ({ ...artifact, fields: { ...artifact.fields } })), taskDraft: { assumption: 'Homeowners struggle to find reliable repair help quickly.', customer: 'Busy homeowners in urban neighborhoods', evidence: 'Three informal conversations and competitor reviews' }, metrics: demoMetrics }),
  markHydrated: () => set({ hydrated: true }),
}));

const selectPersistedState = (state: DemoState): PersistedDemoState => ({
  onboardingComplete: state.onboardingComplete,
  startup: state.startup,
  milestones: state.milestones,
  artifacts: state.artifacts,
  taskDraft: state.taskDraft,
  metrics: state.metrics,
});

const canUseStorage = Platform.OS !== 'web' || typeof window !== 'undefined';

if (canUseStorage) {
  void AsyncStorage.getItem(storageKey)
    .then((value) => {
      if (value) {
        const parsed = JSON.parse(value) as Partial<PersistedDemoState> & { state?: Partial<PersistedDemoState> };
        useDemoStore.setState(parsed.state ?? parsed);
      }
    })
    .catch(() => AsyncStorage.removeItem(storageKey))
    .finally(() => {
      useDemoStore.setState({ hydrated: true });
      useDemoStore.subscribe((state) => {
        const storedValue = JSON.stringify({ state: selectPersistedState(state), version: 0 });
        void AsyncStorage.setItem(storageKey, storedValue);
      });
    });
}
