export type CandidateSource = 'website' | 'referral' | 'linkedin' | 'job_board' | 'agency' | 'other';

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  currentTitle?: string;
  currentCompany?: string;
  experienceYears?: number;
  skills: string[];
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  source: CandidateSource;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCandidateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  currentTitle?: string;
  currentCompany?: string;
  experienceYears?: number;
  skills: string[];
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  source: CandidateSource;
  notes?: string;
  tags?: string[];
}

export interface UpdateCandidateDto extends Partial<CreateCandidateDto> {}

export interface CandidateFilters {
  source?: CandidateSource;
  skills?: string[];
  location?: string;
  experienceMin?: number;
  experienceMax?: number;
}
