import { Router } from 'express';
import ReviewController from '../controllers/Review.controller';

const router = Router();

router.get('/', ReviewController.getAllReviews); // Get all reviews
router.get('/:id', ReviewController.getReviewById); // Get review by id
router.post('/', ReviewController.createReview); // Create review
// router.put('/:id', ReviewController.updateReview); // Update review
router.delete('/:id', ReviewController.deleteReview); // Delete review

router.get('/user/:id', ReviewController.getReviewsByUserId); // Get user's reviews
router.get('/product/:id', ReviewController.getReviewsByProductId); // Get product's reviews

export default router;
