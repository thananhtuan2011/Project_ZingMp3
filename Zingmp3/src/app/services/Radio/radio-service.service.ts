import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { TableService } from '../table.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadioServiceService extends TableService<any> {
  baseUrl = environment.HOST_API + '/api/radio';
  constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
    super(http, cookie_servics);
  }
  getHttpHeaderFiles() {

    let result = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': 'multipart/form-data',
    });
    return result;
  }
  AddRadio(body: any): Observable<any> {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl + '/AddRadio';
    // const httpHeader = this.getHttpHeadersFile();
    return this.http.post<any>(url, body, { headers: httpHeader });

  }

  GetAllRadio(body: any) {
    const httpHeader = this.getHttpHeaderFiles();
    const url = this.baseUrl + '/GetAllRadio';
    // const httpHeader = this.getHttpHeadersFile();
    return this.http.post<any>(url, body, { headers: httpHeader });
  }
}
