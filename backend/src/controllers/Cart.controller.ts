import { Request, Response, NextFunction } from 'express';
import CartService from '../services/Cart.service';

class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carts = await this.cartService.getAllCarts();
      res.status(200).json(carts);
    } catch (error: any) {
      next(error);
    }
  }

  getCartById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.getCartById(req.params.id);
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.createCart(req.body);
      res.status(201).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.updateCart(req.params.id, req.body);
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.cartService.deleteCart(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  getCartsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carts = await this.cartService.getCartsByUserId(req.params.userId);
      res.status(200).json(carts);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CartController();
