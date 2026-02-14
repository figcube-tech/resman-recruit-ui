import apiClient from './client';
import { LoginCredentials, AuthTokens, User } from '@/types';
import { ApiResponse } from '@/types';

const BASE_PATH = '/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
    const { data } = await apiClient.post(`${BASE_PATH}/login`, credentials);
    
    // Transform the API response to match the expected format
    const transformedData = {
      user: {
        ...data.user,
        // Add a computed name field from firstName and lastName
        name: `${data.user.firstName} ${data.user.lastName}`,
      } as User,
      tokens: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      } as AuthTokens,
    };
    
    return {
      data: transformedData,
      message: 'Login successful',
      success: true,
    };
  },

  logout: async (): Promise<void> => {
    await apiClient.post(`${BASE_PATH}/logout`);
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    const { data } = await apiClient.post(`${BASE_PATH}/refresh`, { refreshToken });
    return data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/profile`);
    return data;
  },
};
