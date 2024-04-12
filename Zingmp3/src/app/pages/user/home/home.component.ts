import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef;

  song1Playing: boolean = false;
  song2Playing: boolean = false;
  song3Playing: boolean = false;
  song4Playing: boolean = false;
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
    this.toggleSong(rndInt.toString())
  }
  toggleSong(songId: string) {

    for (let i = 1; i <= 4; i++) {
      if (i.toString() !== songId) {

        this.setSongPlaying(i.toString(), false)
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

  setSongPlaying(songId: string, playing: boolean) {
    switch (songId) {
      case '1':
        this.song1Playing = playing;
        break;
      case '2':
        this.song2Playing = playing;
        break;
      case '3':
        this.song3Playing = playing;
        break;
      case '4':
        this.song4Playing = playing;
        break;
      default:
        break;
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
