import { Request, Response, NextFunction } from 'express';
import CategoryService from '../services/Category.service';

class CategoryController {

  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.getCategoryById(req.params.id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = await this.categoryService.createCategory(req.body.category_name);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedCategory = await this.categoryService.updateCategory(req.params.id, req.body);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.categoryService.deleteCategory(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();

