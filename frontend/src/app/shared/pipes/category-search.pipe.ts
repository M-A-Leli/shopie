import { Pipe, PipeTransform } from '@angular/core';
import Category from '../models/Category';

@Pipe({
  name: 'categorySearch',
  standalone: true,
})
export class CategorySearchPipe implements PipeTransform {
  transform(categories: Category[], searchString: string): Category[] {
    if (!categories || searchString == '') {
      return categories;
    }

    let filteredCategories: Category[] = [];

    for (let category of categories) {
      if (category.name.toLowerCase().includes(searchString.toLowerCase())) {
        filteredCategories.push(category);
      }
    }
    return filteredCategories;
  }
}
