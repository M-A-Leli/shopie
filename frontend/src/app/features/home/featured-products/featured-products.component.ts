import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = [
    {
      name: 'Product 1',
      price: 29.99,
      image: 'product.jpeg'
    },
    {
      name: 'Product 2',
      price: 49.99,
      image: 'product2.jpeg'
    },
    {
      name: 'Product 3',
      price: 19.99,
      image: 'product3.jpeg'
    },
    {
      name: 'Product 4',
      price: 39.99,
      image: 'product4.jpeg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
