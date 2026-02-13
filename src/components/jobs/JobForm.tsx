'use client';

import { useForm, Controller } from 'react-hook-form';
import { formResolver } from '@/lib/validations/resolver';
import { createJobSchema, CreateJobFormValues } from '@/lib/validations/job';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import TagInput from '@/components/ui/TagInput';
import { JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS, DEPARTMENTS } from '@/lib/constants';
import { Job } from '@/types';

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: CreateJobFormValues) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export default function JobForm({ initialData, onSubmit, isLoading, onCancel }: JobFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateJobFormValues>({
    resolver: formResolver(createJobSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          department: initialData.department,
          location: initialData.location,
          jobType: initialData.jobType,
          experienceLevel: initialData.experienceLevel,
          salaryMin: initialData.salaryMin,
          salaryMax: initialData.salaryMax,
          currency: initialData.currency || 'USD',
          skills: initialData.skills,
          requirements: initialData.requirements,
          responsibilities: initialData.responsibilities,
          benefits: initialData.benefits,
          openPositions: initialData.openPositions,
          applicationDeadline: initialData.applicationDeadline,
        }
      : {
          currency: 'USD',
          openPositions: 1,
          skills: [],
          requirements: [],
          responsibilities: [],
          benefits: [],
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Job Title"
          placeholder="e.g. Senior Software Engineer"
          error={errors.title?.message}
          {...register('title')}
        />
        <Select
          label="Department"
          options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
          placeholder="Select department"
          error={errors.department?.message}
          {...register('department')}
        />
        <Input
          label="Location"
          placeholder="e.g. Remote, New York, NY"
          error={errors.location?.message}
          {...register('location')}
        />
        <Select
          label="Job Type"
          options={Object.entries(JOB_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="Select type"
          error={errors.jobType?.message}
          {...register('jobType')}
        />
        <Select
          label="Experience Level"
          options={Object.entries(EXPERIENCE_LEVEL_LABELS).map(([value, label]) => ({ value, label }))}
          placeholder="Select level"
          error={errors.experienceLevel?.message}
          {...register('experienceLevel')}
        />
        <Input
          label="Open Positions"
          type="number"
          min={1}
          error={errors.openPositions?.message}
          {...register('openPositions')}
        />
        <Input
          label="Minimum Salary"
          type="number"
          placeholder="e.g. 80000"
          error={errors.salaryMin?.message}
          {...register('salaryMin')}
        />
        <Input
          label="Maximum Salary"
          type="number"
          placeholder="e.g. 120000"
          error={errors.salaryMax?.message}
          {...register('salaryMax')}
        />
        <Input
          label="Application Deadline"
          type="date"
          error={errors.applicationDeadline?.message}
          {...register('applicationDeadline')}
        />
      </div>

      <Textarea
        label="Job Description"
        placeholder="Provide a detailed job description..."
        rows={6}
        error={errors.description?.message}
        {...register('description')}
      />

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <TagInput
            label="Required Skills"
            value={field.value}
            onChange={field.onChange}
            placeholder="Type a skill and press Enter"
            error={errors.skills?.message}
          />
        )}
      />

      <Controller
        name="requirements"
        control={control}
        render={({ field }) => (
          <TagInput
            label="Requirements"
            value={field.value}
            onChange={field.onChange}
            placeholder="Add a requirement and press Enter"
            error={errors.requirements?.message}
          />
        )}
      />

      <Controller
        name="responsibilities"
        control={control}
        render={({ field }) => (
          <TagInput
            label="Responsibilities"
            value={field.value}
            onChange={field.onChange}
            placeholder="Add a responsibility and press Enter"
            error={errors.responsibilities?.message}
          />
        )}
      />

      <Controller
        name="benefits"
        control={control}
        render={({ field }) => (
          <TagInput
            label="Benefits"
            value={field.value}
            onChange={field.onChange}
            placeholder="Add a benefit and press Enter"
          />
        )}
      />

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}
