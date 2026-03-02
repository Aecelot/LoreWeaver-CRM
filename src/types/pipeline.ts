export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  isActive: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  type: 'studio' | 'investor';
  stages: PipelineStage[];
  createdAt: any;
  updatedAt: any;
}

export const DEFAULT_STUDIO_STAGES: Omit<PipelineStage, 'id'>[] = [
  { name: 'New Lead', color: 'gray', order: 1, isActive: true },
  { name: 'Researched', color: 'blue', order: 2, isActive: true },
  { name: 'Qualified Lead', color: 'cyan', order: 3, isActive: true },
  { name: 'Contacted', color: 'yellow', order: 4, isActive: true },
  { name: 'Meeting', color: 'orange', order: 5, isActive: true },
  { name: 'Proposal', color: 'purple', order: 6, isActive: true },
  { name: 'Negotiation', color: 'indigo', order: 7, isActive: true },
  { name: 'Won', color: 'green', order: 8, isActive: true },
  { name: 'Lost', color: 'red', order: 9, isActive: false },
];

export const DEFAULT_INVESTOR_STAGES: Omit<PipelineStage, 'id'>[] = [
  { name: 'Identified', color: 'gray', order: 1, isActive: true },
  { name: 'Researched', color: 'blue', order: 2, isActive: true },
  { name: 'Warm Intro', color: 'yellow', order: 3, isActive: true },
  { name: 'First Meeting', color: 'orange', order: 4, isActive: true },
  { name: 'Follow-up', color: 'purple', order: 5, isActive: true },
  { name: 'Due Diligence', color: 'indigo', order: 6, isActive: true },
  { name: 'Term Sheet', color: 'cyan', order: 7, isActive: true },
  { name: 'Closed', color: 'green', order: 8, isActive: true },
  { name: 'Passed', color: 'red', order: 9, isActive: false },
];