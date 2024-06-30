import { Router } from 'express';
import UserController from '../controllers/User.controller';

const router = Router();

router.get('/', UserController.getAllUsers); // Get all users
router.get('/:id', UserController.getUserById); // Get user by id
router.post('/', UserController.createUser); // Create user
router.put('/:id', UserController.updateUser); // Update user
router.delete('/:id', UserController.deleteUser); // Delete user

router.get('/profile', UserController.getUserProfile); // Get user profile
router.put('/profile', UserController.updateUserProfile); // Update user profile
router.get('/search', UserController.searchUsers); // Search users

export default router;
