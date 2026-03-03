'use client';

import { useForm, Controller } from 'react-hook-form';
import { formResolver } from '@/lib/validations/resolver';
import { createCandidateSchema, CreateCandidateFormValues } from '@/lib/validations/candidate';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import TagInput from '@/components/ui/TagInput';
import { CANDIDATE_SOURCE_LABELS } from '@/lib/constants';
import { Candidate } from '@/types';

interface CandidateFormProps {
  initialData?: Candidate;
  onSubmit: (data: CreateCandidateFormValues) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export default function CandidateForm({ initialData, onSubmit, isLoading, onCancel }: CandidateFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCandidateFormValues>({
    resolver: formResolver(createCandidateSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          email: initialData.email,
          phone: initialData.phone || '',
          location: initialData.location || '',
          currentTitle: initialData.currentTitle || '',
          currentCompany: initialData.currentCompany || '',
          experienceYears: initialData.experienceYears,
          skills: initialData.skills,
          resumeUrl: initialData.resumeUrl || '',
          linkedinUrl: initialData.linkedinUrl || '',
          portfolioUrl: initialData.portfolioUrl || '',
          source: initialData.source,
          notes: initialData.notes || '',
          tags: initialData.tags,
        }
      : {
          skills: [],
          tags: [],
          source: 'website',
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input label="First Name" placeholder="John" error={errors.firstName?.message} {...register('firstName')} />
        <Input label="Last Name" placeholder="Doe" error={errors.lastName?.message} {...register('lastName')} />
        <Input label="Email" type="email" placeholder="john@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" placeholder="+1 (555) 000-0000" error={errors.phone?.message} {...register('phone')} />
        <Input label="Location" placeholder="New York, NY" error={errors.location?.message} {...register('location')} />
        <Select
          label="Source"
          options={Object.entries(CANDIDATE_SOURCE_LABELS).map(([value, label]) => ({ value, label }))}
          error={errors.source?.message}
          {...register('source')}
        />
        <Input label="Current Title" placeholder="Software Engineer" error={errors.currentTitle?.message} {...register('currentTitle')} />
        <Input label="Current Company" placeholder="Acme Corp" error={errors.currentCompany?.message} {...register('currentCompany')} />
        <Input label="Years of Experience" type="number" min={0} error={errors.experienceYears?.message} {...register('experienceYears')} />
        <Input label="Resume URL" placeholder="https://..." error={errors.resumeUrl?.message} {...register('resumeUrl')} />
        <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/..." error={errors.linkedinUrl?.message} {...register('linkedinUrl')} />
        <Input label="Portfolio URL" placeholder="https://..." error={errors.portfolioUrl?.message} {...register('portfolioUrl')} />
      </div>

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <TagInput label="Skills" value={field.value} onChange={field.onChange} placeholder="Type a skill and press Enter" error={errors.skills?.message} />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TagInput label="Tags" value={field.value} onChange={field.onChange} placeholder="Add tags..." />
        )}
      />

      <Textarea label="Notes" placeholder="Additional notes about the candidate..." error={errors.notes?.message} {...register('notes')} />

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update Candidate' : 'Add Candidate'}</Button>
      </div>
    </form>
  );
}
