import { LayoutUtilsService } from './../../../components/crud/utils/layout-utils.service';
import { PaginatorState } from 'src/app/models/paginator.model';
import { environment } from './../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GroupingState } from 'src/app/models/grouping.model';
import { SortState } from 'src/app/models/sort.model';
import { MatDialog } from '@angular/material/dialog';
import { RadioServiceService } from 'src/app/services/Radio/radio-service.service';
import { AddRadioComponent } from '../add-radio/add-radio.component';

@Component({
  selector: 'app-load-radio',
  templateUrl: './load-radio.component.html',
  styleUrls: ['./load-radio.component.scss']
})
export class LoadRadioComponent implements OnInit {
  pageHeight = window.innerHeight - 236;
  api = environment.HOST_API;
  api_type_song = this.api + "/api/radio/GetAllRadio"
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
    public radio_serives: RadioServiceService,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  paginate(paginator: PaginatorState) {
    this.radio_serives.patchStateAllRadio({ paginator }, this.api_type_song);
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
    // this.radio_serives.patchStateAllCustomer({ sorting }, this.api_type_song);
  }

  LoadAllTypeSong() {
    const filter = {};
    this.radio_serives.patchStateAllRadio({ filter }, this.api_type_song);

  }
  AddRadio() {
    const dialogRef = this.dialog.open(AddRadioComponent, {
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
    this.paginator = this.radio_serives.paginator;

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
      this.radio_serives.patchStateAllRadio({ filter }, this.api_type_song);
    }
    else {

      const filter = {};


      this.radio_serives.patchStateAllRadio({ filter }, this.api_type_song);
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
        // this.radio_serives.DeleteSong(id).subscribe(res => {
        //   if (res) {
        //     this.LoadAllTypeSong();
        //     this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        //   }

        // })
      }

    });
  }
  Update(item: any) {

    // const dialogRef = this.dialog.open(UpdateSongComponent, {
    //   width: '600px',
    //   data: { item },

    //   // panelClass:'no-padding'

    // });
    // dialogRef.afterClosed().subscribe(res => {

    //   if (res) {
    //     this.LoadAllTypeSong()
    //   }
    // })

  }
  listExport: any[] = [];



  onDepartmentSelection() {

    const filter = { idsuppliers: this.selected };
    this.radio_serives.patchStateAllRadio({ filter }, this.api_type_song);
  }
}
