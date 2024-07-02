import { Router } from 'express';
import ReviewController from '../controllers/Review.controller';
import AuthMiddleware from '../middleware/Authorization';

const router = Router();

router.get('/', AuthMiddleware.authorizeAdmin, ReviewController.getAllReviews); // Get all reviews
router.get('/:id', AuthMiddleware.authorizeUser, ReviewController.getReviewById); // Get review by id
router.post('/', AuthMiddleware.authorizeUser, ReviewController.createReview); // Create review
// router.put('/:id', AuthMiddleware.authorizeUser, ReviewController.updateReview); // Update review
router.delete('/:id', AuthMiddleware.authorizeUser, ReviewController.deleteReview); // Delete review

router.get('/user/:id', AuthMiddleware.authorizeUser, ReviewController.getReviewsByUserId); // Get user's reviews
router.get('/product/:id', ReviewController.getReviewsByProductId); // Get product's reviews

export default router;
