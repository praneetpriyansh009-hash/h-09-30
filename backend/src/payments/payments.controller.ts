import { Controller, Get, Post, Body, Param, UseGuards, Request, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { createOrderSchema, verifyPaymentSchema, createSplitSchema, paySplitSchema } from './dto/payment.schema';
import type { CreateOrderDto, VerifyPaymentDto, CreateSplitDto, PaySplitDto } from './dto/payment.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  createOrder(@Request() req: any, @Body(new ZodValidationPipe(createOrderSchema)) data: CreateOrderDto) {
    return this.paymentsService.createOrder(req.user.sub, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  verifyPayment(@Body(new ZodValidationPipe(verifyPaymentSchema)) data: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(data);
  }

  @Public()
  @Post('webhook')
  webhook(@Headers('x-razorpay-signature') signature: string, @Body() payload: Record<string, unknown>) {
    return this.paymentsService.webhook(payload, signature);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/splits')
  createSplit(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createSplitSchema)) data: CreateSplitDto
  ) {
    return this.paymentsService.createSplit(id, req.user.sub, data);
  }

  @Public()
  @Get('splits/:token')
  getSplitInfo(@Param('token') token: string) {
    return this.paymentsService.getSplitInfo(token);
  }

  @Public()
  @Post('splits/:token/pay')
  paySplit(
    @Param('token') token: string,
    @Body(new ZodValidationPipe(paySplitSchema)) _data: PaySplitDto
  ) {
    return this.paymentsService.paySplit(token);
  }
}
