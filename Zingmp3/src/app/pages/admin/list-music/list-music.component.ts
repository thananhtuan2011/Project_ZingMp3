import { LayoutUtilsService, MessageType } from './../../../components/crud/utils/layout-utils.service';
import { PaginatorState } from 'src/app/models/paginator.model';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SortState } from 'src/app/models/sort.model';
import { GroupingState } from 'src/app/models/grouping.model';
import { MatDialog } from '@angular/material/dialog';
import { MusicService } from 'src/app/services/Music/music.service';
import { AddMusicComponent } from './add-music/add-music.component';
import { UpdateSongComponent } from './update-song/update-song.component';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss']
})
export class ListMusicComponent implements OnInit {
  pageHeight = window.innerHeight - 236;
  api = environment.HOST_API;
  api_type_song = this.api + "/api/song/GetAllSong"
  paginator!: PaginatorState;
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  listSup: any[] = [];
  searchtext!: string
  selected: any;
  sorting!: SortState;
  grouping!: GroupingState;
  isLoading!: boolean;
  user: any
  constructor(
    public music_serives: MusicService,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  paginate(paginator: PaginatorState) {
    this.music_serives.patchStateAllSong({ paginator }, this.api_type_song);
  }
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    // this.music_serives.patchStateAllCustomer({ sorting }, this.api_type_song);
  }

  LoadAllTypeSong() {
    const filter = {};
    this.music_serives.patchStateAllSong({ filter }, this.api_type_song);

  }
  Add() {
    const dialogRef = this.dialog.open(AddMusicComponent, {
      width: '600px',
      // data: {  },
      // with:'500px',

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllTypeSong()
      }
    })


  }




  ngOnInit(): void {
    this.LoadAllTypeSong();
    this.paginator = this.music_serives.paginator;

  }

  saverange(value: any) {
    this.search(value)

  }

  search(value: any) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter: any = {};
      filter['song_name'] = value
      this.music_serives.patchStateAllSong({ filter }, this.api_type_song);
    }
    else {

      const filter = {};


      this.music_serives.patchStateAllSong({ filter }, this.api_type_song);
    }

  }
  Delete(id: any) {
    const _title = 'Xóa';
    const _description = 'Bạn có muốn xóa không ?';
    const _waitDesciption = 'Dữ liệu đang được xử lý';
    const _deleteMessage = 'Xóa thành công !';
    const _erroMessage = 'Thất bại !';
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        this.music_serives.DeleteSong(id).subscribe(res => {
          if (res) {
            this.LoadAllTypeSong();
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  Update(item: any) {

    const dialogRef = this.dialog.open(UpdateSongComponent, {
      width: '600px',
      data: { item },

      // panelClass:'no-padding'

    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.LoadAllTypeSong()
      }
    })

  }
  listExport: any[] = [];



  onDepartmentSelection() {

    const filter = { idsuppliers: this.selected };
    this.music_serives.patchStateAllSong({ filter }, this.api_type_song);
  }
}
