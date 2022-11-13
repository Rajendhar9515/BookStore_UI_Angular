import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  placeOrder(token: string, address: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/save/${token}`, address);
  }
}
