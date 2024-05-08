import { Inject, Injectable } from '@angular/core';
import { TableService } from './table.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/list';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }

  AddPlaylist(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/AddPlaylist`, body)
  }
  GetPlayList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/GetPlayList`)
  }

}
