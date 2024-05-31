import { Inject, Injectable } from '@angular/core';
import { TableService } from './table.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/list';
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

  AddSongInPlaylist(id_song: any, id_playlist: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/AddSongInPlaylist?id_song=${id_song}&id_playlist=${id_playlist}`, null)
  }
  RemoveSong_InPlayList(id_song: any, id_playlist: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/RemoveSong_InPlayList?id_song=${id_song}&id_playlist=${id_playlist}`, null)
  }


  AddPlaylist(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/AddPlaylist`, body)
  }
  GetPlayList(): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl + `/GetPlayList`, { headers: header })
  }
  GetPlayListDetail(id: number): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl + `/GetPlayListDetail?play_id=${id}`, { headers: header })
  }
  GetPlayListSong(id: number): Observable<any> {
    const header = this.getHttpHeaders_();
    return this.http.get<any>(this.baseUrl + `/GetPlayListSong?play_id=${id}`, { headers: header })
  }

}
