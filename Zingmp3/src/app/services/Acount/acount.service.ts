import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcountService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/acount';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }
  getHttpHeaders_() {

    const token = this.cookie_servics.get("accessToken")

    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }

  UpdateVip(account_id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/UpdateVip?account_id=${account_id}`)
  }
  GetInforUser(): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl + `/GetInforUser`, { headers: header })
  }

}
