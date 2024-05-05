import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/typesong';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }

  CreateType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/CreateTypeNew`, body)
  }

  deleteType(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/${id}`)
  }
}
