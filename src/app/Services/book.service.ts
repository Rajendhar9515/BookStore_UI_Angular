import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  getBookStoreData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/book/bookdata`);
  }

  lowToHighPrice(): Observable<any> {
    return this.http.get(`${this.baseUrl}/book/lowtohigh`);
  }

  highToLowPrice(): Observable<any> {
    return this.http.get(`${this.baseUrl}/book/hightolow`);
  }
}
