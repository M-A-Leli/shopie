import { Router } from 'express';
import CartItemController from '../controllers/CartItem.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/user', AuthMiddleware.authorizeUser, CartItemController.getPendingCartItemsByUserId); // Get cart items of the user's pending order
router.get('/', AuthMiddleware.authorizeAdmin, CartItemController.getAllCartItems); // Get all cart items
router.post('/', AuthMiddleware.authorizeUser, CartItemController.createCartItem); // Create cart item
router.get('/:id', AuthMiddleware.authorizeUser, CartItemController.getCartItemById); // Get cart item by id
router.put('/:id', AuthMiddleware.authorizeUser, CartItemController.updateCartItem); // Update cart item
router.delete('/:id', AuthMiddleware.authorizeUser, CartItemController.deleteCartItem); // Delete cart item

router.get('/order/:id', AuthMiddleware.authorizeUser, CartItemController.getCartItemsByOrderId); // Get cart items by order id

export default router;
