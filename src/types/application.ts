export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'shortlisted'
  | 'interview'
  | 'assessment'
  | 'offer'
  | 'hired'
  | 'rejected'
  | 'withdrawn';

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
  rating?: number;
  notes?: string;
  rejectionReason?: string;
  job?: {
    id: string;
    title: string;
    department: string;
  };
  candidate?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    currentTitle?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationDto {
  jobId: string;
  candidateId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface UpdateApplicationDto {
  status?: ApplicationStatus;
  rating?: number;
  notes?: string;
  rejectionReason?: string;
}

export interface ApplicationFilters {
  status?: ApplicationStatus;
  jobId?: string;
  candidateId?: string;
  rating?: number;
}

export const APPLICATION_STATUS_ORDER: ApplicationStatus[] = [
  'applied',
  'screening',
  'shortlisted',
  'interview',
  'assessment',
  'offer',
  'hired',
];
