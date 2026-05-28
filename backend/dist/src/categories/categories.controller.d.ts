import { CategoriesService } from './categories.service';
import type { CreateCategoryDto, UpdateCategoryDto } from './dto/category.schema';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
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
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
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
