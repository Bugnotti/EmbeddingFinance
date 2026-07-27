export type JourneyStage = 'Idea' | 'Validate' | 'Plan' | 'Build' | 'Launch' | 'Grow';
export type MilestoneStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type ArtifactStatus = 'not_started' | 'draft' | 'needs_review' | 'complete';

export type Startup = {
  id: string;
  name: string;
  idea: string;
  industry: string;
  countryCode: string;
  stage: JourneyStage;
};

export type Milestone = {
  id: string;
  stage: JourneyStage;
  title: string;
  subtitle: string;
  status: MilestoneStatus;
  progress: number;
  lessonId?: string;
  taskId?: string;
  artifactId?: string;
};

export type Artifact = {
  id: string;
  title: string;
  category: string;
  status: ArtifactStatus;
  fields: Record<string, string>;
};

export const stages: JourneyStage[] = ['Idea', 'Validate', 'Plan', 'Build', 'Launch', 'Grow'];

export const countryOptions = [
  { code: 'IT', label: 'Italy', flag: 'IT' },
  { code: 'GB', label: 'United Kingdom', flag: 'GB' },
  { code: 'US', label: 'United States', flag: 'US' },
];

export const industryOptions = ['Local services marketplace', 'Climate technology', 'Health and wellness', 'Business software'];

export const defaultStartup: Startup = {
  id: 'startup-neighbourfix',
  name: 'NeighbourFix',
  idea: 'A marketplace connecting residents with trusted local repair professionals.',
  industry: 'Local services marketplace',
  countryCode: 'IT',
  stage: 'Validate',
};

export const roadmap: Milestone[] = [
  { id: 'problem', stage: 'Idea', title: 'Define the problem', subtitle: 'Turn your idea into a clear customer problem.', status: 'completed', progress: 100 },
  { id: 'assumption', stage: 'Validate', title: 'Test your riskiest assumption', subtitle: 'Make the belief behind your idea measurable.', status: 'in_progress', progress: 60, lessonId: 'problem-assumptions', taskId: 'write-assumption' },
  { id: 'interviews', stage: 'Validate', title: 'Talk to five customers', subtitle: 'Learn what people do today and what they need next.', status: 'available', progress: 0, lessonId: 'customer-interviews', taskId: 'prepare-interview' },
  { id: 'canvas', stage: 'Plan', title: 'Shape your value proposition', subtitle: 'Connect customer pain to a reason to choose you.', status: 'locked', progress: 0, artifactId: 'value-proposition' },
  { id: 'mvp', stage: 'Build', title: 'Define your MVP', subtitle: 'Choose the smallest useful experiment.', status: 'locked', progress: 0 },
  { id: 'launch', stage: 'Launch', title: 'Plan your first experiment', subtitle: 'Design a launch action you can measure.', status: 'locked', progress: 0 },
  { id: 'growth', stage: 'Grow', title: 'Build your growth dashboard', subtitle: 'Keep the signals that help you make decisions.', status: 'locked', progress: 0 },
];

export const defaultArtifacts: Artifact[] = [
  { id: 'value-proposition', title: 'Value Proposition Canvas', category: 'Strategy', status: 'draft', fields: { customerJobs: 'Find a reliable repair professional quickly', pains: 'Unclear pricing and slow replies', gains: 'Trusted help with a simple booking experience', products: 'NeighbourFix local repair marketplace', painRelievers: '', gainCreators: '' } },
  { id: 'persona', title: 'Customer Persona', category: 'Validation', status: 'not_started', fields: {} },
  { id: 'interview-plan', title: 'Interview Plan', category: 'Validation', status: 'not_started', fields: {} },
  { id: 'legal-checklist', title: 'Italy legal checklist', category: 'Company setup', status: 'needs_review', fields: { registration: 'Choose a business structure', compliance: 'Review local obligations', documents: 'Collect founder documents' } },
];

export function createRoadmap(): Milestone[] {
  return roadmap.map((milestone) => ({ ...milestone }));
}

export function createArtifacts(startup: Startup): Artifact[] {
  const countryLabel = countryOptions.find((option) => option.code === startup.countryCode)?.label ?? startup.countryCode;
  return [
    {
      id: 'value-proposition',
      title: 'Value Proposition Canvas',
      category: 'Strategy',
      status: 'not_started',
      fields: {
        customerJobs: '',
        pains: '',
        gains: '',
        products: startup.name,
        painRelievers: '',
        gainCreators: '',
      },
    },
    { id: 'persona', title: 'Customer Persona', category: 'Validation', status: 'not_started', fields: {} },
    { id: 'interview-plan', title: 'Interview Plan', category: 'Validation', status: 'not_started', fields: {} },
    {
      id: 'legal-checklist',
      title: `${countryLabel} legal checklist`,
      category: 'Company setup',
      status: 'needs_review',
      fields: {
        registration: 'Choose a business structure',
        compliance: 'Review local obligations',
        documents: 'Collect founder documents',
      },
    },
  ];
}

export const demoMetrics = {
  interviews: 3,
  experiments: 1,
  artifacts: 1,
  progress: 34,
  revenue: '€0',
  monthlySpend: '€420',
  runway: '8 months',
};
