import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = 'http://localhost:3000/api/v1/auth';
  private tokenKey: string = 'authToken';
  private userIdKey: string = 'userId';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<{ token: string; redirectUrl: string; user_id: string }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ token: string; redirectUrl: string; user_id: string }>(`${this.baseURL}/login`, { email, password }, { headers })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUserId(response.user_id);
        })
      );
  }

  logout(): void {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.baseURL}/logout`, {}, { headers })
      .subscribe(response => {
        this.clearToken();
        this.clearUserId();
        this.router.navigate(['/login']);
      });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  clearUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
