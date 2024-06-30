import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { Admin, Prisma } from '@prisma/client';
import prisma from '../config/Prisma.config';

class AdminService {
  async hashPassword(password: string): Promise<{ hash: string, salt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  async getAllAdmins(): Promise<Partial<Admin>[]> {
    const admins = await prisma.admin.findMany({
      where: {
        is_deleted: false
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            phone_number: true,
          },
        },
      }
    });

    if (admins.length === 0) {
      throw createError(404, 'No admins found');
    }

    return admins;
  }

  async getAdminById(id: string): Promise<Partial<Admin> | null> {
    const admin = await prisma.admin.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            phone_number: true,
          },
        },
      }
    });

    if (!admin) {
      throw createError(404, 'Admin not found');
    }

    return admin;
  }

  async createAdmin(data: any) {
    const {
      username,
      email,
      password,
      phone_number,
      ...adminData
    } = data;

    const emailExists = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (emailExists) {
      throw createError(409, 'Email already exists');
    }

    const usernameExits = await prisma.user.findUnique({
      where: { username: data.username }
    });

    if (usernameExits) {
      throw createError(409, 'Username already exists');
    }

    const phoneNumberExists = await prisma.user.findUnique({
      where: { phone_number: data.phone_number }
    });

    if (phoneNumberExists) {
      throw createError(409, 'Phone number already exists');
    }

    const { hash, salt } = await this.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        salt: salt,
        phone_number,
      },
      select: {
        id: true
      }
    });

    const admin = await prisma.admin.create({
      data: {
        ...adminData,
        id: user.id,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            phone_number: true
          }
        }
      }
    });

    return admin;
  }

  async updateAdmin(id: string, data: any) {
    const {
      username,
      email,
      phone_number,
      ...adminData
    } = data;

    const admin = await prisma.admin.findUnique({ where: { id, is_deleted: false } });

    if (!admin) {
      throw createError(404, 'Admin not found');
    }

    const user = await prisma.user.findUnique({
      where: { id: admin.id },
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

    await prisma.user.update({
      where: { id: admin.id, is_deleted: false },
      data: {
        username,
        email,
        phone_number
      }
    });

    const updatedAdmin = await prisma.admin.update({
      where: { id, is_deleted: false },
      data: adminData,
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            phone_number: true
          }
        }
      }
    });

    return updatedAdmin;
  }

  async deleteAdmin(id: string) {
    const admin = await prisma.admin.findUnique({ where: { id, is_deleted: false } });

    if (!admin) {
      throw createError(404, 'Admin not found');
    }

    const user = await prisma.user.findUnique({ where: { id: admin.id, is_deleted: false } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: { is_deleted: true }
      });

      await tx.admin.update({
        where: { id },
        data: { is_deleted: true }
      });
    }).catch((error) => {
      throw createError(500, `Error deleting admin: ${error.message}`);
    });
  }
}

export default AdminService;
