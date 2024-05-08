import { MusicService } from 'src/app/services/Music/music.service';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private music_services: MusicService, private change: ChangeDetectorRef) {

  }

  listMusic: any[] = []

  GetRanDomMusic() {
    this.music_services.GetRanDomMusic().subscribe(res => {
      this.listMusic = res.data
      console.log("  this.listMusic", this.listMusic)
      this.change.detectChanges();
    })
  }
  ngOnInit(): void {
    this.GetRanDomMusic();
  }
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef;

  songPlaying: boolean = false;
  // song2Playing: boolean = false;
  // song3Playing: boolean = false;
  // song4Playing: boolean = false;
  song1Duration: number = 0;
  song2Duration: number = 0;
  song3Duration: number = 0;
  song4Duration: number = 0;
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



  ngAfterViewInit() {

    this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateSongDuration('1');
      this.updateSongDuration('2');
      this.updateSongDuration('3');
      this.updateSongDuration('4');
    });
  }
  RandomMusic() {
    const rndInt = this.randomIntFromInterval(1, 4)
    this.toggleSong(rndInt)
  }
  toggleSong(songId: number) {
    console.log("indexxx", songId)

    for (let i = 0; i <= 3; i++) {
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
  }

  setSongPlaying(songId: number, playing: boolean) {
    if (playing == true) {
      console.log("playing", playing)
      const play = document.getElementById(`songPlaying${songId}`) as HTMLElement
      play.classList.add("icon-pause");
      play.classList.remove("bi-play");

    }
    else {
      console.log("playing ffff", playing)
      const play = document.getElementById(`songPlaying${songId}`) as HTMLElement
      play.classList.add("bi-play");
    }

  }

  updateSongDuration(songId: string) {
    const audioPlayer = document.getElementById(`audioPlayer${songId}`) as HTMLAudioElement;
    const currentTime = Math.floor(audioPlayer.currentTime);

    if (currentTime && currentTime !== Infinity) {
      switch (songId) {
        case '1':
          this.song1Duration = currentTime;
          break;
        case '2':
          this.song2Duration = currentTime;
          break;
        case '3':
          this.song3Duration = currentTime;
          break;
        case '4':
          this.song4Duration = currentTime;
          break;
        default:
          break;
      }
    }
  }
}
