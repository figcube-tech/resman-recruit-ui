'use client';

import { useForm } from 'react-hook-form';
import { formResolver } from '@/lib/validations/resolver';
import { createInterviewSchema, CreateInterviewFormValues } from '@/lib/validations/interview';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import TagInput from '@/components/ui/TagInput';
import { INTERVIEW_TYPE_LABELS } from '@/lib/constants';
import { Interview } from '@/types';
import { Controller } from 'react-hook-form';

interface InterviewFormProps {
  initialData?: Interview;
  onSubmit: (data: CreateInterviewFormValues) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export default function InterviewForm({ initialData, onSubmit, isLoading, onCancel }: InterviewFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateInterviewFormValues>({
    resolver: formResolver(createInterviewSchema),
    defaultValues: initialData
      ? {
          applicationId: initialData.applicationId,
          interviewType: initialData.interviewType,
          scheduledAt: initialData.scheduledAt?.slice(0, 16),
          duration: initialData.duration,
          location: initialData.location || '',
          meetingLink: initialData.meetingLink || '',
          interviewers: initialData.interviewers,
          notes: initialData.notes || '',
        }
      : {
          duration: 60,
          interviewers: [],
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Application ID"
          placeholder="Enter application ID"
          error={errors.applicationId?.message}
          {...register('applicationId')}
        />
        <Select
          label="Interview Type"
          options={Object.entries(INTERVIEW_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="Select type"
          error={errors.interviewType?.message}
          {...register('interviewType')}
        />
        <Input
          label="Scheduled Date & Time"
          type="datetime-local"
          error={errors.scheduledAt?.message}
          {...register('scheduledAt')}
        />
        <Input
          label="Duration (minutes)"
          type="number"
          min={15}
          max={480}
          error={errors.duration?.message}
          {...register('duration')}
        />
        <Input
          label="Location"
          placeholder="Office, Room 301"
          error={errors.location?.message}
          {...register('location')}
        />
        <Input
          label="Meeting Link"
          placeholder="https://meet.google.com/..."
          error={errors.meetingLink?.message}
          {...register('meetingLink')}
        />
      </div>

      <Controller
        name="interviewers"
        control={control}
        render={({ field }) => (
          <TagInput
            label="Interviewers"
            value={field.value}
            onChange={field.onChange}
            placeholder="Type interviewer name and press Enter"
            error={errors.interviewers?.message}
          />
        )}
      />

      <Textarea
        label="Notes"
        placeholder="Additional notes..."
        error={errors.notes?.message}
        {...register('notes')}
      />

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update Interview' : 'Schedule Interview'}
        </Button>
      </div>
    </form>
  );
}
