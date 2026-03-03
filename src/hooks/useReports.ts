import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "@/lib/api/reports";

export function useReportSummary() {
  return useQuery({
    queryKey: ["reports", "summary"],
    queryFn: () => reportsApi.getSummary(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useJobMetrics(jobId: number) {
  return useQuery({
    queryKey: ["reports", "jobs", jobId],
    queryFn: () => reportsApi.getJobMetrics(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecruiterMetrics(recruiterId: number) {
  return useQuery({
    queryKey: ["reports", "recruiters", recruiterId],
    queryFn: () => reportsApi.getRecruiterMetrics(recruiterId),
    enabled: !!recruiterId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCompanyMetrics(companyId: number) {
  return useQuery({
    queryKey: ["reports", "companies", companyId],
    queryFn: () => reportsApi.getCompanyMetrics(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVendorMetrics(vendorId: number) {
  return useQuery({
    queryKey: ["reports", "vendors", vendorId],
    queryFn: () => reportsApi.getVendorMetrics(vendorId),
    enabled: !!vendorId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllVendorMetrics(limit?: number) {
  return useQuery({
    queryKey: ["reports", "vendors", "all", limit],
    queryFn: () => reportsApi.getAllVendorMetrics(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
