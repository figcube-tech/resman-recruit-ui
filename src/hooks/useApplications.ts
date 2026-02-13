import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '@/lib/api';
import { CreateApplicationDto, UpdateApplicationDto, ApplicationFilters, ApplicationStatus, QueryParams } from '@/types';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/api/errors';

const APPLICATIONS_KEY = 'applications';

export function useApplications(params?: QueryParams & ApplicationFilters) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, params],
    queryFn: () => applicationsApi.list(params),
  });
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, id],
    queryFn: () => applicationsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateApplicationDto) => applicationsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] });
      toast.success('Application created successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateApplicationDto }) => applicationsApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] });
      toast.success('Application updated successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, rejectionReason }: { id: string; status: ApplicationStatus; rejectionReason?: string }) =>
      applicationsApi.updateStatus(id, status, rejectionReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] });
      toast.success('Application status updated');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => applicationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] });
      toast.success('Application deleted successfully');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useApplicationsByJob(jobId: string, params?: QueryParams) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, 'job', jobId, params],
    queryFn: () => applicationsApi.getByJob(jobId, params),
    enabled: !!jobId,
  });
}
