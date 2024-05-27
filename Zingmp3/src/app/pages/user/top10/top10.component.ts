import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/Music/music.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.scss']
})
export class Top10Component implements OnInit {
  ListTop10: any[] = []
  user: any;
  constructor(private music_services: MusicService, private change: ChangeDetectorRef) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  toggleSong(songId: number) {

    for (let i = 1; i <= this.ListTop10.length - 1; i++) {
      if (i.toString() !== songId.toString()) {

        this.setSongPlaying(i, false);
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
  }

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
  AddLike(id_song: number) {

    let index = this.ListTop10.findIndex(x => x.id_song == id_song)
    if (index >= 0) {
      if (this.ListTop10[index].like_song == null) {
        this.ListTop10[index].like_song = {
          id_song: id_song
        }

      }
      else {
        this.ListTop10[index].like_song = null

      }

      this.music_services.AddLike(id_song, this.user.account_id).subscribe(res => {

      }
      )
      this.change.detectChanges();
    }

  }
  GetTop10() {
    this.music_services.GetRanDom10Music().subscribe(res => {
      this.ListTop10 = res.data;
      this.change.detectChanges();
    }
    )
  }

  ngOnInit(): void {

    this.GetTop10();
  }

}
