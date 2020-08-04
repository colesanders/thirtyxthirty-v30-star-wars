import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { General, ApiObj } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://swapi.dev/api/';


@Injectable({
  providedIn: 'root'
})
export class GeneralsService {

  constructor(private http: HttpClient) { }

  all(dataSet: string): Observable<ApiObj>{
    return this.http.get<ApiObj>(BASE_URL + dataSet + '/');
  }

  byPage(dataSet: string, page: number): Observable<ApiObj>{
    console.log(dataSet)
    return this.http.get<ApiObj>(BASE_URL + dataSet + '/' + '?page=' + page);
  }

  byId(dataSet: string, id: number): Observable<General>{
    return this.http.get<General>(BASE_URL + dataSet + '/' + id + '/');
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
