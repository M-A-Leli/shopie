import { PrismaClient, Order } from '@prisma/client';
import createError from 'http-errors';
import prisma from '../config/Prisma.config';

enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

class OrderService {
  async getAllOrders(): Promise<Partial<Order>[]> {
    const orders = await prisma.order.findMany({
      where: { is_deleted: false },
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    if (orders.length === 0) {
      throw createError(404, 'No orders found');
    }

    return orders;
  }

  async getOrderById(id: string): Promise<Partial<Order>> {
    const order = await prisma.order.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    if (!order) {
      throw createError(404, 'Order not found');
    }

    return order;
  }

  async createOrder(userId: string): Promise<Partial<Order>> {
    const user = await prisma.user.findUnique({
      where: { id: userId, is_deleted: false }
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    const pendingOrder = await prisma.order.findFirst({
      where: {
        user_id: user.id,
        is_deleted: false,
        status: OrderStatus.PENDING
      }
    });

    if (pendingOrder) {
      throw createError(400, 'There is already a pending order for this user');
    }

    const order = await prisma.order.create({
      data: {
        user_id: user.id,
        total_price: 0, // initial total price
        status: OrderStatus.PENDING
      },
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    return order;
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Partial<Order>> {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order || order.is_deleted) {
      throw createError(404, 'Order not found');
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data,
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order || order.is_deleted) {
      throw createError(404, 'Order not found');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw createError(400, 'Only pending orders can be deleted');
    }

    await prisma.order.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  async getOrdersByUserId(userId: string): Promise<Partial<Order>[]> {
    const orders = await prisma.order.findMany({
      where: { user_id: userId, is_deleted: false },
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    if (orders.length === 0) {
      throw createError(404, 'No orders found for this user');
    }

    return orders;
  }

  async getPendingOrderByUserId(userId: string): Promise<Partial<Order> | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId, is_deleted: false }
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    const pendingOrder = await prisma.order.findFirst({
      where: {
        user_id: userId,
        status: OrderStatus.PENDING,
        is_deleted: false
      },
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    if (!pendingOrder) {
      throw createError(404, 'No pending order found for this user');
    }

    return pendingOrder;
  }

  async checkoutOrderByUserId(userId: string): Promise<Partial<Order>> {
    const user = await prisma.user.findUnique({
      where: { id: userId, is_deleted: false }
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    const pendingOrder = await prisma.order.findFirst({
      where: {
        user_id: user.id,
        status: OrderStatus.PENDING,
        is_deleted: false
      },
      include: {
        cart_items: true
      }
    });

    if (!pendingOrder) {
      throw createError(404, 'No pending order found for this user');
    }

    if (pendingOrder.cart_items.length === 0) {
      throw createError(400, 'Cannot checkout an order with no items');
    }

    const updatedOrder = await prisma.order.update({
      where: { id: pendingOrder.id },
      data: {
        status: OrderStatus.COMPLETED,
        updated_at: new Date()
      },
      select: {
        id: true,
        user_id: true,
        total_price: true,
        status: true,
        updated_at: true
      }
    });

    return updatedOrder;
  }
}

export default OrderService;
