import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
  constructor(private cookieService: CookieService, private router: Router) {
    const accessToken = this.cookieService.get("accessToken");
    if (!accessToken) {
      this.cookieService.deleteAll();
      localStorage.clear()
      this.router.navigateByUrl('/login')

    } else {
      const role = localStorage.getItem("roles");
      if (role === '"1"') {
        this.router.navigateByUrl('/admin');

      }
    }
  }

}
