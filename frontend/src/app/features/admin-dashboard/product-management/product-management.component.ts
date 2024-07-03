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
  imports: [CommonModule, ReactiveFormsModule,CommonModule,FormsModule,ProductSearchPipe],
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

onCategoryChange($event: Event) {
  const selectedCategory = ($event.target as HTMLSelectElement).value;
}

  createProductForm!: FormGroup;
  showAddModal = false;
  isLoading: boolean = false;
  products: Product[] = [];
  categoryList: Category[]= [];
  product_id:string= '';
  category_id:string = '';
  paginatedProducts: Product[] = [];
  images: string[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  // imageUrl = '';
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


  constructor(private fb: FormBuilder, private service: ProductService,private router:Router,private route:ActivatedRoute,private categoryService: CategoryService) {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock_quantity: ['', Validators.required],
      description:['',Validators.required],
      images:[''],
      image_url:['']
    });

  route.params.subscribe(res=>{
    this.product_id = res['id']
  })
  }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.service.getAllProducts().subscribe((res) => {
      this.products = res
      this.paginate();
    });
  }

  fetchCategories(){
  this.categoryService.getAllCategories().subscribe((res)=>{
    this.categoryList = res;
  })
  }

  getCategoryById(category_id:string){
    this.categoryService.getCategoryById(category_id).subscribe((res)=>{
         this.category_id = res.id
    })
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

  updateProduct(product_id:string,product:Product){
    this.service.updateProduct(product_id,this.createProductForm.value).subscribe((res)=>{
      this.fetchProducts();
      this.updateMsg = true;
      this.updateSuccessMessage = 'Product updated successfully.';

      setTimeout(() => {
        this.updateMsg = false;
        this.updateSuccessMessage = '';
      }, 2000); // Hide message after 3 seconds
      this.closeUpdateModal();


    })
  }

deleteProduct(product_id:string){
  this.service.deleteProduct(product_id).subscribe((res)=>{
  this.fetchProducts()
  })
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
          this.createProductForm.patchValue({image_url:res.url})
        });
    }
  }

navigateToProductDetails(index:number){
  let product = this.products[index]
  let product_id = product.id
  this.router.navigate(['admin/products/view',product_id]);
}



openDeleteModal(productId: string): void {
  this.product_id = productId;
  this.showDeleteModal = true;
}

closeDeleteModal(): void {
  this.showDeleteModal = false;
}


confirmDelete(): void {
  this.service.deleteProduct(this.product_id).subscribe((res) => {
    this.deleteMsg = true;
    this.deleteSuccessMessage = 'Product deleted successfully.';
    this.fetchProducts();
    setTimeout(() => {
      this.deleteMsg = false;
      this.deleteSuccessMessage = '';
    }, 2000);
    this.closeDeleteModal();
  });
}


openUpdateModal(product:Product){
  this.product_id = product.id;
  this.createProductForm.patchValue(product);
  this.showUpdateModal = true;
}

closeUpdateModal(){
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

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    );
  }
}
