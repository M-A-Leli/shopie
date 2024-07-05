import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryService } from '../../../core/services/category.service';
import { CartItemService } from '../../../core/services/cart-item.service';
import Product from '../../../shared/models/Product';
import Category from '../../../shared/models/Category';
import CartItem from '../../../shared/models/CartItem';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 30;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  user_id: string = '';
  selectedCategoryId: string = '';
  searchQuery: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private productService: ProductService, private categoryService: CategoryService, private cartItemService: CartItemService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateProducts();
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

  viewProduct(product_id: string): void {
    this.router.navigate(['/products', product_id]);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = this.products;
        this.paginateProducts();
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
        this.clearErrors();
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching categories';
        this.clearErrors();
      }
    );
  }

  filterByCategory() {
    if (this.selectedCategoryId) {
      this.productService.getProductsByCategoryId(this.selectedCategoryId).subscribe(
        (data) => {
          this.filteredProducts = data;
          this.currentPage = 1; // Reset to the first page
          this.paginateProducts();
        },
        (error) => {
          this.errorMessage = 'Error fetching products by category';
          this.clearErrors();
        }
      );
    } else {
      this.filteredProducts = this.products;
      this.currentPage = 1; // Reset to the first page
      this.paginateProducts();
    }
  }

  search() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    // Apply category filter if category is selected
    this.filterByCategory();
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
