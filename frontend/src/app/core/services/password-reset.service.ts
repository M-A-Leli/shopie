import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private baseUrl = 'http://localhost:3000/api/v1/password-reset';

  constructor(private http: HttpClient) { }

  sendPasswordResetCode(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/`, { email });
  }

  verifyPasswordResetCode(email: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify`, { email, code });
  }

  resetPassword(email: string, code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset`, { email, code, newPassword });
  }
}
