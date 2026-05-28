import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, Query } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { registerVendorSchema, updateVendorSchema, setAvailabilitySchema } from './dto/vendor.schema';
import type { RegisterVendorDto, UpdateVendorDto, SetAvailabilityDto } from './dto/vendor.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('vendors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post('register')
  register(@Request() req: any, @Body(new ZodValidationPipe(registerVendorSchema)) data: RegisterVendorDto) {
    return this.vendorsService.register(req.user.sub, data);
  }

  @Get('me/dashboard')
  getDashboard(@Request() req: any) {
    return this.vendorsService.getDashboard(req.user.sub);
  }

  @Patch('me')
  updateProfile(@Request() req: any, @Body(new ZodValidationPipe(updateVendorSchema)) data: UpdateVendorDto) {
    return this.vendorsService.updateProfile(req.user.sub, data);
  }

  @Post('me/availability')
  setAvailability(@Request() req: any, @Body(new ZodValidationPipe(setAvailabilitySchema)) data: SetAvailabilityDto) {
    return this.vendorsService.setAvailability(req.user.sub, data);
  }

  @Public()
  @Get()
  findAll(@Query('city') city?: string, @Query('categoryId') categoryId?: string) {
    return this.vendorsService.findAll({ city, categoryId });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }
}
