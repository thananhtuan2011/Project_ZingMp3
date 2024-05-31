import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { HttpClient } from '@angular/common/http';
import { MusicService } from 'src/app/services/Music/music.service';

@Component({
  selector: 'app-zingchart',
  templateUrl: './zingchart.component.html',
  styleUrls: ['./zingchart.component.scss']
})
export class ZingchartComponent implements OnInit {

  ListTop3: any[] = []
  constructor(private music_services: MusicService, private change: ChangeDetectorRef) {
    // this.getProducts();
  }

  GetTop3() {
    this.music_services.GetTop3Music().subscribe(res => {
      this.ListTop3 = res.data;
      console.log("ListTop3", this.ListTop3)
      this.change.detectChanges();
    }
    )
  }


  ngOnInit(): void {

    this.GetTop3();

  }
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




  // RandomMusic() {
  //   const rndInt = this.randomIntFromInterval(1, 4)
  //   this.toggleSong(rndInt.toString())
  // }
  toggleSong(songId: number) {

    for (let i = 0; i <= 2; i++) {
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
  colorScheme = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A']
  };

  data = [
    {
      "name": "Hẹn em kiếp sau",
      "series": [
        {
          "name": "Jan",
          "value": 140
        },
        {
          "name": "Feb",
          "value": 60
        },
        {
          "name": "Mar",
          "value": 50
        },
        {
          "name": "Apr",
          "value": 25
        },
        {
          "name": "May",
          "value": 16
        },
        {
          "name": "Jun",
          "value": 19
        },
        {
          "name": "Jul",
          "value": 43
        },
        {
          "name": "Aug",
          "value": 30
        },
        {
          "name": "Sep",
          "value": 35
        },
        {
          "name": "Oct",
          "value": 4
        },
        {
          "name": "Nov",
          "value": 17
        },
        {
          "name": "Dec",
          "value": 14
        },
        {
          "name": "Jan",
          "value": 35
        }
      ]
    },

    {
      "name": "Ngày mai yêu",
      "series": [
        {
          "name": "Jan",
          "value": 140
        },
        {
          "name": "Feb",
          "value": 60
        },
        {
          "name": "Mar",
          "value": 520
        },
        {
          "name": "Apr",
          "value": 215
        },
        {
          "name": "May",
          "value": 126
        },
        {
          "name": "Jun",
          "value": 149
        },
        {
          "name": "Jul",
          "value": 43
        },
        {
          "name": "Aug",
          "value": 30
        },
        {
          "name": "Aug",
          "value": 364
        },
        {
          "name": "Sep",
          "value": 412
        },
        {
          "name": "Oct",
          "value": 437
        },
        {
          "name": "Nov",
          "value": 437
        },
        {
          "name": "Dec",
          "value": 364
        },
        {
          "name": "Jan",
          "value": 412
        }
      ]
    },
    {
      "name": "Tình đầu",
      "series": [
        {
          "name": "Jan",
          "value": 140
        },
        {
          "name": "Feb",
          "value": 200
        },
        {
          "name": "Mar",
          "value": 120
        },
        {
          "name": "Apr",
          "value": 234
        },
        {
          "name": "May",
          "value": 160
        },
        {
          "name": "Jun",
          "value": 190
        },
        {
          "name": "Jul",
          "value": 43
        },
        {
          "name": "Aug",
          "value": 30
        },
        {
          "name": "Aug",
          "value": 168
        },
        {
          "name": "Sep",
          "value": 343
        },
        {
          "name": "Oct",
          "value": 512
        },
        {
          "name": "Nov",
          "value": 291
        },
        {
          "name": "Dec",
          "value": 168
        },
        {
          "name": "Jan",
          "value": 343
        },
      ]
    }
  ]
  // getProducts() {
  //   this.http.get<any>('http://localhost:8080/api/products').subscribe(
  //     data => {
  //       this.products = data.data;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }


  songPlaying: number | null = null;
  songDurations: number[] = [];

  ngAfterViewInit() {
    this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateSongDuration('1');
      this.updateSongDuration('2');
      this.updateSongDuration('3');
      this.updateSongDuration('4');
    });
    this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateSongDurations();
    });
  }

  // toggleSong(index: number) {
  //   const audioPlayer = document.getElementById(`audioPlayer${index}`) as HTMLAudioElement;

  //   if (audioPlayer.paused) {
  //     this.pauseAllSongs(); // Dừng tất cả các bài hát đang chạy trước khi chạy bài hát mới
  //     audioPlayer.play();
  //     this.songPlaying = index;
  //   } else {
  //     audioPlayer.pause();
  //     this.songPlaying = -1; // Gán giá trị -1 để không có bài hát nào đang chạy
  //   }
  // }

  pauseAllSongs() {
    const audioPlayers = document.getElementsByTagName('audio');
    for (let i = 0; i < audioPlayers.length; i++) {
      const audioPlayer = audioPlayers[i] as HTMLAudioElement;
      audioPlayer.pause();
    }
  }


  // setSongPlaying(index: number | null) {
  //   this.songPlaying = index;
  // }

  updateSongDurations() {
    const audioPlayer = this.audioPlayer.nativeElement as HTMLAudioElement;
    const currentTime = Math.floor(audioPlayer.currentTime);

    if (currentTime && currentTime !== Infinity && this.songPlaying !== null) {
      this.songDurations[this.songPlaying] = currentTime;
    }
  }

}
