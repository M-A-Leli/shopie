import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import Product from '../../../shared/models/Product';
import { CartItemService } from '../../../core/services/cart-item.service';
import CartItem from '../../../shared/models/CartItem';

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './special-offers.component.html',
  styleUrl: './special-offers.component.css'
})
export class SpecialOffersComponent {

  specialOffers: Product[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private productService: ProductService, private cartItemService: CartItemService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
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

  loadProducts() {
    this.productService.getSpecialOffers().subscribe(
      (data) => {
        this.specialOffers = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Handle error as needed
      }
    );
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

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
