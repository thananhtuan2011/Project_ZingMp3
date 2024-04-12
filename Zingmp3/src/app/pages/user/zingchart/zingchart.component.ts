import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zingchart',
  templateUrl: './zingchart.component.html',
  styleUrls: ['./zingchart.component.scss']
})
export class ZingchartComponent {

  products: Product[] = [];

  constructor(private http: HttpClient) {
    this.getProducts();
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
  getProducts() {
    this.http.get<any>('http://localhost:8080/api/products').subscribe(
      data => {
        this.products = data.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef;

  songPlaying: number | null = null;
  songDurations: number[] = [];

  ngAfterViewInit() {
    this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateSongDurations();
    });
  }

  toggleSong(index: number) {
    const audioPlayer = document.getElementById(`audioPlayer${index}`) as HTMLAudioElement;

    if (audioPlayer.paused) {
      this.pauseAllSongs(); // Dừng tất cả các bài hát đang chạy trước khi chạy bài hát mới
      audioPlayer.play();
      this.songPlaying = index;
    } else {
      audioPlayer.pause();
      this.songPlaying = -1; // Gán giá trị -1 để không có bài hát nào đang chạy
    }
  }

  pauseAllSongs() {
    const audioPlayers = document.getElementsByTagName('audio');
    for (let i = 0; i < audioPlayers.length; i++) {
      const audioPlayer = audioPlayers[i] as HTMLAudioElement;
      audioPlayer.pause();
    }
  }


  setSongPlaying(index: number | null) {
    this.songPlaying = index;
  }

  updateSongDurations() {
    const audioPlayer = this.audioPlayer.nativeElement as HTMLAudioElement;
    const currentTime = Math.floor(audioPlayer.currentTime);

    if (currentTime && currentTime !== Infinity && this.songPlaying !== null) {
      this.songDurations[this.songPlaying] = currentTime;
    }
  }

}
