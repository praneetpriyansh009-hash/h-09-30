import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { createBundleSchema, addBundleItemSchema, addBundleAddOnSchema } from './dto/bundle.schema';
import type { CreateBundleDto, AddBundleItemDto, AddBundleAddOnDto } from './dto/bundle.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('bundles')
@UseGuards(JwtAuthGuard)
export class BundlesController {
  constructor(private readonly bundlesService: BundlesService) {}

  @Post()
  create(@Request() req: any, @Body(new ZodValidationPipe(createBundleSchema)) data: CreateBundleDto) {
    return this.bundlesService.create(req.user.sub, data);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.bundlesService.findOne(id, req.user.sub);
  }

  @Post(':id/items')
  addItem(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(addBundleItemSchema)) data: AddBundleItemDto
  ) {
    return this.bundlesService.addItem(id, req.user.sub, data);
  }

  @Delete(':id/items/:itemId')
  removeItem(@Request() req: any, @Param('id') id: string, @Param('itemId') itemId: string) {
    return this.bundlesService.removeItem(id, itemId, req.user.sub);
  }

  @Post(':id/addons')
  addAddOn(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(addBundleAddOnSchema)) data: AddBundleAddOnDto
  ) {
    return this.bundlesService.addAddOn(id, req.user.sub, data);
  }

  @Delete(':id/addons/:addOnId')
  removeAddOn(@Request() req: any, @Param('id') id: string, @Param('addOnId') addOnId: string) {
    return this.bundlesService.removeAddOn(id, addOnId, req.user.sub);
  }

  @Post(':id/checkout')
  checkout(@Request() req: any, @Param('id') id: string) {
    return this.bundlesService.checkout(id, req.user.sub);
  }
}
