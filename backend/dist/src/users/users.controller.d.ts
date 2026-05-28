import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
        name: string;
        id: string;
        email: string;
        phone: string | null;
        passwordHash: string | null;
        role: string;
        profilePicUrl: string | null;
        city: string | null;
        state: string | null;
        isVerified: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
