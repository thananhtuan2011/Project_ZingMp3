import { environment } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }
}
