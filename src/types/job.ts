export type JobStatus = 'draft' | 'open' | 'closed' | 'on_hold' | 'cancelled';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'temporary';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: JobStatus;
  openPositions: number;
  applicationDeadline?: string;
  postedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CreateJobDto {
  title: string;
  description: string;
  department: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  openPositions: number;
  applicationDeadline?: string;
}

export interface UpdateJobDto extends Partial<CreateJobDto> {
  status?: JobStatus;
}

export interface JobFilters {
  status?: JobStatus;
  department?: string;
  jobType?: JobType;
  experienceLevel?: ExperienceLevel;
  location?: string;
}
