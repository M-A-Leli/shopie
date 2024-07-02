import express from 'express';
import AdminRoutes from './Admin.routes';
import AuthRoutes from './Auth.routes';
import CartItemRoutes from './CartItem.routes';
import CategoryRoutes from './Category.routes';
import OrderRoutes from './Order.routes';
import PasswordResetRoutes from './PasswordReset.routes';
import ProductRoutes from './Product.routes';
import ReviewRoutes from './Review.routes';
import UserRoutes from './User.routes';

const router = express.Router();

// Mount routes
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/carts', CartItemRoutes);
router.use('/categories', CategoryRoutes);
router.use('/orders', OrderRoutes);
router.use('/password-reset', PasswordResetRoutes);
router.use('/products', ProductRoutes);
router.use('/reviews', ReviewRoutes);
router.use('/users', UserRoutes);

export default router;
