import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Category {
  name: string;
  image: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      name: 'Electronics',
      image: 'electronics.jpg'
    },
    {
      name: 'Fashion',
      image: 'fashion.jpeg'
    },
    {
      name: 'Home & Garden',
      image: 'home_and_garden.jpeg'
    },
    {
      name: 'Sports',
      image: 'sports.jpeg'
    },
    {
      name: 'Toys',
      image: 'toys.jpeg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
