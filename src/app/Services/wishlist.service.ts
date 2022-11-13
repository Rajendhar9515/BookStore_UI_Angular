import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  addWishlist(token: string, bookId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/save/${token}`, {
      bookId,
    });
  }
  getWishlist(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/wishlist/getAll/${token}`);
  }

  removeWishlist(token: string, wishlistId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/wishlist/remove/${wishlistId}/${token}`
    );
  }
}
