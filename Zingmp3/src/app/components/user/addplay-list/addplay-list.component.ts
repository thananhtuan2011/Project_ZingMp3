import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PlaylistService } from 'src/app/services/playlist.service';
import { LayoutUtilsService, MessageType } from '../../crud/utils/layout-utils.service';

@Component({
  selector: 'app-addplay-list',
  templateUrl: './addplay-list.component.html',
  styleUrls: ['./addplay-list.component.scss']
})
export class AddplayListComponent implements OnInit {

  nameplaylist: string = ''
  user: any
  constructor(private dialogRef: MatDialogRef<AddplayListComponent>,
    private layoutUtilsService: LayoutUtilsService,
    private play_services: PlaylistService
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  _Back() {
    this.dialogRef.close();
  }
  Save() {
    let item = {
      account_id: this.user.account_id,
      playlist_name: this.nameplaylist
    }
    this.play_services.AddPlaylist(item).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }
    }
    )
  }
  ngOnInit(): void {

  }

}
