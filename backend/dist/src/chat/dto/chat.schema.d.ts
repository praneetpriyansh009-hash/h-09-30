import { z } from 'zod';
export declare const sendMessageSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export type SendMessageDto = z.infer<typeof sendMessageSchema>;
