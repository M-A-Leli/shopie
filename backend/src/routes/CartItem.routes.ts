import { Router } from 'express';
import CartItemController from '../controllers/CartItem.controller';

const router = Router();

router.get('/', CartItemController.getAllCartItems); // Get all cart items
router.get('/:id', CartItemController.getCartItemById); // Get cart item by id
router.post('/', CartItemController.createCartItem); // Create cart item
router.put('/:id', CartItemController.updateCartItem); // Update cart item
router.delete('/:id', CartItemController.deleteCartItem); // Delete cart item

router.get('/cart/:cartId', CartItemController.getCartItemsByCartId); // Get cart items by cart id

export default router;
