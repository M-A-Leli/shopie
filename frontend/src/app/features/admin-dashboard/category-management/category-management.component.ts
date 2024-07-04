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
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CommonModule,FormsModule],
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

onCategoryChange($event: Event) {
  const selectedCategory = ($event.target as HTMLSelectElement).value;
}

  createCategoryForm!: FormGroup;
  showAddModal = false;
  isLoading: boolean = false;
  categories: Category[]= [];
  category_id:string = '';
  paginatedCategories: Category[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  createSuccess = false;
  createError = false;
  showDeleteModal = false;
  showUpdateModal = false;
  updateMsg: boolean = false;
  deleteMsg: boolean = false;
  createSuccessMessage = '';
  updateSuccessMessage = '';
  deleteSuccessMessage = '';
  searchString: string = '';


  constructor(private fb: FormBuilder,private router:Router,private route:ActivatedRoute,private categoryService: CategoryService) {
    this.createCategoryForm = this.fb.group({
      image_url: ['', Validators.required],
      name: ['', Validators.required],
    });

  route.params.subscribe(res=>{
    this.category_id = res['id']
  })
  }

  ngOnInit() {
    this.fetchCategories();

  }


  fetchCategories(){
  this.categoryService.getAllCategories().subscribe((res)=>{
    this.categories = res;
    this.paginate();
  })
  }

  getCategoryById(category_id:string){
    this.categoryService.getCategoryById(category_id).subscribe((res)=>{
         this.category_id = res.id
    })
  }


  addCategory() {
    if (this.createCategoryForm.valid) {
      this.createSuccess = true;
      this.createError = false;
      this.closeAddModal();
    } else {
      this.createError = true;
    }
  }

  updateCategory(category_id:string,category:Category){
    this.categoryService.updateCategory(category_id,category).subscribe((res)=>{
      this.fetchCategories();
      this.updateMsg = true;
      this.updateSuccessMessage = 'Category updated successfully.';

      setTimeout(() => {
        this.updateMsg = false;
        this.updateSuccessMessage = '';
      }, 2000); // Hide message after 3 seconds
      this.closeUpdateModal();


    })
  }

deleteCategory(category_id:string){
  this.categoryService.deleteCategory(category_id).subscribe((res)=>{
  this.fetchCategories()
  })
}

  closeAddModal() {
    this.showAddModal = false;
    this.createCategoryForm.reset();
  }





openDeleteModal(categoryId: string): void {
  this.category_id = categoryId;
  this.showDeleteModal = true;
}

closeDeleteModal(): void {
  this.showDeleteModal = false;
}


confirmDelete(): void {
  this.categoryService.deleteCategory(this.category_id).subscribe((res) => {
    this.deleteMsg = true;
    this.deleteSuccessMessage = 'Product deleted successfully.';
    this.fetchCategories();
    setTimeout(() => {
      this.deleteMsg = false;
      this.deleteSuccessMessage = '';
    }, 2000);
    this.closeDeleteModal();
  });
}


openUpdateModal(category:Category){
  this.category_id = category.id;
  this.createCategoryForm.patchValue(category);
  this.showUpdateModal = true;
}

closeUpdateModal(){
  this.showUpdateModal = false;
  this.createCategoryForm.reset();
}


  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.itemsPerPage);
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
