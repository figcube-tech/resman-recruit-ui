import apiClient from './client';
import { DashboardStats } from '@/types';
import { ApiResponse } from '@/types';

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const { data } = await apiClient.get('/dashboard/stats');
    return data;
  },
};
