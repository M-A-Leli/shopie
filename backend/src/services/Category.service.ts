import createError from 'http-errors';
import { Category } from '@prisma/client';
import prisma from '../config/Prisma.config';

class CategoryService {
  async getAllCategories(): Promise<Partial<Category>[]> {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        image_url: true
      }
    });

    if (categories.length === 0) {
      throw createError(404, 'No categories found');
    }

    return categories;
  }

  async getCategoryById(categoryId: string): Promise<Partial<Category> | null> {
    const category = prisma.category.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        name: true,
        image_url: true
      }
    });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    return category;
  }

  async createCategory(data: any): Promise<Partial<Category>> {
    const { name, image_url } = data;
  
    // Convert name to lowercase for case-insensitive comparison
    const lowerCaseName = name.toLowerCase();
  
    // Check if a category with the same name already exists
    const nameExists = await prisma.category.findFirst({
      where: { name: lowerCaseName }
    });
  
    if (nameExists) {
      throw createError(409, 'Category already exists');
    }
  
    // Create a new category
    const newCategory = await prisma.category.create({
      data: {
        name: lowerCaseName,
        image_url
      },
      select: {
        id: true,
        name: true
      }
    });
  
    return newCategory;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Partial<Category> | null> {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        image_url: true
      }
    });

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await prisma.category.findUnique({ 
      where: { id },
      include: {
        products: true,
      } 
    });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const activeCategories = category.products.filter(tour => tour.is_deleted === false);

    if(activeCategories.length > 0) {
      throw createError(400, 'Cannot delete a category wih active products');
    }

    await prisma.category.update({
      where: { id },
      data: { is_deleted: true }
    });
  }
}

export default CategoryService;
