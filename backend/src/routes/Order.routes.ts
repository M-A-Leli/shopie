import { Router } from 'express';
import OrderController from '../controllers/Order.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/', AuthMiddleware.authorizeAdmin, OrderController.getAllOrders); // Get all orders
router.get('/:id', AuthMiddleware.authorizeUser, OrderController.getOrderById); // Get order by id
router.post('/', AuthMiddleware.authorizeUser, OrderController.createOrder); // Create order
router.put('/:id', AuthMiddleware.authorizeUser, OrderController.updateOrder); // Update order
router.delete('/:id', AuthMiddleware.authorizeUser, OrderController.deleteOrder); // Delete order

router.get('/user/:userId', AuthMiddleware.authorizeUser, OrderController.getOrdersByUserId); // Get orders by user id
router.get('/user/:userId/pending', AuthMiddleware.authorizeUser, OrderController.getPendingOrderByUserId); // Get user's pending order
router.post('/user/:userId/checkout', AuthMiddleware.authorizeUser, OrderController.checkoutOrderByUserId); // Checkout user's pending order

export default router;
