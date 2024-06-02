import { MusicService } from 'src/app/services/Music/music.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-playlist-like',
  templateUrl: './load-playlist-like.component.html',
  styleUrls: ['./load-playlist-like.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class LoadPlaylistLikeComponent implements OnInit {
  user: any;
  list_Song: any[] = [];
  constructor(private mus_services: MusicService) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  toggleSong(songId: number) {

    for (let i = 1; i <= this.list_Song.length - 1; i++) {
      if (i.toString() !== songId.toString()) {

        this.setSongPlaying(i, false);
        const audioPlayer_close_all = document.getElementById(`audioPlayer_like${i}`) as HTMLAudioElement;
        var showplay_check = document.getElementById(`showplay_like${i}`) as HTMLElement
        if (audioPlayer_close_all.played) {
          showplay_check.classList.add("pauseloading")
          audioPlayer_close_all.pause()
        }
        else {
          this.setSongPlaying(songId, false);
        }
      }

    }
    const audioPlayer = document.getElementById(`audioPlayer_like${songId}`) as HTMLAudioElement;
    const icon = document.querySelector(`i[data-song="${songId}"]`) as HTMLElement;

    var showplay = document.getElementById(`showplay_like${songId}`) as HTMLElement
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
  }

  setSongPlaying(songId: number, playing: boolean) {
    if (playing == true) {
      const play = document.getElementById(`songPlaying_like${songId}`) as HTMLElement
      play.classList.add("icon-pause");
      play.classList.remove("bi-play");

    }
    else {
      const play = document.getElementById(`songPlaying_like${songId}`) as HTMLElement
      play.classList.add("bi-play");
    }

  }
  AddLike(id_song: number) {

    let index = this.list_Song.findIndex(x => x.id_song == id_song)
    if (index >= 0) {
      if (this.list_Song[index].like_song == null) {
        this.list_Song[index].like_song = {
          id_song: id_song
        }

      }
      else {
        this.list_Song[index].like_song = null

      }

      this.mus_services.AddLike(id_song, this.user.account_id).subscribe(res => {
        this.LoadData();
      }
      )
    }

  }
  LoadData() {
    this.mus_services.GetMusicLike().subscribe(res => {
      this.list_Song = res.data;
      console.log("list_Song", this.list_Song)
    }
    )
  }
  ngOnInit(): void {
    this.LoadData();

  }

}
