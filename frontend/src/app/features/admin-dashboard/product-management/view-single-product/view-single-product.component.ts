import { Component } from '@angular/core';
import Product from '../../../../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-single-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-single-product.component.html',
  styleUrl: './view-single-product.component.css'
})
export class ViewSingleProductComponent {

  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
