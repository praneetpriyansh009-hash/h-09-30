import { z } from 'zod';
export declare const replyReviewSchema: z.ZodObject<{
    replyText: z.ZodString;
}, "strip", z.ZodTypeAny, {
    replyText: string;
}, {
    replyText: string;
}>;
export type ReplyReviewDto = z.infer<typeof replyReviewSchema>;
