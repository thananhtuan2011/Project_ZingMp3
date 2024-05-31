import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutUtilsService, MessageType } from 'src/app/components/crud/utils/layout-utils.service';
import { MusicService } from 'src/app/services/Music/music.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-load-playlist',
  templateUrl: './load-playlist.component.html',
  styleUrls: ['./load-playlist.component.scss']
})
export class LoadPlaylistComponent implements OnInit {
  playlist_id!: number;
  showedit: boolean = false
  constructor(
    private _music_services: MusicService,
    private layoutUtilsService: LayoutUtilsService,
    private route: ActivatedRoute, private chane: ChangeDetectorRef, private play_services: PlaylistService) {

  }
  nameplaylist!: string;
  Playlistdetail: any;
  ListSong10: any[] = [];
  Playlist_song: any[] = [];

  GetRanDom10Music() {
    this._music_services.GetRanDom10Music().subscribe(res => {
      this.ListSong10 = res.data;
      this.chane.detectChanges();
    }
    )
  }
  edit() {
    this.showedit = true
  }
  LoadDetailPlay(id: number) {
    this.play_services.GetPlayListDetail(id).subscribe(res => {

      if (res) {
        this.Playlistdetail = res.data;
        this.nameplaylist = this.Playlistdetail.playlist_name
        this.chane.detectChanges();
      }
    }
    )
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
  toggleSong(songId: number) {

    for (let i = 0; i <= this.ListSong10.length - 1; i++) {
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

    this.CloseAllSongPlaylist();
  }
  _Back() {
    this.showedit = false
  }
  Save() {

  }
  GetPlayListSong(id: number) {
    this.play_services.GetPlayListSong(id).subscribe(res => {
      console.log("res", res)
      if (res && res.data) {

        this.Playlist_song = res.data.song;
        console.log("Playlist_song", this.Playlist_song)
        this.chane.detectChanges();
      }
      else {
        this.Playlist_song = []
      }
    }
    )
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.playlist_id = +params.id;
      this.GetRanDom10Music();
      this.LoadDetailPlay(this.playlist_id)
      this.GetPlayListSong(this.playlist_id)


    })
  }

  RemoveSong_InPlayList(id_song: number) {
    this.play_services.RemoveSong_InPlayList(id_song, this.playlist_id).subscribe(res => {
      this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      this.LoadDetailPlay(this.playlist_id)
      this.GetPlayListSong(this.playlist_id)
    }
    )
  }


  setSongPlaying2(songId: number, playing: boolean) {
    if (playing == true) {
      const play = document.getElementById(`songPlaying2${songId}`) as HTMLElement
      play.classList.add("icon-pause");
      play.classList.remove("bi-play");

    }
    else {
      const play = document.getElementById(`songPlaying2${songId}`) as HTMLElement
      play.classList.add("bi-play");
    }

  }
  CloseAllSong() {
    for (let i = 0; i <= this.ListSong10.length - 1; i++) {

      this.setSongPlaying(i, false)
      const audioPlayer_close_all = document.getElementById(`audioPlayer${i}`) as HTMLAudioElement;
      var showplay_check = document.getElementById(`showplay${i}`) as HTMLElement
      if (audioPlayer_close_all.played) {
        showplay_check.classList.add("pauseloading")
        audioPlayer_close_all.pause()


      }
      const audioPlayer = document.getElementById(`audioPlayer${i}`) as HTMLAudioElement;
      const icon = document.querySelector(`i[data-song="${i}"]`) as HTMLElement;

      var showplay = document.getElementById(`showplay${i}`) as HTMLElement

      showplay.classList.add("pauseloading")
      audioPlayer.pause();
      this.setSongPlaying(i, false);
    }
  }
  CloseAllSongPlaylist() {
    for (let i = 0; i <= this.Playlist_song.length - 1; i++) {

      this.setSongPlaying2(i, false)
      const audioPlayer_close_all = document.getElementById(`audioPlayer2${i}`) as HTMLAudioElement;
      var showplay_check = document.getElementById(`showplay2${i}`) as HTMLElement
      if (audioPlayer_close_all.played) {
        showplay_check.classList.add("pauseloading")
        audioPlayer_close_all.pause()


      }
      const audioPlayer = document.getElementById(`audioPlayer2${i}`) as HTMLAudioElement;
      const icon = document.querySelector(`i[data-song="${i}"]`) as HTMLElement;

      var showplay = document.getElementById(`showplay2${i}`) as HTMLElement

      showplay.classList.add("pauseloading")
      audioPlayer.pause();
      this.setSongPlaying(i, false);
    }
  }
  toggleSong2(songId: number) {

    for (let i = 0; i <= this.Playlist_song.length - 1; i++) {
      if (i.toString() !== songId.toString()) {
        this.setSongPlaying2(i, false)
        const audioPlayer_close_all = document.getElementById(`audioPlayer2${songId}`) as HTMLAudioElement;
        var showplay_check = document.getElementById(`showplay2${songId}`) as HTMLElement
        if (audioPlayer_close_all.played) {
          showplay_check.classList.add("pauseloading")
          audioPlayer_close_all.pause()
        }
        else {
          this.setSongPlaying2(songId, false);
        }
      }

    }
    const audioPlayer = document.getElementById(`audioPlayer2${songId}`) as HTMLAudioElement;
    const icon = document.querySelector(`i[data-song="${songId}"]`) as HTMLElement;

    var showplay = document.getElementById(`showplay2${songId}`) as HTMLElement
    if (audioPlayer.paused) {
      showplay.classList.remove("pauseloading")
      audioPlayer.load()
      audioPlayer.play();
      this.setSongPlaying2(songId, true);
    } else {
      showplay.classList.add("pauseloading")
      audioPlayer.pause();
      this.setSongPlaying2(songId, false);
    }
    this.CloseAllSong();
  }

}
