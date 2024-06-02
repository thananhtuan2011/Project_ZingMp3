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
  GetDetailsong(id_song: number): Observable<any> {
    return this.http.get<any>(this.baseUrl_song + `/GetDetailsong?id_song=${id_song}`)
  }

  GetRanDomMusic(): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl_song + `/GetRanDomMusic`, { headers: header })
  }
  GetTop3Music() {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl_song + `/GetTop3Music`, { headers: header })
  }
  GetMusicFortype(type_id: number): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl_song + `/GetMusicFortype?type_id=${type_id}`, { headers: header })
  }

  GetRanDom10Music(): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl_song + `/GetRanDom10Music`, { headers: header })
  }
  GetMusicLike(): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl_song + `/GetMusicLike`, { headers: header })
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
  UpdateCountPlay(id: number) {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl_song + `/UpdateCountPlay?id_song=${id}`;
    return this.http.post<any>(url, null, { headers: httpHeader });
  }
  AddLike(id: number, acount_id: number) {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl_song + `/AddLike?id_song=${id}&acount_id=${acount_id}`;
    return this.http.post<any>(url, null, { headers: httpHeader });
  }

  UpdateSong(body: any): Observable<any> {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl_song + '/UpdateSong';
    // const httpHeader = this.getHttpHeadersFile();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }
  DeleteSong(id: any): Observable<any> {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl_song + `/DeleteSong?id_song=${id}`;
    return this.http.post<any>(url, null, { headers: httpHeader });

  }

}
