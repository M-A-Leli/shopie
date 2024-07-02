import bcrypt from 'bcrypt';
import createError from 'http-errors'
import prisma from '../config/Prisma.config';

class AuthService {
    static async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email, is_deleted: false },
            select: {
                id: true,
                password: true,
                admin: {
                    select: {
                        id: true
                    }
                }
            },
        });
    }

    static async findUserByID(id: string) {
        const user = await prisma.user.findUnique({
            where: { id, is_deleted: false },
            select: {
                id: true,
                password: true,
                admin: {
                    select: {
                        id: true
                    }
                }
            },
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        return user;
    }

    static async validatePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    static async login(email: string, password: string) {
        const user = await this.findUserByEmail(email);

        if (!user) {
            throw createError(401, 'Invalid email or password');
        }

        const isPasswordValid = await this.validatePassword(password, user.password);

        if (!isPasswordValid) {
            throw createError(401, 'Invalid email or password');
        }

        return user;
    }
}

export default AuthService;
