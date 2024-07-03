import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import Product from '../../../shared/models/Product';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = [];
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getFeaturedProducts().subscribe(
      (data) => {
        this.featuredProducts = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
        this.clearErrors();
      }
    );
  }

  viewProduct(product_id: string): void {
    this.router.navigate(['/products', product_id]);
  }

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
