import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import multer from 'multer';
import CategoryService from '../services/Category.service';
import upload from '../utils/ImageUpload.util';

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
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return next(createError(400, err.message));
      } else if (err) {
        return next(createError(400, err.message));
      }

      if (!req.file) {
        return next(createError(400, 'No file uploaded'));
      }

      try {
        const imagePath = req.file.path;
        const newCategory = await this.categoryService.createCategory(req.body, imagePath);
        res.status(201).json(newCategory);
      } catch (error: any) {
        next(error);
      }
    });
  }

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return next(createError(400, err.message));
      } else if (err) {
        return next(createError(400, err.message));
      }

      if (!req.file) {
        return next(createError(400, 'No file uploaded'));
      }

      try {
        const imagePath = req.file.path;
        const updatedCategory = await this.categoryService.updateCategory(req.params.id, req.body, imagePath);
        res.status(201).json(updatedCategory);
      } catch (error: any) {
        next(error);
      }
    });
  }

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

