import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcountService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/acount';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }

  UpdateVip(account_id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/UpdateVip?account_id=${account_id}`)
  }
}
