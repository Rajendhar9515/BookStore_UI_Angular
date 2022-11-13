import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.url;
  constructor(private http: HttpClient) {}

  userLogin(userRegestration: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, userRegestration);
  }

  userRegister(userLogin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, userLogin);
  }

  updateUserData(token: string, userData: any) {
    return this.http.put(`${this.baseUrl}/user/edit/${token}`, userData);
  }
}
