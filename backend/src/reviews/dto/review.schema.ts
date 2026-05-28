import { z } from 'zod';

export const replyReviewSchema = z.object({
  replyText: z.string().min(5),
});
export type ReplyReviewDto = z.infer<typeof replyReviewSchema>;
