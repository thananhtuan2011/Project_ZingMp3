import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHoiVienComponent } from '../add-hoi-vien/add-hoi-vien.component';
import { GioithieuComponent } from '../gioithieu/gioithieu.component';
import { InforUserComponent } from './component/infor-user/infor-user.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ChangePassComponent } from './component/change-pass/change-pass.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  isDropdownOpen_User = false;
  myVal!: string
  constructor(private router: Router, private cookie_services: CookieService, private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  Remove_Search(envet: any) {
    if (envet) {
      this.myVal = "";
    }

  }
  ChangePass() {
    const dialogRef = this.dialog.open(ChangePassComponent, {
      width: '400px',
      // height: '200px',
      // data: {  },
      // with:'500px',
      // panelClass: 'dialogcss'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        // this.LoadAllCustomer()
      }
    })
  }
  Infor() {
    const dialogRef = this.dialog.open(InforUserComponent, {
      width: '600px',
      // height: '200px',
      // data: {  },
      // with:'500px',
      // panelClass: 'dialogcss'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        // this.LoadAllCustomer()
      }
    })
  }

  AddGioiThieu() {
    const dialogRef = this.dialog.open(GioithieuComponent, {
      // width: '300px',
      // height: '200px',
      // data: {  },
      // with:'500px',
      // panelClass: 'dialogcss'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        // this.LoadAllCustomer()
      }
    })
  }
  Logout() {
    this.cookie_services.deleteAll();
    localStorage.clear();
    this.router.navigateByUrl("/login")

  }

  AddHoiVien() {
    const dialogRef = this.dialog.open(AddHoiVienComponent, {
      // width: '300px',
      // height: '200px',
      // data: {  },
      // with:'500px',
      // panelClass: 'dialogcss'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        // this.LoadAllCustomer()
      }
    })
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!(event.target as HTMLElement).matches('.dropbtn')) {
      this.isDropdownOpen = false;
    }
    if (!(event.target as HTMLElement).matches('.dropbtn_user')) {
      this.isDropdownOpen_User = false;
    }
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleDropdown_User() {
    this.isDropdownOpen_User = !this.isDropdownOpen_User;
  }
}
