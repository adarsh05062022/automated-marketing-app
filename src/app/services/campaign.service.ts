import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // Import ngx-cookie-service for cookie management
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl = 'http://localhost:5000/api/campaigns'; // Backend URL for campaign API

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Create a new campaign
  createCampaign(data: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/create-campaign`, data, {
        headers: this.createHeaders(),
      })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Get campaigns by user ID
  getCampaignsByOwnerId(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/owner`, {
        headers: this.createHeaders(),
      })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Get a campaign by ID
  getCampaignById(campaignId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/campaign/${campaignId}`, {
        headers: this.createHeaders(),
      })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Get campaigns by agent ID
  getCampaignsByAgentId(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/agent`, {
        headers: this.createHeaders(),
      })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Remove an agent from a campaign
  removeAgentFromCampaign(
    campaignId: string,
  ): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/remove-agent/${campaignId}`, {
        headers: this.createHeaders(),
      })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Create headers including the JWT from cookies
  private createHeaders(): HttpHeaders {
    const token = this.cookieService.get('token'); // Get the token from cookies
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
    });
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error); // Throw an error observable
  }
}
