import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddplayListComponent } from '../addplay-list/addplay-list.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private dialog: MatDialog,) {

  }
  showAlert() {
    Swal.fire({
      title: 'Chức năng chưa được cập nhật',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
    });
  }
  AddPlayList() {
    const dialogRef = this.dialog.open(AddplayListComponent, {
      width: '300px',
      height: '200px',
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
}
