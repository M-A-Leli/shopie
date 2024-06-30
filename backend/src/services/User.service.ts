import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import prisma from '../config/Prisma.config';
import sendEmail from '../utils/Email.util';

class UserService {
  async hashPassword(password: string): Promise<{ hash: string, salt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    const users = await prisma.user.findMany({
      where: { is_deleted: false },
      select: {
        id: true,
        username: true,
        email: true,
        phone_number: true
      }
    });

    if (users.length === 0) {
      throw createError(404, 'No users found');
    }

    return users;
  }

  async getUserById(id: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        username: true,
        email: true,
        phone_number: true
      }
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    return user;
  }

  async createUser(data: Omit<User, 'id'>): Promise<Partial<User>> {
    // Check if the email exists, including soft-deleted users
    const existingUserWithEmail = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    });

    if (existingUserWithEmail) {
      if (existingUserWithEmail.is_deleted === true) {
        // User exists but is soft-deleted, restore the account
        const restoredUser = await this.updateUser(existingUserWithEmail.id, {
          ...data,
          is_deleted: false
        });

        if (!restoredUser) {
          throw createError(500, 'Failed to restore user');
        }

        return restoredUser as Partial<User>;
      } else {
        // User exists and is active, throw conflict error
        throw createError(409, 'Email already exists');
      }
    }

    const existingUserWithUsername = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUserWithUsername) {
      throw createError(409, 'Username already exists');
    }

    const existingUserWithPhoneNumber = await prisma.user.findUnique({
      where: { phone_number: data.phone_number as string },
    });

    if (existingUserWithPhoneNumber) {
      throw createError(409, 'Phone number already exists');
    }

    const { hash, salt } = await this.hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hash,
        salt: salt,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone_number: true
      }
    });

    // Send welcome email
    await sendEmail({
      to: newUser.email,
      subject: 'Welcome to Our Service!',
      template: 'Welcome',
      context: { name: newUser.username, email: newUser.email }
    });

    return newUser;
  }

  async updateUser(id: string, data: Partial<User>): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    if (data.email) {
      const existingUserWithEmail = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: user.id },
        },
      });

      if (existingUserWithEmail) {
        throw createError(409, 'Email already exists');
      }
    }

    if (data.username) {
      const existingUserWithUsername = await prisma.user.findFirst({
        where: {
          username: data.username,
          id: { not: user.id },
        },
      });

      if (existingUserWithUsername) {
        throw createError(409, 'Username already exists');
      }
    }

    if (data.phone_number) {
      const existingUserWithPhoneNumber = await prisma.user.findFirst({
        where: {
          phone_number: data.phone_number,
          id: { not: user.id },
        },
      });

      if (existingUserWithPhoneNumber) {
        throw createError(409, 'Phone number already exists');
      }
    }

    if (data.password) {
      const { hash, salt } = await this.hashPassword(data.password);
      data.password = hash;
      data.salt = salt;
    }

    const updatedUser = await prisma.user.update({
      where: { id, is_deleted: false },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        phone_number: true
      }
    });

    if (!updatedUser) {
      throw createError(404, 'User not found');
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id, is_deleted: false }
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    await prisma.user.update({
      where: { id },
      data: { is_deleted: true }
    });
  }

  async getUserProfile(id: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        username: true,
        email: true,
        phone_number: true
      }
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    return user;
  }

  async updateUserProfile(id: string, data: Partial<User>): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    if (data.email) {
      const existingUserWithEmail = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: user.id },
        },
      });

      if (existingUserWithEmail) {
        throw createError(409, 'Email already exists');
      }
    }

    if (data.username) {
      const existingUserWithUsername = await prisma.user.findFirst({
        where: {
          username: data.username,
          id: { not: user.id },
        },
      });

      if (existingUserWithUsername) {
        throw createError(409, 'Username already exists');
      }
    }

    if (data.phone_number) {
      const existingUserWithPhoneNumber = await prisma.user.findFirst({
        where: {
          phone_number: data.phone_number,
          id: { not: user.id },
        },
      });

      if (existingUserWithPhoneNumber) {
        throw createError(409, 'Phone number already exists');
      }
    }

    if (data.password) {
      const { hash, salt } = await this.hashPassword(data.password);
      data.password = hash;
      data.salt = salt;
    }

    const updatedProfile = await prisma.user.update({
      where: { id, is_deleted: false },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        phone_number: true
      }
    });

    return updatedProfile;
  }

  async searchUsers(query: string): Promise<User[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;

    const users = await prisma.$queryRaw<User[]>`
      SELECT * FROM User 
      WHERE (LOWER(username) LIKE ${lowerQuery} 
      OR LOWER(email) LIKE ${lowerQuery})
      AND deleted_at IS NULL
    `;

    if (users.length === 0) {
      throw createError(404, 'No users found matching the query');
    }

    return users;
  }
}

export default UserService;
