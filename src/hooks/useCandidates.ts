import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { candidatesApi } from '@/lib/api';
import { CreateCandidateDto, UpdateCandidateDto, CandidateFilters, QueryParams } from '@/types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/api/errors';

const CANDIDATES_KEY = 'candidates';

export function useCandidates(params?: QueryParams & CandidateFilters) {
  return useQuery({
    queryKey: [CANDIDATES_KEY, params],
    queryFn: () => candidatesApi.list(params),
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: [CANDIDATES_KEY, id],
    queryFn: () => candidatesApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCandidateDto) => candidatesApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CANDIDATES_KEY] });
      toast.success('Candidate created successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCandidateDto }) => candidatesApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CANDIDATES_KEY] });
      toast.success('Candidate updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => candidatesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CANDIDATES_KEY] });
      toast.success('Candidate deleted successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
