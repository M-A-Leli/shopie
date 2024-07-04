import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import Product from '../../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import Category from '../../../shared/models/Category';
import { CategoryService } from '../../../core/services/category.service';
import { ProductSearchPipe } from '../../../shared/pipes/product-search.pipe';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProductSearchPipe],
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  createProductForm!: FormGroup;
  showAddModal = false;
  isLoading = false;
  products: Product[] = [];
  categoryList: Category[] = [];
  product_id = '';
  category_id = '';
  paginatedProducts: Product[] = [];
  images: string[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  createSuccess = false;
  createError = false;
  showDeleteModal = false;
  showUpdateModal = false;
  updateMsg = false;
  deleteMsg = false;
  createSuccessMessage = '';
  updateSuccessMessage = '';
  deleteSuccessMessage = '';
  searchString = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock_quantity: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      images: [null]
    });

    this.route.params.subscribe(params => {
      this.product_id = params['id'];
    });
  }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
        this.paginate();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res) => {
        this.categoryList = res;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onCategoryChange($event: Event) {
    const selectedCategory = ($event.target as HTMLSelectElement).value;
    console.log('Selected Category:', selectedCategory);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.images = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.createProductForm.controls).forEach(key => {
      formData.append(key, this.createProductForm.get(key)?.value);
    });
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }

    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log('Product created successfully!', response);
        this.fetchProducts();
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(product_id: string, product: Product) {
    this.productService.updateProduct(product_id, this.createProductForm.value).subscribe(
      (res) => {
        this.fetchProducts();
        this.updateMsg = true;
        this.updateSuccessMessage = 'Product updated successfully.';

        setTimeout(() => {
          this.updateMsg = false;
          this.updateSuccessMessage = '';
        }, 2000);
        this.closeUpdateModal();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteProduct(product_id: string) {
    this.productService.deleteProduct(product_id).subscribe(
      (res) => {
        this.fetchProducts();
        this.deleteMsg = true;
        this.deleteSuccessMessage = 'Product deleted successfully.';

        setTimeout(() => {
          this.deleteMsg = false;
          this.deleteSuccessMessage = '';
        }, 2000);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  closeAddModal() {
    this.showAddModal = false;
    this.createProductForm.reset();
  }

  getImagesUrl(event: any) {
    this.isLoading = true;
    const files = event.target.files;

    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'shopie');
      formData.append('cloud_name', 'day0akv3d');

      fetch('https://api.cloudinary.com/v1_1/day0akv3d/image/upload', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          this.images.push(res.url);
          this.isLoading = res.url ? false : true;
          this.createProductForm.patchValue({ images: this.images });
          this.createProductForm.patchValue({ image_url: res.url });
        });
    }
  }

  navigateToProductDetails(index: number) {
    const product = this.products[index];
    const product_id = product.id;
    this.router.navigate(['admin/products/view', product_id]);
  }

  openDeleteModal(productId: string): void {
    this.product_id = productId;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.productService.deleteProduct(this.product_id).subscribe(
      (res) => {
        this.deleteMsg = true;
        this.deleteSuccessMessage = 'Product deleted successfully.';
        this.fetchProducts();
        setTimeout(() => {
          this.deleteMsg = false;
          this.deleteSuccessMessage = '';
        }, 2000);
        this.closeDeleteModal();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  openUpdateModal(product: Product) {
    this.product_id = product.id;
    this.createProductForm.patchValue(product);
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.createProductForm.reset();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
}
