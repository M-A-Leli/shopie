import { User } from '@prisma/client';
import prisma from '../config/Prisma.config';
import bcrypt from 'bcrypt';
import createError from 'http-errors'

class AuthService {
    async authenticate(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email, is_deleted: false },
            include: {
                admin: true,
            },
        });

        if (!user) {
            throw createError(401, 'Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createError(401, 'Invalid email or password');
        }

        return user;
    }

    // !
    // isAdmin(user: User): boolean {
    //     return user.admin !== null;
    // }

    // isUser(user: User): boolean {
    //     return user.admin === null;
    // }
}

export default AuthService;
