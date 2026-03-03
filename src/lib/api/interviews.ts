import apiClient from './client';
import { Interview, CreateInterviewDto, UpdateInterviewDto, InterviewFilters } from '@/types';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/types';

const BASE_PATH = '/interviews';

export const interviewsApi = {
  list: async (params?: QueryParams & InterviewFilters): Promise<PaginatedResponse<Interview>> => {
    const { data } = await apiClient.get(BASE_PATH, { params });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Interview>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/${id}`);
    return data;
  },

  create: async (dto: CreateInterviewDto): Promise<ApiResponse<Interview>> => {
    const { data } = await apiClient.post(BASE_PATH, dto);
    return data;
  },

  update: async (id: string, dto: UpdateInterviewDto): Promise<ApiResponse<Interview>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.delete(`${BASE_PATH}/${id}`);
    return data;
  },

  submitFeedback: async (id: string, feedback: string, rating: number): Promise<ApiResponse<Interview>> => {
    const { data } = await apiClient.patch(`${BASE_PATH}/${id}/feedback`, { feedback, rating });
    return data;
  },

  getByApplication: async (applicationId: string): Promise<ApiResponse<Interview[]>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/application/${applicationId}`);
    return data;
  },

  getUpcoming: async (): Promise<ApiResponse<Interview[]>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/upcoming`);
    return data;
  },
};
