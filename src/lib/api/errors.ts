import { AxiosError } from 'axios';
import { ApiError } from '@/types';

export function extractApiError(error: unknown): ApiError {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;
    return {
      message: data.message || 'An unexpected error occurred',
      statusCode: error.response.status,
      errors: data.errors,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
}

export function getErrorMessage(error: unknown): string {
  const apiError = extractApiError(error);

  if (apiError.errors) {
    const firstError = Object.values(apiError.errors)[0];
    if (firstError?.length) return firstError[0];
  }

  return apiError.message;
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 404;
}

export function isValidationError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 422;
}

export function isForbiddenError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 403;
}
