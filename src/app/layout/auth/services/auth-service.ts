import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  _http = inject(HttpClient);

  login(body: { email: string; password: string }): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, body);
  }

  register(body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndConditions: boolean;
  }): Observable<any> {
    return this._http.post(`${this.baseUrl}/signup`, body);
  }

  saveToken(token: string, role: string): void {
    localStorage.setItem('final-project-token', token);
    localStorage.setItem('final-project-role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('final-project-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('final-project-token');
    localStorage.removeItem('final-project-role');
  }
}
