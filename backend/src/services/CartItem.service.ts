import { PrismaClient, CartItem } from '@prisma/client';
import createError from 'http-errors';

const prisma = new PrismaClient();

class CartItemService {
  async getAllCartItems(): Promise<CartItem[]> {
    const cartItems = await prisma.cartItem.findMany({
      where: { is_deleted: false },
      include: {
        product: true,
        cart: true,
      },
    });

    if (cartItems.length === 0) {
      throw createError(404, 'No cart items found');
    }

    return cartItems;
  }

  async getCartItemById(id: string): Promise<CartItem | null> {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        product: true,
        cart: true,
      },
    });

    if (!cartItem || cartItem.is_deleted) {
      throw createError(404, 'Cart item not found');
    }

    return cartItem;
  }

  async createCartItem(data: Omit<CartItem, 'id'>): Promise<CartItem> {
    const cartItem = await prisma.cartItem.create({
      data,
    });

    return cartItem;
  }

  async updateCartItem(id: string, data: Partial<CartItem>): Promise<CartItem> {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    });

    if (!cartItem || cartItem.is_deleted) {
      throw createError(404, 'Cart item not found');
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data,
    });

    return updatedCartItem;
  }

  async deleteCartItem(id: string): Promise<void> {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    });

    if (!cartItem || cartItem.is_deleted) {
      throw createError(404, 'Cart item not found');
    }

    await prisma.cartItem.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: cartId, is_deleted: false },
      include: {
        product: true,
        cart: true,
      },
    });

    if (cartItems.length === 0) {
      throw createError(404, 'No cart items found for this cart');
    }

    return cartItems;
  }
}

export default CartItemService;
