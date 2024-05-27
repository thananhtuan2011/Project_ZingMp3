import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from 'src/app/services/Music/music.service';

@Component({
  selector: 'app-detail-play-song',
  templateUrl: './detail-play-song.component.html',
  styleUrls: ['./detail-play-song.component.scss']
})
export class DetailPlaySongComponent implements OnInit, OnDestroy {

  Song: any;
  isPlaying = false;
  id_song!: number;
  constructor(private renderer: Renderer2, private el: ElementRef
    , private music_services: MusicService,
    private route: ActivatedRoute,
    private change: ChangeDetectorRef


  ) { }

  GetDetailMusic(id: number) {
    this.music_services.GetDetailsong(id).subscribe(res => {
      this.Song = res.data;
      console.log("song", this.Song)
      this.change.detectChanges();
    }
    )
  }
  toggleSong() {


    const audioPlayer_close_all = document.getElementById(`audioPlayer`) as HTMLAudioElement;
    var showplay_check = document.getElementById(`showplay`) as HTMLElement
    // if (audioPlayer_close_all.played) {
    //   showplay_check.classList.add("pauseloading")
    //   audioPlayer_close_all.pause()
    // }


    const audioPlayer = document.getElementById(`audioPlayer`) as HTMLAudioElement;
    // const icon = document.querySelector(`i[data-song="${songId}"]`) as HTMLElement;
    var showplay = document.getElementById(`showplay`) as HTMLElement

    audioPlayer.load()
    audioPlayer.play();

  }
  ngOnDestroy(): void {
    const audioPlayer = document.getElementById(`audioPlayer`) as HTMLAudioElement;
    var showplay_check = document.getElementById(`showplay`) as HTMLElement
    if (audioPlayer.played) {
      audioPlayer.pause()
    }
    // alert("Destrou")
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id_song = +params.id;
      this.GetDetailMusic(this.id_song)
      setTimeout(() => {
        this.toggleSong();
      }, 1000);

    })
  }

  toggleRotate() {
    this.isPlaying = !this.isPlaying;
  }

  moveDivUp() {
    const div1 = this.el.nativeElement.querySelector('.ca');
    this.renderer.setStyle(div1, 'transform', 'translateY(-100%)');
  }
  moveDivDown() {
    const div1 = this.el.nativeElement.querySelector('.ca');
    this.renderer.setStyle(div1, 'transform', 'translateY(160%)');
  }

  showAlert() {
    // Swal.fire({
    //   title: 'Chức năng chưa được cập nhật',
    //   icon: 'error',
    //   timer: 3000,
    //   showConfirmButton: false,
    // });
  }
}
