import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // Import ngx-cookie-service for cookie management
import { tap } from 'rxjs/operators'; // Import tap operator

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users'; // Backend URL for common auth API

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  // Login (common for both agents and owners)
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((authResult: any) => {
        this.setSession(authResult); // Store the token and user data

        const user = this.getUser(); // Get user data from cookies
        // Redirect based on user role
        if (user.isOwner) {
          this.router.navigate(['/dashboard/owner']); // Redirect to owner's dashboard
        } else {
          this.router.navigate(['/dashboard/agent']); // Redirect to agent's dashboard
        }
      })
    );
  }

  // Register (common for both agents and owners)
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Store token and user details in cookies
  setSession(authResult: any): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Set the cookie to expire in 1 day
  
    this.cookieService.delete('token');
    this.cookieService.delete('user');
  
    // Set token and user data with an expiration time of 1 day
    this.cookieService.set('token', authResult.token, expirationDate, '/');
    this.cookieService.set('user', JSON.stringify(authResult.user), expirationDate, '/');
  }
  

  // Get stored user data
  getUser(): any {
    return JSON.parse(this.cookieService.get('user') || '{}');
  }

  // Get token
  getToken(): string {
    return this.cookieService.get('token');
  }

  // Logout
  logout(): void {
    this.cookieService.delete('token', '/'); // Explicitly set the path
    this.cookieService.delete('user', '/'); // Explicitly set the path
    this.router.navigate(['/login']);
  }
  

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check role-based access (agent or owner)
  isOwner(): boolean {
    const user = this.getUser();
    return user?.isOwner == true;
  }

  isAgent(): boolean {
    const user = this.getUser();
    return !user?.isOwner == false;
  }
}
