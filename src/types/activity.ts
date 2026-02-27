import type { Timestamp } from 'firebase/firestore';

export type ActivityType =
  | 'lead_created'
  | 'lead_updated'
  | 'lead_deleted'
  | 'stage_changed'
  | 'note_added'
  | 'note_updated'
  | 'note_deleted';

export interface ActivityChange {
  field: string;
  from: unknown;
  to: unknown;
}

export interface Activity {
  id: string;
  leadId: string;
  type: ActivityType;
  description: string;
  changes?: ActivityChange[];
  userId: string;
  userEmail: string;
  createdAt: Timestamp;
}

export interface ActivityFormData {
  leadId: string;
  type: ActivityType;
  description: string;
  changes?: ActivityChange[];
  userId: string;
  userEmail: string;
}

// Human-readable labels for activity types
export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  lead_created: 'Created lead',
  lead_updated: 'Updated lead',
  lead_deleted: 'Deleted lead',
  stage_changed: 'Changed stage',
  note_added: 'Added note',
  note_updated: 'Updated note',
  note_deleted: 'Deleted note',
};
