import { Pipe, PipeTransform } from '@angular/core';
import Product from '../models/Product';

@Pipe({
  name: 'productSearch',
  standalone: true,
})
export class ProductSearchPipe implements PipeTransform {
  transform(products: Product[], searchString: string): Product[] {
    if (!products || searchString == '') {
      return products;
    }

    let filteredProducts: Product[] = [];

    for (let product of products) {
      if (
        product.name.toLowerCase().includes(searchString.toLowerCase()) ||
        product.category?.name
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
        product.description.toLowerCase().includes(searchString.toLowerCase())
      ) {
        filteredProducts.push(product);
      }
    }
    return filteredProducts;
  }
}
