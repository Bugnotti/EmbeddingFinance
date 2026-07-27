import { Milestone } from '@/data/demo';

export function completeTaskTransition(milestones: Milestone[], taskId: string): Milestone[] {
  const targetId = taskId === 'write-assumption' ? 'assumption' : taskId === 'prepare-interview' ? 'interviews' : undefined;
  if (!targetId) return milestones;
  const target = milestones.find((item) => item.id === targetId);
  if (!target || target.status !== 'in_progress') return milestones;

  return milestones.map((item) => {
    if (item.id === targetId) return { ...item, status: 'completed', progress: 100 } as Milestone;
    if (taskId === 'write-assumption' && item.id === 'interviews') return { ...item, status: 'in_progress' } as Milestone;
    if (taskId === 'prepare-interview' && item.id === 'canvas') return { ...item, status: 'in_progress' } as Milestone;
    return item;
  });
}

export function getNextMilestone(milestones: Milestone[]): Milestone | undefined {
  return milestones.find((item) => item.status === 'in_progress') ?? milestones.find((item) => item.status === 'available');
}

export function completedMilestoneCount(milestones: Milestone[]): number {
  return milestones.filter((item) => item.status === 'completed').length;
}
