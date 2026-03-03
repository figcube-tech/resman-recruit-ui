import apiClient from "./client";
import {
  Offer,
  CreateOfferRequest,
  UpdateOfferRequest,
  RejectOfferRequest,
} from "@/types/offer";
import { ApiResponse } from "@/types";

const BASE_PATH = "/offers";

export const offersApi = {
  list: async (params: {
    page?: number;
    size?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<
    ApiResponse<{
      data: Offer[];
      page: number;
      size: number;
      total: number;
      totalPages: number;
    }>
  > => {
    const { data } = await apiClient.get(BASE_PATH, { params });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Offer>> => {
    const { data } = await apiClient.get(`${BASE_PATH}/${id}`);
    return data;
  },

  create: async (request: CreateOfferRequest): Promise<ApiResponse<Offer>> => {
    const { data } = await apiClient.post(BASE_PATH, {
      applicationId: parseInt(request.applicationId),
      position: request.position,
      department: request.department,
      location: request.location,
      salary: request.salary,
      bonus: request.bonus,
      benefits: request.benefits,
      joiningDate: request.joiningDate,
      offerExpiryDate: request.offerExpiryDate,
    });
    return data;
  },

  update: async (
    id: string,
    request: UpdateOfferRequest,
  ): Promise<ApiResponse<Offer>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}`, request);
    return data;
  },

  accept: async (id: string): Promise<ApiResponse<Offer>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}/accept`, {});
    return data;
  },

  reject: async (
    id: string,
    request: RejectOfferRequest,
  ): Promise<ApiResponse<Offer>> => {
    const { data } = await apiClient.put(`${BASE_PATH}/${id}/reject`, request);
    return data;
  },

  uploadLetter: async (id: string, file: File): Promise<ApiResponse<Offer>> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post(
      `${BASE_PATH}/${id}/letter`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  getLetterUrl: async (
    id: string,
  ): Promise<ApiResponse<{ presignedUrl: string }>> => {
    const { data } = await apiClient.get(
      `${BASE_PATH}/${id}/letter/presigned-url`,
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },
};
