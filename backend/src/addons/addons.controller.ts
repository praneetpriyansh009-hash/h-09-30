import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { createAddonSchema, updateAddonSchema } from './dto/addon.schema';
import type { CreateAddonDto, UpdateAddonDto } from './dto/addon.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('addons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body(new ZodValidationPipe(createAddonSchema)) data: CreateAddonDto) {
    return this.addonsService.create(data);
  }

  @Public()
  @Get()
  findAll(@Query('categorySlug') categorySlug?: string) {
    return this.addonsService.findAll(categorySlug);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addonsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAddonSchema)) data: UpdateAddonDto,
  ) {
    return this.addonsService.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.addonsService.remove(id);
  }
}
