import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { offersApi } from "@/lib/api/offers";
import {
  Offer,
  CreateOfferRequest,
  UpdateOfferRequest,
  RejectOfferRequest,
} from "@/types/offer";
import toast from "react-hot-toast";

export const useOffers = (params?: {
  page?: number;
  size?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  return useQuery({
    queryKey: ["offers", params],
    queryFn: () => offersApi.list(params || {}),
  });
};

export const useOffer = (id: string | null) => {
  return useQuery({
    queryKey: ["offers", id],
    queryFn: () => (id ? offersApi.getById(id) : Promise.reject("No ID")),
    enabled: !!id,
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOfferRequest) => offersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOfferRequest }) =>
      offersApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.setQueryData(["offers", data.data.id], data);
    },
  });
};

export const useAcceptOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => offersApi.accept(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.setQueryData(["offers", data.data.id], data);
    },
  });
};

export const useRejectOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RejectOfferRequest }) =>
      offersApi.reject(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.setQueryData(["offers", data.data.id], data);
    },
  });
};

export const useUploadOfferLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      offersApi.uploadLetter(id, file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      queryClient.setQueryData(["offers", data.data.id], data);
    },
  });
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => offersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
};
