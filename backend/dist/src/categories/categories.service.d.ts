import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.schema';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        slug: string;
        iconUrl: string;
        description: string;
        defaultCommissionRate: number;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        slug: string;
        iconUrl: string;
        description: string;
        defaultCommissionRate: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        slug: string;
        iconUrl: string;
        description: string;
        defaultCommissionRate: number;
    }>;
    update(id: string, data: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        slug: string;
        iconUrl: string;
        description: string;
        defaultCommissionRate: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        slug: string;
        iconUrl: string;
        description: string;
        defaultCommissionRate: number;
    }>;
}
