import { Router } from 'express';
import CartItemController from '../controllers/CartItem.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/', AuthMiddleware.authorizeAdmin, CartItemController.getAllCartItems); // Get all cart items
router.get('/:id', AuthMiddleware.authorizeUser, CartItemController.getCartItemById); // Get cart item by id
router.post('/', AuthMiddleware.authorizeUser, CartItemController.createCartItem); // Create cart item
router.put('/:id', AuthMiddleware.authorizeUser, CartItemController.updateCartItem); // Update cart item
router.delete('/:id', AuthMiddleware.authorizeUser, CartItemController.deleteCartItem); // Delete cart item

router.get('/order/:id', AuthMiddleware.authorizeUser, CartItemController.getCartItemsByOrderId); // Get cart items by order id
router.get('/user/:userId', AuthMiddleware.authorizeUser, CartItemController.getPendingCartItemsByUserId); // Get cart items of the user's pending order

export default router;
