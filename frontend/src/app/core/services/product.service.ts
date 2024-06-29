import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProduct(productFormData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.baseUrl, productFormData, { headers });
  }

  updateProduct(id: string, product: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/${id}`, product, { headers });
  }

  deleteProduct(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }

  getProductsByCategoryId(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${categoryId}`);
  }

  searchProducts(queryParams: any): Observable<any> {
    let params = new HttpParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        params = params.set(key, queryParams[key]);
      }
    }
    return this.http.get<any>(`${this.baseUrl}/search`, { params });
  }
}
