export interface ReportSummary {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  applicationsInProgress: number;
  selectedCandidates: number;
  rejectedCandidates: number;
  totalOffers: number;
  acceptedOffers: number;
  rejectionRate: number;
  averageTimeToHire: number;
}

export interface JobReportMetrics {
  jobId: number;
  jobTitle: string;
  positionCount: number;
  applicationsReceived: number;
  applicationsInProgress: number;
  applicationsSelected: number;
  applicationsRejected: number;
  offersCreated: number;
  offersAccepted: number;
  offersRejected: number;
  sourceBreakdown: Record<string, number>;
  applicationTrend: ApplicationTrendPoint[];
}

export interface ApplicationTrendPoint {
  date: string;
  count: number;
}

export interface RecruiterMetrics {
  recruiterId: number;
  recruiterName: string;
  jobsHandled: number;
  applicationsReviewed: number;
  candidatesSelected: number;
  offersCreated: number;
  offersAccepted: number;
  performanceScore: number;
  feedbackRating: number;
}

export interface CompanyMetrics {
  companyId: number;
  companyName: string;
  totalJobPostings: number;
  totalApplications: number;
  selectedCandidates: number;
  offersCreated: number;
  offersAccepted: number;
  averageTimeToFill: number;
  topPerformingJobs: JobMetric[];
}

export interface JobMetric {
  jobId: number;
  jobTitle: string;
  applicationsCount: number;
  selectedCount: number;
  conversionRate: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

export interface ApplicationFunnel {
  jobId?: number;
  jobTitle?: string;
  funnel: FunnelData[];
}

export interface TimeToHireData {
  daysRange: string;
  count: number;
  percentage: number;
}

export interface VendorPerformance {
  vendorId: number;
  vendorName: string;
  candidatesSubmitted: number;
  candidatesSelected: number;
  selectionRate: number;
  averageQualityScore: number;
  activeListings: number;
  totalEarnings: number;
}
