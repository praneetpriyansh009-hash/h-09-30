import { Controller, Get, Patch, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { setCommissionSchema } from './dto/admin.schema';
import type { SetCommissionDto } from './dto/admin.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('vendors/pending')
  getPendingVendors() {
    return this.adminService.getPendingVendors();
  }

  @Patch('vendors/:id/approve')
  approveVendor(@Request() req: any, @Param('id') id: string) {
    return this.adminService.approveVendor(id, req.user.sub);
  }

  @Patch('vendors/:id/reject')
  rejectVendor(@Request() req: any, @Param('id') id: string) {
    return this.adminService.rejectVendor(id, req.user.sub);
  }

  @Patch('vendors/:id/commission')
  setCommission(
    @Request() req: any,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(setCommissionSchema)) data: SetCommissionDto
  ) {
    return this.adminService.setCommission(id, data.rate, req.user.sub);
  }

  @Get('revenue')
  getRevenueStats() {
    return this.adminService.getRevenueStats();
  }

  @Get('audit-log')
  getAuditLogs(@Query('page') page?: string) {
    return this.adminService.getAuditLogs(page ? parseInt(page, 10) : 1);
  }
}
