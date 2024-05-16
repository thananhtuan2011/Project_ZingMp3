import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-load-playlist',
  templateUrl: './load-playlist.component.html',
  styleUrls: ['./load-playlist.component.scss']
})
export class LoadPlaylistComponent implements OnInit {
  playlist_id!: number;
  constructor(
    private route: ActivatedRoute, private chane: ChangeDetectorRef, private play_services: PlaylistService) {

  }

  Playlistdetail: any;
  Playlist_song: any[] = [];


  LoadDetailPlay(id: number) {
    this.play_services.GetPlayListDetail(id).subscribe(res => {

      if (res) {
        this.Playlistdetail = res.data;
        console.log("Playlistdetail", this.Playlistdetail)
        this.chane.detectChanges();
      }
    }
    )
  }
  GetPlayListSong(id: number) {
    this.play_services.GetPlayListSong(id).subscribe(res => {
      console.log("res", res)
      if (res) {

        this.Playlist_song = res.data;
        console.log("Playlist_song", this.Playlist_song)
        this.chane.detectChanges();
      }
    }
    )
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.playlist_id = +params.id;
      this.LoadDetailPlay(this.playlist_id)
      this.GetPlayListSong(this.playlist_id)


    })
  }

}
