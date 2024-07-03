import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import upload from '../utils/ImageUpload.util';
import ProductService from '../services/Product.service';

class ProductController {

  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err) {
        return next(createError(400, err.message));
      }
  
      // Check if req.files is defined and contains files
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return next(createError(400, 'No files uploaded'));
      }
  
      try {
        const imagePaths = (req.files as Express.Multer.File[]).map(file => file.path);
        const newProduct = await this.productService.createProduct(req.body, imagePaths);
        res.status(201).json(newProduct);
      } catch (error) {
        // console.error('Error creating product:', error);
        next(createError(500, 'Failed to create product'));
      }
    });
  }
  
    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body)
      upload(req, res, async (err) => {
        if (err) {
          return next(createError(400, err.message));
        }
  
        try {
          const imagePaths = (req.files as Express.Multer.File[]).map(file => file.path);
          const updatedProduct = await this.productService.updateProduct(req.params.id, req.body, imagePaths);
          res.json(updatedProduct);
        } catch (error) {
          next(error);
        }
      });
    }

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.productService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  getProductsByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = req.params.id;
      const products = await this.productService.getProductsByCategoryId(categoryId);
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  getRelatedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product_id = req.params.id;
      const products = await this.productService.getRelatedProducts(product_id);
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }
  
  getFeaturedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getFeaturedProducts();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  getNewArrivals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getNewArrivals();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  getSpecialOffers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getSpecialOffers();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.q as string;
      const products = await this.productService.searchProducts(query);
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new ProductController();
