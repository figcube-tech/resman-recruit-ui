import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewsApi } from '@/lib/api';
import { CreateInterviewDto, UpdateInterviewDto, InterviewFilters, QueryParams } from '@/types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/api/errors';

const INTERVIEWS_KEY = 'interviews';

export function useInterviews(params?: QueryParams & InterviewFilters) {
  return useQuery({
    queryKey: [INTERVIEWS_KEY, params],
    queryFn: () => interviewsApi.list(params),
  });
}

export function useInterview(id: string) {
  return useQuery({
    queryKey: [INTERVIEWS_KEY, id],
    queryFn: () => interviewsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateInterviewDto) => interviewsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEWS_KEY] });
      toast.success('Interview scheduled successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateInterviewDto }) => interviewsApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEWS_KEY] });
      toast.success('Interview updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => interviewsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEWS_KEY] });
      toast.success('Interview deleted successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, feedback, rating }: { id: string; feedback: string; rating: number }) =>
      interviewsApi.submitFeedback(id, feedback, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERVIEWS_KEY] });
      toast.success('Feedback submitted successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpcomingInterviews() {
  return useQuery({
    queryKey: [INTERVIEWS_KEY, 'upcoming'],
    queryFn: () => interviewsApi.getUpcoming(),
  });
}
