import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { createServiceSchema, updateServiceSchema } from './dto/service.schema';
import type { CreateServiceDto, UpdateServiceDto } from './dto/service.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles('VENDOR')
  create(@Request() req: any, @Body(new ZodValidationPipe(createServiceSchema)) data: CreateServiceDto) {
    return this.servicesService.create(req.user.sub, data);
  }

  @Public()
  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('city') city?: string,
    @Query('themeId') themeId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('guests') guests?: string,
  ) {
    return this.servicesService.findAll({
      categoryId,
      city,
      themeId,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      guests: guests ? parseInt(guests, 10) : undefined,
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @Roles('VENDOR')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateServiceSchema)) data: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, req.user.sub, data);
  }

  @Delete(':id')
  @Roles('VENDOR')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.servicesService.remove(id, req.user.sub);
  }
}
