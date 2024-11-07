import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "/posts";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginPostData> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginPostData>('https://localhost:7110/api/Login/login', { username, password }, { headers });
  }
}

export interface LoginPostData {
  id_token: string;
  id: number;
}
