import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Category from '../../../shared/models/Category';
import { CategoryService } from '../../../core/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = [];
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
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

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
