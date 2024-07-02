import { Router } from 'express';
import UserController from '../controllers/User.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/', AuthMiddleware.authorizeAdmin, UserController.getAllUsers); // Get all users
router.get('/:id', AuthMiddleware.authorizeAdmin, UserController.getUserById); // Get user by id
router.post('/', UserController.createUser); // Create user
router.put('/:id', AuthMiddleware.authorizeAdmin, UserController.updateUser); // Update user
router.delete('/:id', AuthMiddleware.authorizeUser, UserController.deleteUser); // Delete user

router.get('/profile', AuthMiddleware.authorizeUser, UserController.getUserProfile); // Get user profile
router.put('/profile', AuthMiddleware.authorizeUser, UserController.updateUserProfile); // Update user profile
router.get('/search', AuthMiddleware.authorizeAdmin, UserController.searchUsers); // Search users

export default router;
