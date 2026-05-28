import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { WizardService } from './wizard.service';
import { updateSessionSchema, venueFiltersSchema } from './dto/wizard.schema';
import type { UpdateSessionDto } from './dto/wizard.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Public } from '../common/decorators/public.decorator';

@Controller('wizard')
export class WizardController {
  constructor(private readonly wizardService: WizardService) {}

  @Public()
  @Post('session')
  createSession(@Request() req: any) {
    // If user is logged in, attach their userId, otherwise anonymous
    const userId = req.user?.sub;
    return this.wizardService.createSession(userId);
  }

  @Public()
  @Get('session/:key')
  getSession(@Param('key') key: string) {
    return this.wizardService.getSession(key);
  }

  @Public()
  @Patch('session/:key')
  updateSession(
    @Param('key') key: string,
    @Body(new ZodValidationPipe(updateSessionSchema)) data: UpdateSessionDto,
  ) {
    return this.wizardService.updateSession(key, data);
  }

  @Public()
  @Delete('session/:key')
  deleteSession(@Param('key') key: string) {
    return this.wizardService.deleteSession(key);
  }

  @Public()
  @Get('themes')
  getThemes(@Query('occasionType') occasionType?: string) {
    return this.wizardService.getThemes(occasionType);
  }

  @Public()
  @Get('venues')
  getVenues(@Query() query: any) {
    // manual parse since we aren't enforcing strict class-validator
    const filters = venueFiltersSchema.parse(query);
    return this.wizardService.getVenues(filters);
  }

  @Public()
  @Get('addons')
  getAddons(@Query('categorySlug') categorySlug?: string) {
    return this.wizardService.getAddons(categorySlug);
  }

  @Public()
  @Get('transport')
  getTransport(@Query('city') city?: string) {
    return this.wizardService.getTransport(city);
  }
}
