import { MessageType } from './../../../components/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LayoutUtilsService } from 'src/app/components/crud/utils/layout-utils.service';
import { CategoryService } from 'src/app/services/Category/category.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-add-song-playlist',
  templateUrl: './add-song-playlist.component.html',
  styleUrls: ['./add-song-playlist.component.scss']
})
export class AddSongPlaylistComponent implements OnInit {
  listAllPlayList: any[] = [];
  selectedcode: any = 1;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddSongPlaylistComponent>,
    private cdr: ChangeDetectorRef,

    public playlist_services: PlaylistService,
    private layoutUtilsService: LayoutUtilsService,) {

  }
  Save() {



    this.playlist_services.AddSongInPlaylist(this.data.id_song, this.selectedcode).subscribe(res => {
      this.dialogRef.close();
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
    }
    )

  }
  _Back() {
    this.dialogRef.close();
  }
  GetPlayList() {

    this.playlist_services.GetPlayList().subscribe(res => {
      this.listAllPlayList = res.data;
      console.log("GetPlayList", this.listAllPlayList)
      this.cdr.detectChanges();
    })
  }
  ngOnInit(): void {
    console.log("vvccccc", this.data)
    this.GetPlayList();
  }

}
