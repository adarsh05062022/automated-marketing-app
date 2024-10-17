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
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Get campaigns by owner ID (business owner)
  getCampaignsByOwnerId(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/owner`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Get a specific campaign by campaign ID
  getCampaignById(campaignId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/campaign/${campaignId}`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Get campaigns by agent ID (for agents viewing their campaigns)
  getCampaignsByAgentId(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/agent`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Accept a campaign by agent (this method would make an API call to mark an agent's acceptance)
  acceptCampaign(campaignId: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/accept/campaign/${campaignId}`,
        {},
        {
          headers: this.createHeaders(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Remove an agent from a campaign
  removeAgentFromCampaign(campaignId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/remove-agent/${campaignId}`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError)); // Handle errors
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

  // **Get Metrics by agentId and campaignId**
  getMetrics(campaignId: string): Observable<any> {
    return this.http
      .get(`http://localhost:5000/api/metrics/${campaignId}`, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // **Update Metrics by agentId and campaignId**
  updateMetrics(campaignId: string): Observable<any> {
    return this.http
      .post(
        `http://localhost:5000/api/metrics/update-metrics/${campaignId}`,
        {}, // You can pass any necessary data here
        {
          headers: this.createHeaders(),
        }
      )       
      .pipe(catchError(this.handleError));
  }
}
