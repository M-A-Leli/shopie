import createError from 'http-errors';
import { Product, Prisma } from '@prisma/client';
import prisma from '../config/Prisma.config';
import { array } from 'joi';

class ProductService {

  async getAllProducts(): Promise<Partial<Product>[]> {
    const products = await prisma.product.findMany({
      where: {
        is_deleted: false
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        images: {
          where: { is_deleted: false },
          select: {
            id: true,
            url: true,
          }
        }
      }
    });

    if (products.length === 0) {
      throw createError(404, 'No products found');
    }

    return products;
  }

  async getProductById(id: string): Promise<Partial<Product> | null> {
    const product = await prisma.product.findUnique({
      where: { id, is_deleted: false },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        images: {
          where: { is_deleted: false },
          select: {
            id: true,
            url: true,
          }
        }
      }
    });

    if (!product) {
      throw createError(404, 'Product not found');
    }

    return product;
  }

  async createProduct(data: Omit<Prisma.ProductCreateInput, 'id'>, imagePaths: string[]) {
    if (imagePaths.length > 4) {
      throw createError(400, 'A product can have at most 4 images');
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        images: {
          create: imagePaths.map(path => ({
            url: path
          }))
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        images: {
          where: { is_deleted: false },
          select: {
            id: true,
            url: true,
          }
        }
      }
    });
  
    return product;
  }
  
  async updateProduct(id: string, data: Partial<Omit<Prisma.ProductUpdateInput, 'id'>>, imagePaths: string[]) {
    const product = await prisma.product.findUnique({ where: { id, is_deleted: false } });
  
    if (!product) {
      throw createError(404, 'Product not found');
    }
  
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        images: {
          create: imagePaths.map(path => ({
            url: path
          }))
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        images: {
          where: { is_deleted: false },
          select: {
            id: true,
            url: true,
          }
        }
      }
    });
  
    return updatedProduct;
  }
  

  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id, is_deleted: false } });

    if (!product) {
      throw createError(404, 'Product not found');
    }

    await prisma.product.update({
      where: { id },
      data: { is_deleted: true }
    }).catch((error) => {
      // !
      throw createError(500, `Error deleting product: ${error.message}`);
    });
  }

  async getProductsByCategoryId(categoryId: string): Promise<Partial<Product>[]> {
    const category = await prisma.category.findUnique({
      where: { id: categoryId, is_deleted: false },
    });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const products = await prisma.product.findMany({
      where: {
        category_id: categoryId,
        is_deleted: false
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        images: {
          where: { is_deleted: false },
          select: {
            id: true,
            url: true,
          }
        }
      }
    });

    if (products.length === 0) {
      throw createError(404, 'No products found in this category');
    }

    return products;
  }

  async getRelatedProducts(productId: string): Promise<Partial<Product>[]> {
    const product = await prisma.product.findUnique({
      where: { id: productId, is_deleted: false }
    });
  
    if (!product) {
      throw createError(404, 'Product not found');
    }

    // Convert Prisma.Decimal to JavaScript number
    const productPrice = Number(product.price);
  
    const relatedProducts = await prisma.product.findMany({
      where: {
        OR: [
          { category_id: product.category_id },
          { price: { gte: productPrice * 0.8, lte: productPrice * 1.2 } },
        ],
        is_deleted: false,
        id: { not: product.id },
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock_quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        images: {
          where: { is_deleted: false },
          select: {
            id: true,
            url: true,
          }
        }
      },
      take: 4 // Limit to 4 related products
    });
  
    if (relatedProducts.length === 0) {
      throw createError(404, 'No related products found');
    }
  
    return relatedProducts;
  }

  // async searchProducts(query: string): Promise<Partial<Product>[]> {
  //   const products = await prisma.product.findMany({
  //     where: {
  //       is_deleted: false,
  //       OR: [
  //         { name: { contains: query } },
  //         { description: { contains: query } }
  //       ]
  //     },
  //     include: {
  //       category: true,
  //       images: true,
  //       reviews: true
  //     }
  //   });
  
  //   if (products.length === 0) {
  //     throw createError(404, 'No products found matching the query');
  //   }
  
  //   return products;
  // }

  async searchProducts(query: string): Promise<Partial<Product>[]> {
    const searchQuery = query.toLowerCase();
    const products = await prisma.$queryRaw<
      Partial<Product>[]
    >`SELECT * FROM "Products" WHERE "is_deleted" = 0 AND (LOWER("name") LIKE ${`%${searchQuery}%`} OR LOWER("description") LIKE ${`%${searchQuery}%`})`;
  
    if (products.length === 0) {
      throw createError(404, 'No products found matching the query');
    }
  
    return products;
  }
}

export default ProductService;
