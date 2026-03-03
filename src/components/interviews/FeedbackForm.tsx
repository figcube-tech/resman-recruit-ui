'use client';

import { useForm } from 'react-hook-form';
import { formResolver } from '@/lib/validations/resolver';
import { feedbackSchema, FeedbackFormValues } from '@/lib/validations/interview';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormValues) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export default function FeedbackForm({ onSubmit, isLoading, onCancel }: FeedbackFormProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: formResolver(feedbackSchema),
    defaultValues: { rating: 0, feedback: '' },
  });

  const currentRating = watch('rating');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setValue('rating', star)}
              className="p-0.5"
            >
              <Star
                className={cn(
                  'h-6 w-6',
                  (hoverRating || currentRating) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
      </div>

      <Textarea
        label="Feedback"
        placeholder="Provide detailed feedback about the interview..."
        rows={5}
        error={errors.feedback?.message}
        {...register('feedback')}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>Submit Feedback</Button>
      </div>
    </form>
  );
}
