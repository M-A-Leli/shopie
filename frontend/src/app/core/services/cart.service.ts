import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cart from '../../shared/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:3000/api/v1/carts';

  constructor(private http: HttpClient) { }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl);
  }

  getCartById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${id}`);
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl, cart);
  }

  updateCart(id: string, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.baseUrl}/${id}`, cart);
  }

  deleteCart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
