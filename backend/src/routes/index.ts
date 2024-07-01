import express from 'express';
import AuthRoutes from './Auth.routes';
import AdminRoutes from './Admin.routes';
import CartItemRoutes from './CartItem.routes';
import CategoryRoutes from './Category.routes';
import PasswordResetRoutes from './PasswordReset.routes';
import ProductRoutes from './Product.routes';
import ReviewRoutes from './Review.routes';
import UserRoutes from './User.routes';

const router = express.Router();

// Mount routes
router.use('/auth', AuthRoutes);
router.use('/admins', AdminRoutes);
router.use('/carts', CartItemRoutes);
router.use('/categories', CategoryRoutes);
router.use('/password-reset', PasswordResetRoutes);
router.use('/products', ProductRoutes);
router.use('/reviews', ReviewRoutes);
router.use('/users', UserRoutes);

export default router;
