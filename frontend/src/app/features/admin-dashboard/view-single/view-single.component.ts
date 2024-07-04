import { Component } from '@angular/core';
import Product from '../../../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-single',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-single.component.html',
  styleUrl: './view-single.component.css'
})
export class ViewSingleComponent {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(){
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((res) => {
        this.product = res;
      });
    }
  }

}
