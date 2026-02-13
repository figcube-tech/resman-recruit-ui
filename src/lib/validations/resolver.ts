import { zodResolver } from '@hookform/resolvers/zod';

// Wrapper to handle Zod v4 + react-hook-form type compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formResolver(schema: any): any {
  return zodResolver(schema);
}
