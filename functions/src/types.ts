import { Timestamp } from "firebase-admin/firestore";

export interface SequenceEmail {
  order: number;
  subject: string;
  body: string;
  delayDays: number;
}

export interface EmailSequence {
  id: string;
  name: string;
  emails: SequenceEmail[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface EmailEvent {
  step: number;
  sentAt: Timestamp;
  messageId: string;
  threadId: string;
  opened: boolean;
  openedAt?: Timestamp;
  clicked: boolean;
  clickedAt?: Timestamp;
  replied: boolean;
  repliedAt?: Timestamp;
}

export interface LeadSequenceStatus {
  leadId: string;
  sequenceId: string;
  sequenceName: string;
  currentStep: number;
  status: "active" | "paused" | "completed" | "replied" | "bounced";
  startedAt: Timestamp;
  nextSendAt: Timestamp | null;
  history: EmailEvent[];
  recipientEmail: string;
  recipientName: string;
}

export interface GmailConfig {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
  connectedAt: Timestamp;
}

export interface TrackingPixelData {
  leadId: string;
  sequenceId: string;
  step: number;
  eventId: string;
}
