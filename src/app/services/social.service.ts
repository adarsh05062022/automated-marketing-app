import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // Import ngx-cookie-service for cookie management
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private apiUrl = 'http://localhost:5000/api/social'; // Replace with your actual API URL

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Method to register or update a social account
  registerOrUpdateSocialAccount(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post(`${this.apiUrl}/register-update`, body, {
      headers: this.createHeaders()
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Create headers including the JWT from cookies
  private createHeaders(): HttpHeaders {
    const token = this.cookieService.get('token'); // Get the token from cookies
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Set the Authorization header
    });
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error); // Throw an error observable
  }
}
