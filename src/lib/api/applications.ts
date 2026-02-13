import apiClient from './client';
import { Application, CreateApplicationDto, UpdateApplicationDto, ApplicationFilters } from '@/types';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/types';

const BASE_PATH = '/applications';

export const applicationsApi = {
  list: async (params?: QueryParams & ApplicationFilters): Promise<PaginatedResponse<Application>> => {
    const { data } = await apiClient.get(BASE_PATH, { params });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Application>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/${id}`);
    return data;
  },

  create: async (dto: CreateApplicationDto): Promise<ApiResponse<Application>> => {
    const { data } = await apiClient.post(BASE_PATH, dto);
    return data;
  },

  update: async (id: string, dto: UpdateApplicationDto): Promise<ApiResponse<Application>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}`, dto);
    return data;
  },

  updateStatus: async (id: string, status: Application['status'], rejectionReason?: string): Promise<ApiResponse<Application>> => {
    const { data } = await apiClient.patch(`${BASE_PATH}/${id}/status`, { status, rejectionReason });
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete(`${BASE_PATH}/${id}`);
    return data;
  },

  getByJob: async (jobId: string, params?: QueryParams): Promise<PaginatedResponse<Application>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/job/${jobId}`, { params });
    return data;
  },

  getByCandidate: async (candidateId: string, params?: QueryParams): Promise<PaginatedResponse<Application>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/candidate/${candidateId}`, { params });
    return data;
  },
};
