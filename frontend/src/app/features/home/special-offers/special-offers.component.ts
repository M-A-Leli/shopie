import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface SpecialOffer {
  name: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './special-offers.component.html',
  styleUrl: './special-offers.component.css'
})
export class SpecialOffersComponent {
  specialOffers: SpecialOffer[] = [
    {
      name: 'Offer 1',
      description: 'Amazing discount on product 1.',
      price: 19.99,
      image: 'product.jpeg'
    },
    {
      name: 'Offer 2',
      description: 'Get this product at an unbelievable price.',
      price: 29.99,
      image: 'product2.jpeg'
    },
    {
      name: 'Offer 3',
      description: 'Special deal on this product.',
      price: 39.99,
      image: 'product3.jpeg'
    },
    {
      name: 'Offer 4',
      description: 'Limited time offer on product 4.',
      price: 49.99,
      image: 'product4.jpeg'
    },
    // {
    //   name: 'Offer 4',
    //   description: 'Limited time offer on product 4.',
    //   price: 49.99,
    //   image: 'assets/images/offer4.jpg'
    // }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
