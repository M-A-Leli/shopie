import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, productData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  updateProduct(id: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, productData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProductsByCategoryId(category_id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${category_id}`);
  }

  getRelatedProducts(product_id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/related-products/${product_id}`);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/featured-products`);
  }

  getSpecialOffers(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/special-offers`);
  }

  getNewArrivals(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/new-arrivals`);
  }

  // !
  searchProducts(queryParams: any): Observable<Product[]> {
    let params = new HttpParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params = params.set(key, queryParams[key]);
      }
    }
    return this.http.get<Product[]>(`${this.baseUrl}/search`, { params });
  }
}
