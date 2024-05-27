import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/Category/category.service';
import { MusicService } from 'src/app/services/Music/music.service';

@Component({
  selector: 'app-discovery-category',
  templateUrl: './discovery-category.component.html',
  styleUrls: ['./discovery-category.component.scss']
})
export class DiscoveryCategoryComponent implements OnInit {
  type_id!: number;
  constructor(
    private cate_services: CategoryService,
    private route: ActivatedRoute, private chane: ChangeDetectorRef, private music_services: MusicService) {

  }

  Playlist_Music: any;
  Playlist_TypeSong: any;

  setSongPlaying(songId: number, playing: boolean) {
    if (playing == true) {
      const play = document.getElementById(`songPlaying${songId}`) as HTMLElement
      play.classList.add("icon-pause");
      play.classList.remove("bi-play");

    }
    else {
      const play = document.getElementById(`songPlaying${songId}`) as HTMLElement
      play.classList.add("bi-play");
    }

  }
  toggleSong(songId: number) {

    for (let i = 0; i <= this.Playlist_Music.length - 1; i++) {
      if (i.toString() !== songId.toString()) {
        this.setSongPlaying(i, false)
        const audioPlayer_close_all = document.getElementById(`audioPlayer${i}`) as HTMLAudioElement;
        var showplay_check = document.getElementById(`showplay${i}`) as HTMLElement
        if (audioPlayer_close_all.played) {
          showplay_check.classList.add("pauseloading")
          audioPlayer_close_all.pause()
        }
        else {
          this.setSongPlaying(songId, false);
        }
      }

    }
    const audioPlayer = document.getElementById(`audioPlayer${songId}`) as HTMLAudioElement;
    const icon = document.querySelector(`i[data-song="${songId}"]`) as HTMLElement;

    var showplay = document.getElementById(`showplay${songId}`) as HTMLElement
    if (audioPlayer.paused) {
      showplay.classList.remove("pauseloading")
      audioPlayer.load()
      audioPlayer.play();
      this.setSongPlaying(songId, true);
    } else {
      showplay.classList.add("pauseloading")
      audioPlayer.pause();
      this.setSongPlaying(songId, false);
    }

    // this.CloseAllSongPlaylist();
  }
  GetMusicFortype(id: number) {
    this.music_services.GetMusicFortype(id).subscribe(res => {

      if (res) {
        this.Playlist_Music = res.data;
        console.log("Playlist_Music", this.Playlist_Music)
        this.chane.detectChanges();
      }
    }
    )
  }
  GetTypeSong_ForId(id: number) {
    this.cate_services.GetTypeSong_ForId(id).subscribe(res => {
      console.log("res", res)
      if (res) {

        this.Playlist_TypeSong = res.data;
        this.chane.detectChanges();
      }
    }
    )
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.type_id = +params.id;
      console.log("type_id", this.type_id)
      this.GetMusicFortype(this.type_id)
      this.GetTypeSong_ForId(this.type_id)
      // this.GetPlayListSong(this.playlist_id)


    })
  }

}
