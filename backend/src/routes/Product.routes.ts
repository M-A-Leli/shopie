import { Router } from 'express';
import ProductController from '../controllers/Product.controller';

const router = Router();

router.get('/', ProductController.getAllProducts); // Get all products
router.get('/:id', ProductController.getProductById); // Get product by id
router.post('/', ProductController.createProduct); // Create product
router.put('/:id', ProductController.updateProduct); // Update product
router.delete('/:id', ProductController.deleteProduct); // Delete product

router.get('/category/:id', ProductController.getProductsByCategoryId); // Get product by category id
router.get('/related-products/:id', ProductController.getRelatedProducts); // Get related products
router.get('/search', ProductController.searchProducts); // Search products

export default router;
