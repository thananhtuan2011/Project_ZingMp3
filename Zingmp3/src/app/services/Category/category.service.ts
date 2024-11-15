import { environment } from './../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/typesong';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }

  CreateType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/CreateTypeNew`, body)
  }
  GetRanDomTypeSong(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/GetRanDomTypeSong`)
  }
  GetTypeSong_ForId(type_id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/GetTypeSong_ForId?type_id=${type_id}`)
  }


  UpdateType(type_id: number, body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/UpdateTypeSong?type_id=${type_id}`, body)
  }
  getAll_category(body: any): Observable<any> {
    const url = this.baseUrl + '/GetAllType';
    const httpHeader = this.getHttpHeaders();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  deleteType(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`)
  }
}
