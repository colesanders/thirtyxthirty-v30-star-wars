import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, ApiObj } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://swapi.dev/api/people/';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  all(): Observable<ApiObj>{
    return this.http.get<ApiObj>(BASE_URL);
  }

  byPage(page: number): Observable<ApiObj>{
    return this.http.get<ApiObj>(BASE_URL + '?page=' + page);
  }

  byName(name: string): Observable<ApiObj>{
    return this.http.get<ApiObj>(BASE_URL + name);
  }

  byId(id: number): Observable<Character>{
    return this.http.get<Character>(BASE_URL + id + '/');
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
