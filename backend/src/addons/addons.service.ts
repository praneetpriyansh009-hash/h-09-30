import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddonDto, UpdateAddonDto } from './dto/addon.schema';

@Injectable()
export class AddonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAddonDto) {
    return this.prisma.addOnCatalogItem.create({ data });
  }

  async findAll(categorySlug?: string) {
    const where = categorySlug ? { categorySlug, isActive: true } : { isActive: true };
    return this.prisma.addOnCatalogItem.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const addon = await this.prisma.addOnCatalogItem.findUnique({ where: { id } });
    if (!addon) {
      throw new NotFoundException(`Addon with ID ${id} not found`);
    }
    return addon;
  }

  async update(id: string, data: UpdateAddonDto) {
    await this.findOne(id);
    return this.prisma.addOnCatalogItem.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.addOnCatalogItem.delete({ where: { id } });
  }
}
