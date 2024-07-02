import { Request, Response, NextFunction } from 'express';
import ReviewService from '../services/Review.service';

class ReviewController {

  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await this.reviewService.getReviewById(req.params.id);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }

  createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReview = await this.reviewService.createReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  }

  deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.reviewService.deleteReview(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  getReviewsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id as string;
      const reviews = await this.reviewService.getReviewsByUserId(user_id);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  getReviewsByProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.getReviewsByProductId(req.params.id);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  searchReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await this.reviewService.searchReviews(req.query.q as string);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
}

export default new ReviewController();
