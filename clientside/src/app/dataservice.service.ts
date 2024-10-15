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


  searchFundraiser(organizer?:string, caption?:string, targetFunding?:string, currentFunding?:string, city?:string, category?:string):Observable<Fundraiser[]>{
    let params = new HttpParams();

    if(organizer){
      params.append('organizer',organizer);
    }
    if(caption){
      params.append('caption',caption);
    }
    if(targetFunding){
      params.append('targer_funding',targetFunding);
    }
    if(currentFunding){
      params.append('current_funding',currentFunding);
    }
    if(city){
      params.append('city',city)
    }
    if(category){
      params.append('category_name',category)
    }
    return this.http.get<Fundraiser[]>(`${this.url}/search`, { params })
  }

  getFundraiserDetails(id: number): Observable<Fundraiser[]>{
    return this.http.get<Fundraiser[]>(`${this.url}/${id}`);
  }
}
