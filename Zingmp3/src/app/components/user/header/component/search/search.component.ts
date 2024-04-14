import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  data: any = [];
  propChanges: any;

  result!: any[];
  tam!: any[];
  item: any[] = [];
  list_baidang: any[] = [

    {
      TenLoai: "Nhạc Trẻ",
      title: "nhạc test",
      NoiDung: "Điều em lo sợ"

    },
    {
      TenLoai: "Bolero",
      title: "Ca sĩ phong  hào",
      NoiDung: "Về đâu"

    },
    {
      TenLoai: "Remix",
      title: "Lương minh trang",
      NoiDung: "Yêu em"

    }

  ];
  public searchControl: FormControl = new FormControl();
  loading!: boolean;
  @Input() myValProp!: string;
  searchText!: string;
  constructor(private cdr: ChangeDetectorRef,
    // private _services:PageHomeService,

  ) { }
  ngOnChanges(changes: SimpleChanges) {

    this.propChanges = changes;
    this.searchText = this.propChanges.myValProp.currentValue;
    this.data = null;

    if (this.searchText.length > 1) {
      this.loading = true;
      this.tam = this._filterStates(this.searchText);
      console.log("tttttt", this.tam)
      setTimeout(() => {
        // Uncomment this. Right now it's just mock
        // this.data = this.searchInData(e.target.value);
        this.data = this.tam.slice();
        this.loading = false;
        console.log("  this.data", this.data)
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      }, 100);
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

  private _filterStates(value: string): any[] {
    // debugger
    //	const filterValue = value.toLowerCase();
    const filterValue = this._normalizeValue(value);
    return this.list_baidang.filter(state => this._normalizeValue(state.NoiDung).includes(filterValue));
  }

}
