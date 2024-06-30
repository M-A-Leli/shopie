import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {


  createProductForm!: FormGroup;
  showAddModal = false;
  createSuccess = false;
  createError = false;
  isLoading:boolean =false;
  images: string[] = [];

   imageUrl = ''

  constructor(private fb: FormBuilder) {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addProduct(): void {
    if (this.createProductForm.valid) {
      // Handle product creation logic
      this.createSuccess = true;
      this.createError = false;
      this.closeAddModal();
    } else {
      this.createError = true;
    }
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.createProductForm.reset();
  }


  getImagesUrl(event:any){
    this.isLoading=true
    const files = event.target.files

    if(files){
      const formData = new FormData()

      formData.append("file", files[0])
      formData.append("upload_preset", "shopie")
      formData.append("cloud_name", "day0akv3d")

      fetch('https://api.cloudinary.com/v1_1/day0akv3d/image/upload', {
        method: "POST",
        body: formData
      }).then((res=>res.json())).then(res=>{

        this.images.push(res.url)

        if(res.url){
          this.isLoading = false
        }else{
          this.isLoading = true
        }

        this.createProductForm.patchValue({images: this.images})
      })
    }

  }
}
