import { Router } from 'express';
import ProductController from '../controllers/Product.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/', ProductController.getAllProducts); // Get all products
router.get('/:id', ProductController.getProductById); // Get product by id
router.post('/', AuthMiddleware.authorizeAdmin, ProductController.createProduct); // Create product
router.put('/:id', AuthMiddleware.authorizeAdmin, ProductController.updateProduct); // Update product
router.delete('/:id', AuthMiddleware.authorizeAdmin, ProductController.deleteProduct); // Delete product

router.get('/category/:id', ProductController.getProductsByCategoryId); // Get products by category id
router.get('/related-products/:id', ProductController.getRelatedProducts); // Get related products
router.get('/search', ProductController.searchProducts); // Search products

export default router;
