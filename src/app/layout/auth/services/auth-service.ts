import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);

  login(body: { email: string; password: string }): Observable<any> {
    return this._http.post(`${environment.baseUrl}auth/login`, body);
  }

  register(body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndConditions: boolean;
  }): Observable<any> {
    return this._http.post(`${environment.baseUrl}auth/signup`, body);
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
