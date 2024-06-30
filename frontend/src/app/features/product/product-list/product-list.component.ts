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

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
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
  errorMsg: string = '';
  showErrorModal: boolean = false;
  showSuccessModal: boolean = false;

  constructor(private productService: ProductService, private categoryService: CategoryService, private cartItemService: CartItemService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginateProducts();
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
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

  viewProduct(product_id: string): void {
    this.router.navigate(['/products', product_id]);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = this.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Handle error as needed
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    );
  }

  filterByCategory() {
    if (this.selectedCategoryId) {
      this.productService.getProductsByCategoryId(this.selectedCategoryId).subscribe(
        (data) => {
          this.filteredProducts = data;
        },
        (error) => {
          console.error('Error fetching products by category:', error);
          // Handle error as needed
        }
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  search() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    // Apply category filter if category is selected
    this.filterByCategory();
  }

  addToCart(product: Product) {
    alert('Not yet implemented');

    // const token = this.authService.getToken() as string;
    // if (!token) {
    //   this.router.navigateByUrl('/login');
    // } else {
    //   this.user_id = this.authService.getUserId() as string;

    //   const newCartItem = {
    //     user_id: this.user_id,
    //     product_id: product.id
    //   }

    //   this.cartItemService.createCartItem(newCartItem).subscribe({
    //     next: data => {
    //       this.showSuccessModal = true;
    //       setTimeout(() => {
    //         this.showSuccessModal = false;
    //       }, 3000);
    //     },
    //     error: err => {
    //       if (err.status === 409) {
    //         this.errorMsg = err.error.error.message;
    //         this.showErrorModal = true;
    //         setTimeout(() => {
    //           this.showErrorModal = false;
    //         }, 3000);
    //       } else if (err.status === 404) {
    //         this.errorMsg = err.error.error.message;
    //         this.showErrorModal = true;
    //         setTimeout(() => {
    //           this.showErrorModal = false;
    //         }, 3000);
    //       } else {
    //         this.errorMsg = 'An unexpected error occurred. Please try again.';
    //         this.showErrorModal = true;
    //         setTimeout(() => {
    //           this.showErrorModal = false;
    //         }, 3000);
    //       }
    //     }
    //   });
    // }
  }
}
