import { AcountService } from './../../../services/Acount/acount.service';
import { LayoutUtilsService, MessageType } from 'src/app/components/crud/utils/layout-utils.service';
import { MusicService } from 'src/app/services/Music/music.service';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSongPlaylistComponent } from '../add-song-playlist/add-song-playlist.component';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AddplayListComponent } from 'src/app/components/user/addplay-list/addplay-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showScrollbar = false;
  text = "";
  user: any
  InforUser: any;
  disabled = false;
  compact = true;
  invertX = false;
  invertY = false;
  constructor(private music_services: MusicService, private change: ChangeDetectorRef,
    private matdialog: MatDialog,
    private account_services: AcountService,
    private layoutUtilsService: LayoutUtilsService,
    private play_list_services: PlaylistService

  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  getWidth(): any {
    let tmp_height = 0;
    tmp_height = window.innerWidth - 236;
    return tmp_height + 'px';
  }
  listMusic: any[] = []

  GetRanDomMusic() {
    this.music_services.GetRanDomMusic().subscribe(res => {
      this.listMusic = res.data
      console.log("  this.listMusic", this.listMusic)
      this.change.detectChanges();
    })
  }
  listPlaylist: any[] = []
  GetPlayList() {
    this.play_list_services.GetPlayList().subscribe(res => {

      if (res) {
        this.listPlaylist = res.data
        console.log("listPlaylist", this.listPlaylist)
        this.change.detectChanges()
      }
    })
  }

  GetInforUser() {
    this.account_services.GetInforUser().subscribe(res => {
      this.InforUser = res.data;
      console.log("InforUser", this.InforUser)
      this.change.detectChanges();
    }
    )
  }
  ngOnInit(): void {
    this.GetRanDomMusic();
    this.GetInforUser();
    this.GetPlayList();
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
  goToLink(url: string, vip: boolean) {

    if (vip == true && this.user.vip != true) {
      this.layoutUtilsService.showActionNotification("Vui lòng nâng cấp tài khoản VIP để tải", MessageType.Delete, 4000, true, false, 3000, 'top', 0);

    }
    else {
      window.open(url, "_blank");
    }

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
      audioPlayer.addEventListener('ended', () => {
        // this.setSongPlaying(songId, false);
        audioPlayer.load()
        audioPlayer.play();
        // alert("The audio has ended");
      })

      this.setSongPlaying(songId, true);
    } else {
      showplay.classList.add("pauseloading")
      audioPlayer.pause();
      this.setSongPlaying(songId, false);
    }

    this.music_services.UpdateCountPlay(this.listMusic[songId].id_song).subscribe()
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
  CreatedPlayList() {
    const dialogRef = this.matdialog.open(AddplayListComponent, {
      width: '300px',
      height: '200px',
      // data: {  },
      // with:'500px',
      // panelClass: 'dialogcss'

    });
    dialogRef.afterClosed().subscribe((res: any) => {

      if (res) {
        this.GetPlayList()
      }
    })
  }
  AddLike(id_song: number) {

    let index = this.listMusic.findIndex(x => x.id_song == id_song)
    if (index >= 0) {
      if (this.listMusic[index].like_song == null) {
        this.listMusic[index].like_song = {
          id_song: id_song
        }

      }
      else {
        this.listMusic[index].like_song = null

      }

      this.music_services.AddLike(id_song, this.user.account_id).subscribe(res => {

      }
      )
      this.change.detectChanges();
    }

  }
  AddPlaylist(item: any) {
    const dialogRef = this.matdialog.open(AddSongPlaylistComponent, {
      width: '600px',
      data: item,
      // with:'500px',

      // panelClass:'no-padding'

    });

    dialogRef.afterClosed().subscribe(res => {

    }
    )
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
