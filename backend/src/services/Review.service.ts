import { Review } from '@prisma/client';
import createError from 'http-errors';
import prisma from '../config/Prisma.config';

class ReviewService {
  async getAllReviews(): Promise<Partial<Review>[]> {
    const reviews = await prisma.review.findMany({
      where: { is_deleted: false },
      select: {
        id: true,
        rating: true,
        comment: true,
        product_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    if (reviews.length === 0) {
      throw createError(404, 'No reviews found');
    }

    return reviews;
  }

  async getReviewById(id: string): Promise<Partial<Review> | null> {
    const review = await prisma.review.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        rating: true,
        comment: true,
        product_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    if (!review) {
      throw createError(404, 'Review not found');
    }

    return review;
  }

  async createReview(data: Omit<Review, 'id'>): Promise<Partial<Review>> {
    const user = await prisma.user.findFirst({
      where: {
        id: data.user_id
      }
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const product = await prisma.product.findFirst({
      where: {
        id: data.product_id
      }
    });

    if (!product) {
      throw createError(404, 'Product not found');
    }

    const reviewExists = await prisma.review.findFirst({
      where: {
        user_id: data.user_id,
        product_id: data.product_id
      }
    });

    if (reviewExists) {
      throw createError(409, 'Review already exists');
    }

    const newReview = await prisma.review.create({
      data,
      select: {
        id: true,
        rating: true,
        comment: true,
        product_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    return newReview;
  }

  async deleteReview(id: string): Promise<void> {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw createError(404, 'Review not found');
    }

    await prisma.review.update({
      where: { id },
      data: { is_deleted: true }
    });
  }

  async getReviewsByUserId(user_id: string): Promise<Partial<Review>[]> {
    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const reviews = await prisma.review.findMany({
      where: { user_id, is_deleted: false },
      select: {
        id: true,
        rating: true,
        comment: true,
        product_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    if (reviews.length === 0) {
      throw createError(404, 'No reviews found');
    }

    return reviews;
  }

  async getReviewsByProductId(product_id: string): Promise<Partial<Review>[]> {
    const product = await prisma.product.findUnique({ where: { id: product_id } });

    if (!product) {
      throw createError(404, 'Product not found');
    }

    const reviews = await prisma.review.findMany({
      where: { product_id, is_deleted: false },
      select: {
        id: true,
        rating: true,
        comment: true,
        product_id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    if (reviews.length === 0) {
      throw createError(404, 'No reviews found');
    }

    return reviews;
  }

  async searchReviews(query: string): Promise<Partial<Review>[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;

    return prisma.$queryRaw<Review[]>`
      SELECT r.id, r.product_id, r.rating, r.comment, r.created_at, u.user_id, u.username 
      FROM Review r
      JOIN User u ON r.user_id = u.user_id
      WHERE LOWER(r.comment) LIKE ${lowerQuery}
    `;
  }
}

export default ReviewService;
