import { Router } from 'express';
import CartController from '../controllers/Cart.controller';

const router = Router();

router.get('/', CartController.getAllCarts); // Get all carts
router.get('/:id', CartController.getCartById); // Get cart by id
router.post('/', CartController.createCart); // Create cart
router.put('/:id', CartController.updateCart); // Update cart
router.delete('/:id', CartController.deleteCart); // Delete cart

router.get('/user/:userId', CartController.getCartsByUserId); // Get carts by user id

export default router;
