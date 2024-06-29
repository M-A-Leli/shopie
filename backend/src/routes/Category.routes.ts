import { Router } from 'express';
import CategoryController from '../controllers/Category.controller';

const router = Router();

router.get('/', CategoryController.getAllCategories); // Get all categories
router.get('/:id', CategoryController.getCategoryById); // Get category by id
router.post('/', CategoryController.createCategory); // Create category
router.put('/:id', CategoryController.updateCategory); // Update category
router.delete('/:id', CategoryController.deleteCategory); // Delete category

export default router;
