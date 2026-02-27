import type { Lead } from './lead';

export type ActivityType =
  | 'LEAD_CREATED'
  | 'LEAD_UPDATED'
  | 'LEAD_STAGE_CHANGED'
  | 'NOTE_ADDED';

export interface Activity {
  id: string;
  type: ActivityType;
  leadId: string;
  lead?: Lead;
  userId?: string;
  timestamp: Date;
  data?: {
    previousStage?: string;
    newStage?: string;
    noteId?: string;
    [key: string]: any;
  };
}

// Helper to create activity ID
export const createActivityId = (type: ActivityType, leadId: string, timestamp: Date): string => {
  return `${type}.${leadId}.${timestamp.getTime()}`;
};
