import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../../shared/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:3000/api/v1/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
