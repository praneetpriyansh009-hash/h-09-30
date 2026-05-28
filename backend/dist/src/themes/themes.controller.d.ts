import { ThemesService } from './themes.service';
import type { CreateThemeDto, UpdateThemeDto } from './dto/theme.schema';
export declare class ThemesController {
    private readonly themesService;
    constructor(themesService: ThemesService);
    create(createThemeDto: CreateThemeDto): Promise<{
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
    update(id: string, updateThemeDto: UpdateThemeDto): Promise<{
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
