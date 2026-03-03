import api from "@/lib/api/client";
import {
  VendorPortalCompany,
  VendorPortalJobPosting,
  VendorPortalCandidate,
  VendorPortalSubmission,
  CreateCandidateSubmissionRequest,
  UpdateSubmissionStatusRequest,
  CreateVendorCandidateRequest,
} from "@/types/vendor";

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

interface PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export const vendorPortalApi = {
  // Get my company info
  async getCompanyInfo(companyId: number) {
    const response = await api.get<ApiResponse<VendorPortalCompany>>(
      `/api/vendor-portal/companies/${companyId}`,
    );
    return response.data;
  },

  // Get available job postings for my company
  async getAvailableJobs(companyId: number, page = 0, size = 20) {
    const response = await api.get<
      ApiResponse<PaginatedResponse<VendorPortalJobPosting>>
    >(`/api/vendor-portal/companies/${companyId}/job-postings`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get specific job posting details
  async getJobPosting(companyId: number, jobId: number) {
    const response = await api.get<ApiResponse<VendorPortalJobPosting>>(
      `/api/vendor-portal/companies/${companyId}/job-postings/${jobId}`,
    );
    return response.data;
  },

  // Get my candidates
  async getCandidates(companyId: number, page = 0, size = 20) {
    const response = await api.get<
      ApiResponse<PaginatedResponse<VendorPortalCandidate>>
    >(`/api/vendor-portal/companies/${companyId}/candidates`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get candidate details
  async getCandidate(companyId: number, candidateId: number) {
    const response = await api.get<ApiResponse<VendorPortalCandidate>>(
      `/api/vendor-portal/companies/${companyId}/candidates/${candidateId}`,
    );
    return response.data;
  },

  // Create a new candidate
  async createCandidate(companyId: number, data: CreateVendorCandidateRequest) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("currentPosition", data.currentPosition);
    formData.append("currentCompany", data.currentCompany);
    formData.append("yearsOfExperience", data.yearsOfExperience.toString());
    formData.append("skills", JSON.stringify(data.skills));
    formData.append("resumeFile", data.resumeFile);

    const response = await api.post<ApiResponse<VendorPortalCandidate>>(
      `/api/vendor-portal/companies/${companyId}/candidates`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  // Submit candidate for a job
  async submitCandidate(
    companyId: number,
    data: CreateCandidateSubmissionRequest,
  ) {
    const response = await api.post<ApiResponse<VendorPortalSubmission>>(
      `/api/vendor-portal/companies/${companyId}/submissions`,
      data,
    );
    return response.data;
  },

  // Get my submissions
  async getSubmissions(companyId: number, page = 0, size = 20) {
    const response = await api.get<
      ApiResponse<PaginatedResponse<VendorPortalSubmission>>
    >(`/api/vendor-portal/companies/${companyId}/submissions`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get submission details
  async getSubmission(companyId: number, submissionId: number) {
    const response = await api.get<ApiResponse<VendorPortalSubmission>>(
      `/api/vendor-portal/companies/${companyId}/submissions/${submissionId}`,
    );
    return response.data;
  },

  // Update submission status
  async updateSubmissionStatus(
    companyId: number,
    submissionId: number,
    data: UpdateSubmissionStatusRequest,
  ) {
    const response = await api.put<ApiResponse<VendorPortalSubmission>>(
      `/api/vendor-portal/companies/${companyId}/submissions/${submissionId}`,
      data,
    );
    return response.data;
  },

  // Get submission statistics
  async getSubmissionStats(companyId: number) {
    const response = await api.get(
      `/api/vendor-portal/companies/${companyId}/submissions/stats`,
    );
    return response.data;
  },

  // Get earnings/reports for vendor
  async getEarningsReport(companyId: number) {
    const response = await api.get(
      `/api/vendor-portal/companies/${companyId}/earnings`,
    );
    return response.data;
  },
};
