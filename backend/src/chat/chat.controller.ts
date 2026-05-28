import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { sendMessageSchema } from './dto/chat.schema';
import type { SendMessageDto } from './dto/chat.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('bundles/:bundleId/vendor/:vendorId')
  getThread(@Request() req: any, @Param('bundleId') bundleId: string, @Param('vendorId') vendorId: string) {
    return this.chatService.getThread(bundleId, vendorId, req.user.sub, req.user.role);
  }

  @Post('bundles/:bundleId/vendor/:vendorId')
  sendMessage(
    @Request() req: any,
    @Param('bundleId') bundleId: string,
    @Param('vendorId') vendorId: string,
    @Body(new ZodValidationPipe(sendMessageSchema)) data: SendMessageDto
  ) {
    return this.chatService.sendMessage(bundleId, vendorId, req.user.sub, req.user.role, data);
  }

  @Patch('messages/:id/read')
  markAsRead(@Request() req: any, @Param('id') id: string) {
    return this.chatService.markAsRead(id, req.user.sub, req.user.role);
  }
}
