import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Product from '../../../shared/models/Product';
import { ProductService } from '../../../core/services/product.service';
import Review from '../../../shared/models/Review';
import { ReviewService } from '../../../core/services/review.service';
import CartItem from '../../../shared/models/CartItem';
import { CartItemService } from '../../../core/services/cart-item.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  product!: Product;
  error: string = '';
  relatedProducts: Product[] = [];
  reviews: Review[] = [];
  currentReview: number = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private cartItemService: CartItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const product_id = this.route.snapshot.paramMap.get('id');

    if (product_id) {
      this.getProduct(product_id);
      this.loadReviews(product_id);
      this.loadRelatedProducts(product_id);
    }

    if (this.reviews.length > 0) {
      this.currentReview = 0;
    }
  }

  getRatingArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('fa-star'),
      ...Array(halfStars).fill('fa-star-half-o'),
      ...Array(emptyStars).fill('fa-star-o')
    ];
  }

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  previousReview(): void {
    if (this.currentReview > 0) {
      this.currentReview--;
    } else {
      this.currentReview = this.reviews.length - 1;
    }
  }

  nextReview(): void {
    if (this.currentReview < this.reviews.length - 1) {
      this.currentReview++;
    } else {
      this.currentReview = 0;
    }
  }

  getProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product. Please try again later.';
        this.clearErrors();
      }
    });
  }

  loadReviews(product_id: string) {
    this.reviewService.getReviewsByProductId(product_id).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching categories';
        this.clearErrors();
      }
    );
  }

  loadRelatedProducts(product_id: string) {
    this.productService.getRelatedProducts(product_id).subscribe(
      (data) => {
        this.relatedProducts = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching related products';
        this.clearErrors();
      }
    );
  }

  viewProduct(product_id: string): void {
    this.router.navigate(['/products', product_id]);
  }

  addToCart(event: Event, product_id: string) {
    event.stopPropagation();

    const newCartItem: CartItem = {
      product_id: product_id
    }

    this.cartItemService.createCartItem(newCartItem).subscribe({
      next: data => {
        this.successMessage = 'Product added to cart successfull!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: err => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 404 || 400) {
          this.errorMessage = err.error.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    });
  }
}
