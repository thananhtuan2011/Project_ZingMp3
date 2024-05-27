import { Inject, Injectable } from '@angular/core';
import { TableService } from './table.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class PaymentService extends TableService<any> {
    baseUrl = environment.HOST_API + '/api/pay';
    constructor(@Inject(CookieService) cookie_servics: any, @Inject(HttpClient) http: any) {
        super(http, cookie_servics);
    }

    Payment(tongtien: number) {
        return this.http.post<any>(this.baseUrl + `/Pay_Vnpay?tongtien=${tongtien}`, null)

    }



}
