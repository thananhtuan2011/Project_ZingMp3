import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';
import { TableService } from '../table.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/typesong';
  baseUrl_song = environment.HOST_API + '/api/song';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }

  CreateType(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/CreateTypeNew`, body)
  }
  GetRanDomMusic(): Observable<any> {
    return this.http.get<any>(this.baseUrl_song + `/GetRanDomMusic`)
  }

  getHttpHeaderFiles() {

    let result = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': 'multipart/form-data',
    });
    return result;
  }
  AddSong(body: any): Observable<any> {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl_song + '/AddSong';
    // const httpHeader = this.getHttpHeadersFile();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  DeleteSong(id: any): Observable<any> {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl_song + `/DeleteSong?id_song=${id}`;
    return this.http.post<any>(url, null, { headers: httpHeader });

  }

}
