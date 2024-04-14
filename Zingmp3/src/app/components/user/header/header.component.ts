import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHoiVienComponent } from '../add-hoi-vien/add-hoi-vien.component';
import { GioithieuComponent } from '../gioithieu/gioithieu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  isDropdownOpen_User = false;
  myVal!: string
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
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
