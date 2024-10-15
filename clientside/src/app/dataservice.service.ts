import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Fundraiser } from './fundraiser';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {


  constructor(private http: HttpClient) { }
  private url = "http://localhost:3060/api";


  searchFundraiser(organizer?: string, caption?: string, targetFunding?: string, currentFunding?: string, city?: string, category?: string): Observable<Fundraiser[]> {
    let params = new HttpParams();
  
    if (organizer) {
      params = params.append('organizer', organizer); // 重新赋值
    }
    if (caption) {
      params = params.append('caption', caption); // 重新赋值
    }
    if (targetFunding) {
      params = params.append('target_funding', targetFunding); // 重新赋值
    }
    if (currentFunding) {
      params = params.append('current_funding', currentFunding); // 重新赋值
    }
    if (city) {
      params = params.append('city', city); // 重新赋值
    }
    if (category) {
      params = params.append('category_name', category); // 重新赋值
    }
  
    return this.http.get<Fundraiser[]>(`${this.url}/search`, { params });
  }
  

  getFundraiserDetails(id: number): Observable<Fundraiser[]>{
    return this.http.get<Fundraiser[]>(`${this.url}/${id}`);
  }
}
