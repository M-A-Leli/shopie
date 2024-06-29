import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Review {
  text: string;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  reviews: Review[];
  relatedProducts: Product[];
}

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    reviews: [],
    relatedProducts: []
  };
relatedProducts: any; //!

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.loadProductDetails(Number(productId));
  }
  loadProductDetails(productId: number): void {
    // Replace this with actual data fetching logic
    // For demonstration purposes, let's use static data
    const products: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'This is the description for Product 1',
        price: 99.99,
        image: 'https://via.placeholder.com/300',
        reviews: [
          { text: 'Great product!', rating: 5 },
          { text: 'Satisfactory', rating: 3 }
        ],
        relatedProducts: [
          {
            id: 2,
            name: 'Related Product 1',
            description: 'This is the description for Related Product 1',
            price: 59.99,
            image: 'https://via.placeholder.com/200',
            reviews: [],
            relatedProducts: []
          },
          {
            id: 3,
            name: 'Related Product 2',
            description: 'This is the description for Related Product 2',
            price: 79.99,
            image: 'https://via.placeholder.com/200',
            reviews: [],
            relatedProducts: []
          }
        ]
      },
      // Add more products as needed
    ];

    this.product = products.find(p => p.id === productId) || this.product;
  }

  viewProduct(productId: number): void {
    // Navigate to the product details page of the related product
    this.router.navigate(['/products', productId]);
  }
}
