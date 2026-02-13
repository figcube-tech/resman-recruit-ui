import apiClient from './client';
import { Candidate, CreateCandidateDto, UpdateCandidateDto, CandidateFilters } from '@/types';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/types';

const BASE_PATH = '/candidates';

export const candidatesApi = {
  list: async (params?: QueryParams & CandidateFilters): Promise<PaginatedResponse<Candidate>> => {
    const { data } = await apiClient.get(BASE_PATH, { params });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Candidate>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/${id}`);
    return data;
  },

  create: async (dto: CreateCandidateDto): Promise<ApiResponse<Candidate>> => {
    const { data } = await apiClient.post(BASE_PATH, dto);
    return data;
  },

  update: async (id: string, dto: UpdateCandidateDto): Promise<ApiResponse<Candidate>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete(`${BASE_PATH}/${id}`);
    return data;
  },

  getApplications: async (id: string): Promise<ApiResponse<import('@/types').Application[]>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/${id}/applications`);
    return data;
  },
};
