export interface DashboardStats {
  totalJobs: number;
  openJobs: number;
  totalCandidates: number;
  totalApplications: number;
  pendingInterviews: number;
  hiredThisMonth: number;
  applicationsByStatus: { status: string; count: number }[];
  recentApplications: {
    id: string;
    candidateName: string;
    jobTitle: string;
    status: string;
    appliedAt: string;
  }[];
  upcomingInterviews: {
    id: string;
    candidateName: string;
    jobTitle: string;
    scheduledAt: string;
    interviewType: string;
  }[];
}
