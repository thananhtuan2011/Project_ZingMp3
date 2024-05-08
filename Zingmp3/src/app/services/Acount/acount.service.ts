import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcountService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/typesong';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }
}
