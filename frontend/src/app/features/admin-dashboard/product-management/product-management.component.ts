import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import Product from '../../../shared/models/Product';
import Category from '../../../shared/models/Category';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  createProductForm!: FormGroup;
  showAddModal = false;
  createSuccess = false;
  createError = false;
  isLoading: boolean = false;
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  images: string[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  imageUrl = '';
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private service: ProductService, private categoryService: CategoryService,) {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchProducts();
    this.loadCategories();
  }

  fetchProducts() {
    this.service.getAllProducts().subscribe((res) => {
      this.products = res
      this.paginate();
    });
  }

  addProduct() {
    if (this.createProductForm.valid) {
      this.createSuccess = true;
      this.createError = false;
      this.closeAddModal();
    } else {
      this.createError = true;
    }
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
        });
    }
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
}
