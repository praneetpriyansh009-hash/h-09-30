import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThemeDto, UpdateThemeDto } from './dto/theme.schema';

@Injectable()
export class ThemesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateThemeDto) {
    return this.prisma.theme.create({ data });
  }

  async findAll(occasionType?: string) {
    if (occasionType) {
      // In SQLite, we can search the JSON string for the occasionType
      return this.prisma.theme.findMany({
        where: {
          moodKeywords: {
            contains: occasionType,
          },
        },
        orderBy: { sortOrder: 'asc' },
      });
    }
    return this.prisma.theme.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const theme = await this.prisma.theme.findUnique({ where: { id } });
    if (!theme) {
      throw new NotFoundException(`Theme with ID ${id} not found`);
    }
    return theme;
  }

  async update(id: string, data: UpdateThemeDto) {
    await this.findOne(id);
    return this.prisma.theme.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.theme.delete({ where: { id } });
  }
}
