import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CartItem from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private baseUrl = 'http://localhost:3000/api/v1/cartItems';

  constructor(private http: HttpClient) { }

  getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl);
  }

  getCartItemById(id: string): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.baseUrl}/${id}`);
  }

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, cartItem);
  }

  updateCartItem(id: string, cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/${id}`, cartItem);
  }

  deleteCartItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCartItemsByCartId(user_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/${user_id}`);
  }
}


