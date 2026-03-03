import api from "@/lib/api/client";
import {
  ReportSummary,
  JobReportMetrics,
  RecruiterMetrics,
  CompanyMetrics,
  VendorPerformance,
} from "@/types/reporting";

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export const reportsApi = {
  // Get overall recruitment summary
  async getSummary() {
    const response = await api.get<ApiResponse<ReportSummary>>(
      "/api/reports/summary",
    );
    return response.data;
  },

  // Get detailed metrics for a specific job
  async getJobMetrics(jobId: number) {
    const response = await api.get<ApiResponse<JobReportMetrics>>(
      `/api/reports/jobs/${jobId}`,
    );
    return response.data;
  },

  // Get recruiter performance metrics
  async getRecruiterMetrics(recruiterId: number) {
    const response = await api.get<ApiResponse<RecruiterMetrics>>(
      `/api/reports/recruiters/${recruiterId}`,
    );
    return response.data;
  },

  // Get company/organization metrics
  async getCompanyMetrics(companyId: number) {
    const response = await api.get<ApiResponse<CompanyMetrics>>(
      `/api/reports/companies/${companyId}`,
    );
    return response.data;
  },

  // Get vendor performance metrics
  async getVendorMetrics(vendorId: number) {
    const response = await api.get<ApiResponse<VendorPerformance>>(
      `/api/reports/vendors/${vendorId}`,
    );
    return response.data;
  },

  // Get all vendor performance for leaderboard
  async getAllVendorMetrics(limit?: number) {
    const response = await api.get<ApiResponse<VendorPerformance[]>>(
      `/api/reports/vendors`,
      {
        params: { limit },
      },
    );
    return response.data;
  },

  // Export report as PDF
  async exportReportPDF(reportType: string, filters?: Record<string, any>) {
    const response = await api.get(`/api/reports/export/pdf`, {
      params: { type: reportType, ...filters },
      responseType: "blob",
    });
    return response.data;
  },

  // Export report as Excel
  async exportReportExcel(reportType: string, filters?: Record<string, any>) {
    const response = await api.get(`/api/reports/export/excel`, {
      params: { type: reportType, ...filters },
      responseType: "blob",
    });
    return response.data;
  },
};
