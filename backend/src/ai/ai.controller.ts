import { Controller, Post, Body, UseGuards, Request, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('generate-party')
  async generateParty(@Request() req, @Body('prompt') prompt: string) {
    if (req.user.role !== 'PREMIUM' && req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Hookin AI Concierge is only available for Premium users.');
    }

    if (!prompt) {
      throw new BadRequestException('Prompt is required.');
    }

    return await this.aiService.generateParty(prompt);
  }
}
