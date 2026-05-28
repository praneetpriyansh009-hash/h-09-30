import { z } from 'zod';
export declare const setCommissionSchema: z.ZodObject<{
    rate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    rate: number;
}, {
    rate: number;
}>;
export type SetCommissionDto = z.infer<typeof setCommissionSchema>;
