import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  cartdata(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart/cartdata/${token}`);
  }

  addToCart(token: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/save/${token}`, data);
  }

  removeCart(cartId: any, token: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/remove/${cartId}/${token}`);
  }

  updateBookQuantity(cartId: any, quantity: any, token: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/cart/edit/${cartId}/${quantity}?token=${token}`,
      {}
    );
  }
}
