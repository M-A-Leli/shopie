import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface NewArrival {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css'
})
export class NewArrivalsComponent {
  newArrivals: NewArrival[] = [
    {
      name: 'Product 1',
      price: 24.99,
      image: 'product.jpeg'
    },
    {
      name: 'Product 2',
      price: 34.99,
      image: 'product2.jpeg'
    },
    {
      name: 'Product 3',
      price: 44.99,
      image: 'product3.jpeg'
    },
    {
      name: 'Product 4',
      price: 54.99,
      image: 'product4.jpeg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
