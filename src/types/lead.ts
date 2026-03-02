export interface LeadContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
}

// Owner note - individual note from a team member
export interface OwnerNote {
  author: string;
  content: string;
  updatedAt: Date | any; // Firestore Timestamp or Date
}

// Studio/Publisher size categories (gaming industry standard)
export type StudioSize = 'micro' | 'indie' | 'a' | 'aa' | 'aaa';

export const STUDIO_SIZE_LABELS: Record<StudioSize, string> = {
  micro: 'Micro (1-3)',
  indie: 'Indie (3-15)',
  a: 'A (15-50)',
  aa: 'AA (50-250)',
  aaa: 'AAA (250+)',
};

// Fit tags for studios/publishers - from spreadsheet
export type FitTag =
  | 'Narrative Focus'
  | 'User of Similar Tools'
  | 'Prototyping'
  | 'Innovation'
  | 'Efficiency'
  | 'Emergent Narrative';

export const FIT_TAGS: FitTag[] = [
  'Narrative Focus',
  'User of Similar Tools',
  'Prototyping',
  'Innovation',
  'Efficiency',
  'Emergent Narrative',
];

// Fit criteria for studios - checkboxes that sum to fit score
export interface StudioFitCriteria {
  narrativeHeavyGenre?: boolean;    // +3 - RPG, adventure, visual novel, story-driven
  aiPositiveAttitude?: boolean;      // +3 - Eager to use AI to innovate/scale
  rightSize?: boolean;               // +2 - Indie to AA (not solo, not massive AAA)
  inActiveProduction?: boolean;      // +1 - Currently making a game
  usesTargetEngine?: boolean;        // +1 - Unity or Unreal
  otherScore?: number;               // 0-10 custom adjustment
  otherReason?: string;              // Explanation for other score
}

// Fit criteria for investors - checkboxes that sum to fit score
export interface InvestorFitCriteria {
  preSeedFocus?: boolean;            // +3 - Invests at pre-seed stage
  gamingSectorActive?: boolean;      // +3 - Active in gaming/interactive entertainment
  aiDevToolsThesis?: boolean;        // +2 - Invests in AI, dev tools, or B2B SaaS
  euBased?: boolean;                 // +1 - EU-based or invests in EU
  relevantPortfolio?: boolean;       // +1 - Has gaming or dev tools companies
  otherScore?: number;               // 0-10 custom adjustment
  otherReason?: string;              // Explanation for other score
}

export interface StudioInfo {
  size: StudioSize | string; // StudioSize preferred, string for backwards compat
  type: string;
  games: string[];
  focus: string;
  fitScore: number;
  fitReason: string;
  fitCriteria?: StudioFitCriteria;
  fitTags?: FitTag[];
}

export interface InvestorInfo {
  type: string;
  founded: string;
  investmentFocus: string;
  fundingPreferences: string;
  geographicalRegions: string[];
  hqRegion: string;
  fitScore?: number;
  fitCriteria?: InvestorFitCriteria;
}

export type LeadSource = 'website' | 'referral' | 'linkedin' | 'conference' | 'cold_outreach' | 'inbound' | 'other';
export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
export type LeadCategory = 'prospect' | 'lead';

export interface Lead {
  id: string;
  type: 'studio' | 'publisher' | 'investor';
  name: string;
  status: string;
  priority: 'high' | 'medium' | 'low' | 'none';
  category?: LeadCategory;
  owner: string;
  contact: LeadContact;
  website: string;
  country: string;
  location: string;
  tags: string[];
  notes: string;
  ownerNotes?: OwnerNote[];
  studio?: StudioInfo;  // Also used for publishers
  investor?: InvestorInfo;
  pipeline: {
    pipelineId: string;
    stageId: string;
    enteredStageAt: any;
  };
  createdAt: any;
  updatedAt: any;
  createdBy: string;
  // Qualification fields
  leadSource?: LeadSource;
  companySize?: CompanySize;
  budgetRange?: string;
  decisionTimeline?: string;
  lastContactedAt?: Date;
  nextFollowUpAt?: Date;
  isDecisionMaker?: boolean;

  // Intent signals
  hasRequestedPricing?: boolean;
  hasRequestedDemo?: boolean;

  // Computed priority scores (for display/debugging)
  intentScore?: number;
  recencyScore?: number;
  priorityScore?: number;
}

export interface LeadFormData extends Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'pipeline'> {
  pipeline?: Partial<Lead['pipeline']>;
}

export interface LeadFilters {
  type?: 'studio' | 'investor';
  category?: LeadCategory;
  status?: string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  owner?: string;
  search?: string;
}