export interface LeadContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface StudioInfo {
  size: string;
  type: string;
  games: string[];
  focus: string;
  fitScore: number;
  fitReason: string;
}

export interface InvestorInfo {
  type: string;
  founded: string;
  investmentFocus: string;
  fundingPreferences: string;
  geographicalRegions: string[];
  hqRegion: string;
}

export type LeadSource = 'website' | 'referral' | 'linkedin' | 'conference' | 'cold_outreach' | 'inbound' | 'other';
export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';

export interface Lead {
  id: string;
  type: 'studio' | 'investor';
  name: string;
  status: string;
  priority: 'high' | 'medium' | 'low' | 'none';
  owner: string;
  contact: LeadContact;
  website: string;
  country: string;
  location: string;
  tags: string[];
  notes: string;
  studio?: StudioInfo;
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
}

export interface LeadFormData extends Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'pipeline'> {
  pipeline?: Partial<Lead['pipeline']>;
}

export interface LeadFilters {
  type?: 'studio' | 'investor';
  status?: string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  owner?: string;
  search?: string;
}