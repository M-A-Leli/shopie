import { Request, Response, NextFunction } from 'express';
import CartItemService from '../services/CartItem.service';

class CartItemController {
  private cartItemService: CartItemService;

  constructor() {
    this.cartItemService = new CartItemService();
  }

  getAllCartItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartItems = await this.cartItemService.getAllCartItems();
      res.status(200).json(cartItems);
    } catch (error: any) {
      next(error);
    }
  }

  getCartItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartItem = await this.cartItemService.getCartItemById(req.params.id);
      res.status(200).json(cartItem);
    } catch (error: any) {
      next(error);
    }
  }

  createCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id as string;
      const cartItem = await this.cartItemService.createCartItem(req.body, user_id);
      res.status(201).json(cartItem);
    } catch (error: any) {
      next(error);
    }
  }

  updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartItem = await this.cartItemService.updateCartItem(req.params.id, req.body);
      res.status(200).json(cartItem);
    } catch (error: any) {
      next(error);
    }
  }

  deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.cartItemService.deleteCartItem(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  getCartItemsByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartItems = await this.cartItemService.getCartItemsByOrderId(req.params.id);
      res.status(200).json(cartItems);
    } catch (error: any) {
      next(error);
    }
  }

  getPendingCartItemsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id as string;
      const cartItems = await this.cartItemService.getPendingCartItemsByUserId(user_id);
      res.status(200).json(cartItems);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CartItemController();
