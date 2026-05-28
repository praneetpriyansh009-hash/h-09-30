import { z } from 'zod';

export const sendMessageSchema = z.object({
  content: z.string().min(1).max(2000),
});
export type SendMessageDto = z.infer<typeof sendMessageSchema>;
