import { z } from 'zod';

export const demoUsers = [
  { id: 'lauren', name: 'Lauren' },
  { id: 'alex', name: 'Alex' },
  { id: 'jordan', name: 'Jordan' },
  { id: 'maya', name: 'Maya' },
  { id: 'sam', name: 'Sam' }
] as const;

export const celebrationSchema = z.object({
  userId: z.enum(['lauren', 'alex', 'jordan', 'maya', 'sam']),
  message: z.string().trim().min(1).max(140),
  location: z.string().trim().min(1).max(100)
});

export const celebrationsSchema = z.array(celebrationSchema).superRefine((celebrations, context) => {
  const ids = new Set(celebrations.map((celebration) => celebration.userId));
  if (ids.size !== celebrations.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'Duplicate celebrations for a demo user.' });
  }
});

export type Celebration = z.infer<typeof celebrationSchema>;
export type DemoUserId = Celebration['userId'];
export const celebrationsStorageKey = 'phewbar-demo-celebrations-v1';
export const demoArea = 'Pacific Beach, San Diego';

export function areFriends(first: DemoUserId, second: DemoUserId): boolean {
  return first !== second;
}
