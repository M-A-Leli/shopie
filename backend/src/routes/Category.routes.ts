import { Router } from 'express';
import CategoryController from '../controllers/Category.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/', CategoryController.getAllCategories); // Get all categories
router.post('/', AuthMiddleware.authorizeAdmin, CategoryController.createCategory); // Create category
router.get('/:id', AuthMiddleware.authorizeAdmin, CategoryController.getCategoryById); // Get category by id
router.put('/:id', AuthMiddleware.authorizeAdmin, CategoryController.updateCategory); // Update category
router.delete('/:id', AuthMiddleware.authorizeAdmin, CategoryController.deleteCategory); // Delete category

export default router;
