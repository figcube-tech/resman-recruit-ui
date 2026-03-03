import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorPortalApi } from "@/lib/api/vendor";
import {
  CreateCandidateSubmissionRequest,
  UpdateSubmissionStatusRequest,
  CreateVendorCandidateRequest,
} from "@/types/vendor";

export function useVendorCompanyInfo(companyId: number) {
  return useQuery({
    queryKey: ["vendor", "company", companyId],
    queryFn: () => vendorPortalApi.getCompanyInfo(companyId),
    enabled: !!companyId,
    staleTime: 10 * 60 * 1000,
  });
}

export function useVendorAvailableJobs(companyId: number, page = 0, size = 20) {
  return useQuery({
    queryKey: ["vendor", "jobs", companyId, page, size],
    queryFn: () => vendorPortalApi.getAvailableJobs(companyId, page, size),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVendorJobPosting(companyId: number, jobId: number) {
  return useQuery({
    queryKey: ["vendor", "job", companyId, jobId],
    queryFn: () => vendorPortalApi.getJobPosting(companyId, jobId),
    enabled: !!companyId && !!jobId,
  });
}

export function useVendorCandidates(companyId: number, page = 0, size = 20) {
  return useQuery({
    queryKey: ["vendor", "candidates", companyId, page, size],
    queryFn: () => vendorPortalApi.getCandidates(companyId, page, size),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVendorCandidate(companyId: number, candidateId: number) {
  return useQuery({
    queryKey: ["vendor", "candidate", companyId, candidateId],
    queryFn: () => vendorPortalApi.getCandidate(companyId, candidateId),
    enabled: !!companyId && !!candidateId,
  });
}

export function useCreateVendorCandidate(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVendorCandidateRequest) =>
      vendorPortalApi.createCandidate(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "candidates", companyId],
      });
    },
  });
}

export function useVendorSubmitCandidate(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCandidateSubmissionRequest) =>
      vendorPortalApi.submitCandidate(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "submissions", companyId],
      });
    },
  });
}

export function useVendorSubmissions(companyId: number, page = 0, size = 20) {
  return useQuery({
    queryKey: ["vendor", "submissions", companyId, page, size],
    queryFn: () => vendorPortalApi.getSubmissions(companyId, page, size),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVendorSubmission(companyId: number, submissionId: number) {
  return useQuery({
    queryKey: ["vendor", "submission", companyId, submissionId],
    queryFn: () => vendorPortalApi.getSubmission(companyId, submissionId),
    enabled: !!companyId && !!submissionId,
  });
}

export function useUpdateVendorSubmissionStatus(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: number;
      data: UpdateSubmissionStatusRequest;
    }) =>
      vendorPortalApi.updateSubmissionStatus(
        companyId,
        payload.id,
        payload.data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "submissions", companyId],
      });
    },
  });
}

export function useVendorSubmissionStats(companyId: number) {
  return useQuery({
    queryKey: ["vendor", "submissions", "stats", companyId],
    queryFn: () => vendorPortalApi.getSubmissionStats(companyId),
    enabled: !!companyId,
    staleTime: 10 * 60 * 1000,
  });
}

export function useVendorEarningsReport(companyId: number) {
  return useQuery({
    queryKey: ["vendor", "earnings", companyId],
    queryFn: () => vendorPortalApi.getEarningsReport(companyId),
    enabled: !!companyId,
    staleTime: 15 * 60 * 1000,
  });
}
