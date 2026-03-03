export interface VendorPortalCompany {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
}

export interface VendorPortalJobPosting {
  id: number;
  jobTitle: string;
  description: string;
  department: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  positionsAvailable: number;
  positionsFilled: number;
  status: "OPEN" | "CLOSED" | "ON_HOLD";
  createdAt: string;
  closingDate: string;
}

export interface VendorPortalCandidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPosition: string;
  currentCompany: string;
  yearsOfExperience: number;
  skills: string[];
  resumeUrl: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED" | "PLACED";
  createdAt: string;
}

export interface VendorPortalSubmission {
  id: number;
  jobId: number;
  jobTitle: string;
  candidateId: number;
  candidateName: string;
  submittedDate: string;
  status: "PENDING" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED";
  feedbackFromHiringManager?: string;
  qualityScore?: number;
}

export interface CreateCandidateSubmissionRequest {
  jobId: number;
  candidateId: number;
}

export interface UpdateSubmissionStatusRequest {
  status: "ACCEPTED" | "REJECTED";
  feedback?: string;
}

export interface CreateVendorCandidateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPosition: string;
  currentCompany: string;
  yearsOfExperience: number;
  skills: string[];
  resumeFile: File;
}
