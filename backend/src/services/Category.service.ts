import createError from 'http-errors';
import { Category, Prisma } from '@prisma/client';
import prisma from '../config/Prisma.config';

const BASE_URL = `http://localhost:3000`;

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

  async createCategory(data: Omit<Prisma.CategoryCreateInput, 'id'>, imagePath: string): Promise<Partial<Category>> {
    const { name } = data;
  
    const lowerCaseName = name.toLowerCase();
  
    const nameExists = await prisma.category.findFirst({
      where: { name: lowerCaseName }
    });
  
    if (nameExists) {
      throw createError(409, 'Category already exists');
    }

    const categoryData = {
      ...data,
      name: lowerCaseName,
      image_url: `/images/${imagePath.split('/').pop()}`,
    }
  
    // Create a new category
    const newCategory = await prisma.category.create({
      data: categoryData,
      select: {
        id: true,
        name: true
      }
    });
  
    return newCategory;
  }

  async updateCategory(id: string, data: Partial<Category>, imagePath: string): Promise<Partial<Category> | null> {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const categoryData = {
      ...data,
      image_url: `/images/${imagePath.split('/').pop()}`,
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: categoryData,
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
