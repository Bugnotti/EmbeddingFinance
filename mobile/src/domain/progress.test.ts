import { roadmap } from '@/data/demo';
import { completedMilestoneCount, completeTaskTransition, getNextMilestone } from '@/domain/progress';

describe('roadmap progress', () => {
  it('starts with the active assumption milestone', () => {
    expect(getNextMilestone(roadmap)?.id).toBe('assumption');
    expect(completedMilestoneCount(roadmap)).toBe(1);
  });

  it('completes the assumption and starts interviews', () => {
    const next = completeTaskTransition(roadmap, 'write-assumption');
    expect(next.find((item) => item.id === 'assumption')?.status).toBe('completed');
    expect(next.find((item) => item.id === 'interviews')?.status).toBe('in_progress');
  });

  it('is idempotent when the same task is submitted twice', () => {
    const once = completeTaskTransition(roadmap, 'write-assumption');
    const twice = completeTaskTransition(once, 'write-assumption');
    expect(twice).toBe(once);
  });

  it('completes the interview task and opens the canvas', () => {
    const afterAssumption = completeTaskTransition(roadmap, 'write-assumption');
    const next = completeTaskTransition(afterAssumption, 'prepare-interview');
    expect(next.find((item) => item.id === 'interviews')?.status).toBe('completed');
    expect(next.find((item) => item.id === 'canvas')?.status).toBe('in_progress');
  });

  it('does not change the roadmap for an unknown task', () => {
    expect(completeTaskTransition(roadmap, 'unknown-task')).toBe(roadmap);
  });
});
