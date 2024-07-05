import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Category from '../../../shared/models/Category';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CommonModule,FormsModule],
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  paginatedCategories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  hoveredIndex: number | null = null;

  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  showDeleteModal: boolean = false;

  createCategoryForm!: FormGroup;
  category_id!: string;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCategories();
    this.createCategoryForm = this.fb.group({
      name: ['', Validators.required],
      image_url: ['', Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
      this.updatePaginatedCategories();
    });
  }

  updatePaginatedCategories(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCategories();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCategories();
    }
  }

  openUpdateModal(category: Category): void {
    this.category_id = category.id;
    this.createCategoryForm.patchValue({
      name: category.name,
      image_url: category.image_url
    });
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  openDeleteModal(id: string): void {
    this.category_id = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  addCategory(): void {
    if (this.createCategoryForm.valid) {
      const newCategory = this.createCategoryForm.value;
      this.categoryService.createCategory(newCategory).subscribe((category) => {
        this.categories.push(category);
        this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
        this.updatePaginatedCategories();
        this.showAddModal = false;
      });
    }
  }

  updateCategory(id: string): void {
    if (this.createCategoryForm.valid) {
      const updatedCategory = this.createCategoryForm.value;
      this.categoryService.updateCategory(id, updatedCategory).subscribe((category) => {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.categories[index] = category;
          this.updatePaginatedCategories();
        }
        this.showUpdateModal = false;
      });
    }
  }

  confirmDelete(): void {
    this.categoryService.deleteCategory(this.category_id).subscribe(() => {
      this.categories = this.categories.filter((category) => category.id !== this.category_id);
      this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
      this.updatePaginatedCategories();
      this.showDeleteModal = false;
    });
  }
}
