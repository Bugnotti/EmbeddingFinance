import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Artifact, defaultArtifacts, defaultStartup, demoMetrics, Milestone, roadmap, Startup } from '@/data/demo';

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

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      hydrated: false,
      onboardingComplete: false,
      startup: null,
      milestones: roadmap,
      artifacts: defaultArtifacts,
      taskDraft: emptyDraft,
      metrics: demoMetrics,
      completeOnboarding: (startup) => set({ onboardingComplete: true, startup, milestones: roadmap }),
      saveTaskDraft: (draft) => set((state) => ({ taskDraft: { ...state.taskDraft, ...draft } })),
      completeTask: (taskId) => set((state) => {
        if (taskId !== 'write-assumption' || state.milestones.find((item) => item.id === 'assumption')?.status === 'completed') return state;
        return {
          milestones: state.milestones.map((item) => item.id === 'assumption' ? { ...item, status: 'completed', progress: 100 } : item.id === 'interviews' ? { ...item, status: 'in_progress' } : item),
          metrics: { ...state.metrics, progress: 45, artifacts: Math.max(state.metrics.artifacts, 1) },
          artifacts: state.artifacts.map((item) => item.id === 'value-proposition' ? { ...item, status: 'draft' } : item),
        };
      }),
      saveArtifact: (artifactId, fields) => set((state) => ({ artifacts: state.artifacts.map((item) => item.id === artifactId ? { ...item, fields, status: 'draft' } : item) })),
      resetDemo: () => set({ onboardingComplete: false, startup: null, milestones: roadmap, artifacts: defaultArtifacts, taskDraft: emptyDraft, metrics: demoMetrics }),
      restoreSampleData: () => set({ onboardingComplete: true, startup: defaultStartup, milestones: roadmap, artifacts: defaultArtifacts, taskDraft: { assumption: 'Homeowners struggle to find reliable repair help quickly.', customer: 'Busy homeowners in urban neighborhoods', evidence: 'Three informal conversations and competitor reviews' }, metrics: demoMetrics }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'startup-companion-demo',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ ...state, hydrated: false }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);
