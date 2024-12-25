import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/users';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError((error: any) => {
        console.error('Login error:', error);
        return throwError(error);
      }),
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Store user role
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove user role on logout
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}
