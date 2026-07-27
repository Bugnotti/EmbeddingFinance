import { Milestone } from '@/data/demo';

export function completeTaskTransition(milestones: Milestone[], taskId: string): Milestone[] {
  if (taskId !== 'write-assumption') return milestones;
  const assumption = milestones.find((item) => item.id === 'assumption');
  if (!assumption || assumption.status === 'completed') return milestones;

  return milestones.map((item) => {
    if (item.id === 'assumption') return { ...item, status: 'completed', progress: 100 } as Milestone;
    if (item.id === 'interviews') return { ...item, status: 'in_progress' } as Milestone;
    return item;
  });
}

export function getNextMilestone(milestones: Milestone[]): Milestone | undefined {
  return milestones.find((item) => item.status === 'in_progress') ?? milestones.find((item) => item.status === 'available');
}

export function completedMilestoneCount(milestones: Milestone[]): number {
  return milestones.filter((item) => item.status === 'completed').length;
}
