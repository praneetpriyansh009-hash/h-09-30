import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { createThemeSchema, updateThemeSchema } from './dto/theme.schema';
import type { CreateThemeDto, UpdateThemeDto } from './dto/theme.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('themes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body(new ZodValidationPipe(createThemeSchema)) createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
  }

  @Public()
  @Get()
  findAll(@Query('occasionType') occasionType?: string) {
    return this.themesService.findAll(occasionType);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateThemeSchema)) updateThemeDto: UpdateThemeDto,
  ) {
    return this.themesService.update(id, updateThemeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.themesService.remove(id);
  }
}
