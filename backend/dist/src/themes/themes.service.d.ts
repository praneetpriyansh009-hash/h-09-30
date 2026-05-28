import { PrismaService } from '../prisma/prisma.service';
import { CreateThemeDto, UpdateThemeDto } from './dto/theme.schema';
export declare class ThemesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateThemeDto): Promise<{
        name: string;
        id: string;
        slug: string;
        description: string;
        coverImageUrl: string;
        moodKeywords: string;
        isActive: boolean;
        sortOrder: number;
    }>;
    findAll(occasionType?: string): Promise<{
        name: string;
        id: string;
        slug: string;
        description: string;
        coverImageUrl: string;
        moodKeywords: string;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        slug: string;
        description: string;
        coverImageUrl: string;
        moodKeywords: string;
        isActive: boolean;
        sortOrder: number;
    }>;
    update(id: string, data: UpdateThemeDto): Promise<{
        name: string;
        id: string;
        slug: string;
        description: string;
        coverImageUrl: string;
        moodKeywords: string;
        isActive: boolean;
        sortOrder: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        slug: string;
        description: string;
        coverImageUrl: string;
        moodKeywords: string;
        isActive: boolean;
        sortOrder: number;
    }>;
}
