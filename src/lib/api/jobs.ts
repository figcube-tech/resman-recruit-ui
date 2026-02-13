import apiClient from './client';
import { Job, CreateJobDto, UpdateJobDto, JobFilters } from '@/types';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/types';

const BASE_PATH = '/jobs';

export const jobsApi = {
  list: async (params?: QueryParams & JobFilters): Promise<PaginatedResponse<Job>> => {
    const { data } = await apiClient.get(BASE_PATH, { params });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Job>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/${id}`);
    return data;
  },

  create: async (dto: CreateJobDto): Promise<ApiResponse<Job>> => {
    const { data } = await apiClient.post(BASE_PATH, dto);
    return data;
  },

  update: async (id: string, dto: UpdateJobDto): Promise<ApiResponse<Job>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete(`${BASE_PATH}/${id}`);
    return data;
  },

  updateStatus: async (id: string, status: Job['status']): Promise<ApiResponse<Job>> => {
    const { data } = await apiClient.patch(`${BASE_PATH}/${id}/status`, { status });
    return data;
  },

  getDepartments: async (): Promise<ApiResponse<string[]>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/departments`);
    return data;
  },
};
