import { CartItem, Prisma } from '@prisma/client';
import createError from 'http-errors';
import prisma from '../config/Prisma.config';

enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

interface CartItemWithProduct extends Partial<CartItem> {
  product: {
    id: string;
    name: string,
    price: Prisma.Decimal;
    images: { id: string; url: string }[];
  };
}

class CartItemService {
  async getAllCartItems(): Promise<Partial<CartItem>[]> {
    const cartItems = await prisma.cartItem.findMany({
      where: { is_deleted: false },
      select: {
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              select: {
                id: true,
                url: true
              }
            }
          }
        },
        order_id: true,
        subtotal: true
      }
    });

    if (cartItems.length === 0) {
      throw createError(404, 'No cart items found');
    }

    return cartItems;
  }

  async getCartItemById(id: string): Promise<Partial<CartItem> | null> {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id, is_deleted: false },
      select: {
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              select: {
                id: true,
                url: true
              }
            }
          }
        },
        order_id: true,
        subtotal: true
      }
    });

    if (!cartItem) {
      throw createError(404, 'Cart item not found');
    }

    return cartItem;
  }

  async createCartItem(data: Omit<CartItem, 'id'>, userId: string): Promise<CartItemWithProduct> {
    const user = await prisma.user.findUnique({
      where: { id: userId, is_deleted: false }
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    const product = await prisma.product.findUnique({
      where: { id: data.product_id, is_deleted: false },
      select: {
        id: true,
        name: true,
        price: true,
        stock_quantity: true,
        images: {
          select: {
            id: true,
            url: true
          }
        }
      }
    });

    if (!product) {
      throw createError(404, "Product not found");
    }

    if (product.stock_quantity === 0) {
      throw createError(400, "Product out of stock");
    }

    const pendingOrder = await prisma.order.findFirst({
      where: {
        user_id: user.id,
        is_deleted: false,
        status: OrderStatus.PENDING
      }
    });

    let cartItem;

    if (!pendingOrder) {
      const [newOrder, newCartItem] = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
          data: {
            user_id: user.id,
            total_price: product.price
          }
        });

        const createdCartItem = await tx.cartItem.create({
          data: {
            quantity: 1,
            product_id: product.id,
            subtotal: product.price,
            order_id: createdOrder.id
          }
        });

        return [createdOrder, createdCartItem];
      });

      cartItem = newCartItem;
    } else {
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          product_id: data.product_id,
          order_id: pendingOrder.id
        }
      });

      if (existingCartItem) {
        const [updatedCartItem, updatedOrder] = await prisma.$transaction(async (tx) => {
          const updatedItem = await tx.cartItem.update({
            where: { id: existingCartItem.id },
            data: {
              quantity: existingCartItem.quantity + 1,
              subtotal: new Prisma.Decimal(existingCartItem.subtotal.toNumber() + product.price.toNumber())
            }
          });

          const updatedOrd = await tx.order.update({
            where: { id: pendingOrder.id },
            data: {
              total_price: new Prisma.Decimal(pendingOrder.total_price.toNumber() + product.price.toNumber())
            }
          });

          return [updatedItem, updatedOrd];
        });

        cartItem = updatedCartItem;
      } else {
        const [newCartItem, updatedOrder] = await prisma.$transaction(async (tx) => {
          const createdItem = await tx.cartItem.create({
            data: {
              quantity: 1,
              product_id: product.id,
              order_id: pendingOrder.id,
              subtotal: product.price
            }
          });

          const updatedOrd = await tx.order.update({
            where: { id: pendingOrder.id },
            data: {
              total_price: new Prisma.Decimal(pendingOrder.total_price.toNumber() + product.price.toNumber())
            }
          });

          return [createdItem, updatedOrd];
        });

        cartItem = newCartItem;
      }
    }

    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images
      },
      order_id: cartItem.order_id,
      subtotal: cartItem.subtotal
    };
  }

  async updateCartItem(id: string, data: Partial<CartItem>): Promise<CartItemWithProduct> {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id, is_deleted: false },
      select: { 
        id: true,
        quantity: true,
        product_id: true,
        order_id: true,
        subtotal: true,
        order: {
          select: {
            total_price: true
          }
        } 
      }
    });

    if (!cartItem) {
      throw createError(404, 'Cart item not found');
    }

    const product = await prisma.product.findUnique({
      where: { id: cartItem.product_id, is_deleted:false },
      select: {
        id: true,
        name: true,
        price: true,
        stock_quantity: true,
        images: {
          select: {
            id: true,
            url: true
          }
        }
      }
    });

    if (!product) {
      throw createError(404, 'Product not found');
    }

    if (product.stock_quantity === 0) {
      throw createError(400, "Product out of stock");
    }

    const newSubtotal = data.quantity ? new Prisma.Decimal(data.quantity * product.price.toNumber()) : cartItem.subtotal;
    const updatedCartItem = await prisma.$transaction(async (tx) => {
      const updatedItem = await tx.cartItem.update({
        where: { id },
        data: {
          ...data,
          subtotal: newSubtotal
        }
      });

      const updatedOrder = await tx.order.update({
        where: { id: cartItem.order_id },
        data: {
          total_price: new Prisma.Decimal(cartItem.order.total_price.toNumber() - cartItem.subtotal.toNumber() + newSubtotal.toNumber())
        }
      });

      return updatedItem;
    });

    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images
      },
      order_id: cartItem.order_id,
      subtotal: cartItem.subtotal
    };
  }

  async deleteCartItem(id: string): Promise<void> {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { order: true }
    });

    if (!cartItem || cartItem.is_deleted) {
      throw createError(404, 'Cart item not found');
    }

    if (cartItem.order.status !== OrderStatus.PENDING) {
      throw createError(400, 'Cannot delete cart items from a non-pending order');
    }

    await prisma.$transaction(async (tx) => {
      await tx.cartItem.update({
        where: { id },
        data: { is_deleted: true }
      });

      await tx.order.update({
        where: { id: cartItem.order_id },
        data: {
          total_price: new Prisma.Decimal(cartItem.order.total_price.toNumber() - cartItem.subtotal.toNumber())
        }
      });
    });
  }

  async getCartItemsByOrderId(orderId: string): Promise<Partial<CartItem>[]> {
    const cartItems = await prisma.cartItem.findMany({
      where: { order_id: orderId, is_deleted: false },
      select: {
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              select: {
                id: true,
                url: true
              }
            }
          }
        },
        order_id: true,
        subtotal: true
      }
    });

    if (cartItems.length === 0) {
      throw createError(404, 'No cart items found for this order');
    }

    return cartItems;
  }

  async getPendingCartItemsByUserId(userId: string): Promise<Partial<CartItem>[]> {
    const order = await prisma.order.findFirst({
      where: { user_id: userId, status: OrderStatus.PENDING, is_deleted: false }
    });

    if (!order) {
      throw createError(404, 'No pending order found for this user');
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { id: order.id, is_deleted: false },
      select: {
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              select: {
                id: true,
                url: true
              }
            }
          }
        },
        order_id: true,
        subtotal: true
      }
    });

    if (cartItems.length === 0) {
      throw createError(404, 'No cart items found for this order');
    }

    return cartItems;
  }
}

export default CartItemService;
