import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  isDropdownOpen_User = false;
  constructor() { }

  ngOnInit(): void {
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
