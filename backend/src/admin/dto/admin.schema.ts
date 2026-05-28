import { z } from 'zod';

export const setCommissionSchema = z.object({
  rate: z.number().min(0).max(1),
});
export type SetCommissionDto = z.infer<typeof setCommissionSchema>;
