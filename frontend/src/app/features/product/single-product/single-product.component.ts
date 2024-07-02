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
  relatedProducts: Product[] = []; //!
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const product_id = this.route.snapshot.paramMap.get('id');
    if (product_id) {
      this.getProduct(product_id);
      this.loadReviews(product_id);
      this.loadRelatedProducts(product_id);
    }
  }

  getProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.error = 'Failed to load product. Please try again later.';
        console.error(err);
      }
    });
  }

  loadReviews(product_id: string) {
    this.reviewService.getReviewsByProductId(product_id).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    );
  }

  loadRelatedProducts(product_id: string) {
    this.productService.getRelatedProducts(product_id).subscribe(
      (data) => {
        this.relatedProducts = data;
      },
      (error) => {
        console.error('Error fetching related products:', error);
        // Handle error as needed
      }
    );
  }

  viewProduct(product_id: string): void {
    this.router.navigate(['/products', product_id]);
  }

  // !
  addToCart(arg0: Product) {
    throw new Error('Method not implemented.');
  }
}
