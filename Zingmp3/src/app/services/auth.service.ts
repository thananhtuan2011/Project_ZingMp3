import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const HOST_API = environment.HOST_API
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(username: string, pass: string): Observable<any> {
    return this.http.get<any>(HOST_API + `/api/acount/Login?username=${username}&pass=${pass}`)
  }
  signup(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/signup`, user)
  }
  signin(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/signin`, user)
  }
  isAuthenticated(): any {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  }
}
