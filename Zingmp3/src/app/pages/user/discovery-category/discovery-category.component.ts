import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-discovery-category',
  templateUrl: './discovery-category.component.html',
  styleUrls: ['./discovery-category.component.scss']
})
export class DiscoveryCategoryComponent implements OnInit {
  type_id!: number;
  constructor(
    private route: ActivatedRoute, private chane: ChangeDetectorRef, private cate_services: CategoryService) {

  }

  Playlistdetail: any;
  Playlist_song: any[] = [];


  LoadDetailPlay(id: number) {
    // this.cate_services.GetPlayListDetail(id).subscribe(res => {

    //   if (res) {
    //     this.Playlistdetail = res.data;
    //     console.log("Playlistdetail", this.Playlistdetail)
    //     this.chane.detectChanges();
    //   }
    // }
    // )
  }
  GetPlayListSong(id: number) {
    // this.cate_services.GetPlayListSong(id).subscribe(res => {
    //   console.log("res", res)
    //   if (res) {

    //     this.Playlist_song = res.data;
    //     console.log("Playlist_song", this.Playlist_song)
    //     this.chane.detectChanges();
    //   }
    // }
    // )
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.type_id = +params.id;
      console.log("type_id", this.type_id)
      // this.LoadDetailPlay(this.playlist_id)
      // this.GetPlayListSong(this.playlist_id)


    })
  }

}
