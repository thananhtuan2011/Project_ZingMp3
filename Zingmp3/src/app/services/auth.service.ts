import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
const HOST_API = environment.HOST_API
const DOMAIN = environment.DOMAIN_COOKIES
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookie_services: CookieService, private router: Router, private http: HttpClient, public afAuth: AngularFireAuth) { }


  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.Gentoken_withGoogle(result.additionalUserInfo?.profile?.email).subscribe(res => {
          this.cookie_services.set("accessToken", res.accessToken, 365, '/', DOMAIN);
          this.cookie_services.set("refreshToken", res.refreshToken, 365, '/', DOMAIN);
          localStorage.setItem("user", JSON.stringify(res.user));
          this.router.navigateByUrl('/home');
        }
        )
        // this.Gentoken_withGoogle
        // this.LoginWithGoogle(result.additionalUserInfo?.profile?.email, result.additionalUserInfo?.profile.name).subscribe(res => {

        //   localStorage.setItem("user", JSON.stringify(res.data));


        // }
        // )


        // this.cookie_services.set("accessToken", result.credential.idToken, 365, '/', DOMAIN);

        console.log('You have been successfully logged in!', result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getHttpHeaders() {


    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  Login(username: string, pass: string): Observable<any> {
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(HOST_API + `/api/acount/Login?username=${username}&pass=${pass}`, { headers: httpHeader })
  }
  Gentoken_withGoogle(email: string): Observable<any> {
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(HOST_API + `/api/acount/Gentoken_withGoogle?email=${email}`, { headers: httpHeader })
  }

  Register(fullname: string, username: string, pass: string): Observable<any> {
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(HOST_API + `/api/acount/Register?fullname=${fullname}&username=${username}&pass=${pass}`, { headers: httpHeader })
  }


  LoginWithGoogle(email: string, name: string): Observable<any> {
    const httpHeader = this.getHttpHeaders();
    return this.http.get<any>(HOST_API + `/api/acount/LoginWithGoogle?email=${email}&name=${name}`, { headers: httpHeader })
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`https://localhost:5001/api/signup`, user)
  }
  signin(user: any): Observable<any> {
    return this.http.post<any>(`https://localhost:5001/api/sigin`, user)
  }
  isAuthenticated(): any {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  }
}
