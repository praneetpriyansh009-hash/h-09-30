import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
    create(data: {
        name: string;
        email: string;
        passwordHash?: string;
        role?: string;
    }): Promise<User>;
}
