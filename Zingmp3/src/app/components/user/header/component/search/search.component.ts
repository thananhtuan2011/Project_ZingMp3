import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MusicService } from 'src/app/services/Music/music.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  data: any = [];
  @Output() Router_song: EventEmitter<any> = new EventEmitter();
  api = environment.HOST_API;
  propChanges: any;
  api_type_song = this.api + "/api/song/GetAllSong"
  result!: any[];
  tam!: any[];
  item: any[] = [];

  public searchControl: FormControl = new FormControl();
  loading!: boolean;
  @Input() myValProp!: string;
  searchText!: string;
  constructor(private cdr: ChangeDetectorRef,

    public music_serives: MusicService
    // private _services:PageHomeService,

  ) { }
  ngOnChanges(changes: SimpleChanges) {

    this.propChanges = changes;
    this.searchText = this.propChanges.myValProp.currentValue;
    this.data = null;

    if (this.searchText.length > 1) {
      this.loading = true;
      this.search_music(this.searchText)
      // this.tam = this._filterStates(this.searchText);
      // console.log("tttttt", this.tam)
      // setTimeout(() => {
      //   // Uncomment this. Right now it's just mock
      //   // this.data = this.searchInData(e.target.value);
      //   this.data = this.tam.slice();
      //   this.loading = false;
      //   console.log("  this.data", this.data)
      //   this.cdr.detectChanges();
      //   this.cdr.markForCheck();
      // }, 100);
    }

  }

  search_music(value: any) {
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
  ngOnInit(): void {

    this.LoadDSBaiDang();

  }

  /**
   * Search
   * @param e: Event
   */
  search() {

  }
  /**
   * Clear search
   *
   * @param e: Event
   */
  clear(e: any) {
    this.data = null;
    this.searchInput.nativeElement.value = '';
  }
  Router_Action() {
    this.Router_song.emit(true);
  }
  RemoveSearch() {
    // this._services.share$.next(true);
  }
  LoadDSBaiDang() {
    //   const queryParams1 = new QueryParamsModelNew(
    // 		{}
    // );


    // 	this._services.Get_Social(this._services.rt_allPost)
    //   .subscribe(res=>
    //     {
    //       this.list_baidang=res.data;
    //       this.cdr.detectChanges();
    //     })


  }

  // openChange() {
  //   setTimeout(() => this.searchInput.nativeElement.focus());
  // }

  showCloseButton() {
    return this.data && this.data.length && !this.loading;
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // private _filterStates(value: string): any[] {
  //   // debugger
  //   //	const filterValue = value.toLowerCase();
  //   const filterValue = this._normalizeValue(value);
  //   return this.list_baidang.filter(state => this._normalizeValue(state.NoiDung).includes(filterValue));
  // }

}
