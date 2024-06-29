import { PrismaClient, Cart } from '@prisma/client';
import createError from 'http-errors';

const prisma = new PrismaClient();

class CartService {
  async getAllCarts(): Promise<Cart[]> {
    const carts = await prisma.cart.findMany({
      where: { is_deleted: false },
      include: {
        user: true,
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (carts.length === 0) {
      throw createError(404, 'No carts found');
    }

    return carts;
  }

  async getCartById(id: string): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
      where: { id },
      include: {
        user: true,
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.is_deleted) {
      throw createError(404, 'Cart not found');
    }

    return cart;
  }

  async createCart(data: Omit<Cart, 'id'>): Promise<Cart> {
    const cart = await prisma.cart.create({
      data,
    });

    return cart;
  }

  async updateCart(id: string, data: Partial<Cart>): Promise<Cart> {
    const cart = await prisma.cart.findUnique({
      where: { id },
    });

    if (!cart || cart.is_deleted) {
      throw createError(404, 'Cart not found');
    }

    const updatedCart = await prisma.cart.update({
      where: { id },
      data,
    });

    return updatedCart;
  }

  async deleteCart(id: string): Promise<void> {
    const cart = await prisma.cart.findUnique({
      where: { id },
    });

    if (!cart || cart.is_deleted) {
      throw createError(404, 'Cart not found');
    }

    await prisma.cart.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  async getCartsByUserId(userId: string): Promise<Cart[]> {
    const carts = await prisma.cart.findMany({
      where: { user_id: userId, is_deleted: false },
      include: {
        user: true,
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (carts.length === 0) {
      throw createError(404, 'No carts found for this user');
    }

    return carts;
  }
}

export default CartService;
