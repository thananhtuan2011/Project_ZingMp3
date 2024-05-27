import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddplayListComponent } from '../addplay-list/addplay-list.component';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AddHoiVienComponent } from '../add-hoi-vien/add-hoi-vien.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private chan: ChangeDetectorRef, private dialog: MatDialog, private play_list_services: PlaylistService) {

  }
  listPlaylist: any[] = []
  GetPlayList() {
    this.play_list_services.GetPlayList().subscribe(res => {

      if (res) {
        this.listPlaylist = res.data
        // console.log("listPlaylist", this.listPlaylist)
        this.chan.detectChanges()
      }
    })
  }
  ngOnInit(): void {
    this.GetPlayList();
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
        this.GetPlayList()
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
}
