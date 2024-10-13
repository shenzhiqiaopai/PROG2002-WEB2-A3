/**
 * This is an Angular service (DataService) that communicates with the backend API and mainly handles CRUD (create, read, update, delete) operations related to fundraisers.
 * Author: Qiao Kang
 */
import { Injectable } from '@angular/core';// Import the Injectable decorator from Angular core
import { HttpClient, HttpHeaders } from '@angular/common/http';// Import HttpClient and HttpHeaders for making HTTP requests
import { Observable } from 'rxjs';// Import Observable from RxJS for handling asynchronous data streams

@Injectable({
  providedIn: 'root'// This service will be provided at the root level of the application
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api/fundraiser';  // URL for the Express API

  constructor(private http: HttpClient) {}

 // Method to retrieve all fundraisers
  getFundraisers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

 // Method to retrieve a specific fundraiser by ID
  getFundraiserById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Method to create a new fundraiser
  createFundraiser(fundraiserData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fundraiserData);
  }

  // Method to update an existing fundraiser
  updateFundraiser(id: number, fundraiserData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, fundraiserData);
  }

  // Method to delete a fundraiser
  deleteFundraiser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}