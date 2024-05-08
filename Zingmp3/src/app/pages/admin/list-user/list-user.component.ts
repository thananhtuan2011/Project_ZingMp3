import { AcountService } from './../../../services/Acount/acount.service';
import { LayoutUtilsService } from './../../../components/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupingState } from 'src/app/models/grouping.model';
import { PaginatorState } from 'src/app/models/paginator.model';
import { SortState } from 'src/app/models/sort.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  pageHeight = window.innerHeight - 236;
  api = environment.HOST_API;
  api_all_acount = this.api + "/api/acount/GetAllUser"
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
    public acount_serives: AcountService,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  paginate(paginator: PaginatorState) {
    this.acount_serives.patchStateAllAcount({ paginator }, this.api_all_acount);
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
    // this.acount_serives.patchStateAllCustomer({ sorting }, this.api_all_acount);
  }

  LoadAllTypeSong() {
    const filter = {};
    this.acount_serives.patchStateAllAcount({ filter }, this.api_all_acount);

  }





  ngOnInit(): void {
    this.LoadAllTypeSong();
    this.paginator = this.acount_serives.paginator;

  }

  saverange(value: any) {
    this.search(value)

  }

  search(value: any) {
    // filter.HOTEN =filter;
    //  this.accountManagementService.patchState({ filter }

    if (value != "") {


      const filter: any = {};
      filter['customerName'] = value

      // this.acount_serives.patchStateAllCustomer({ filter }, this.api_all_acount);
    }
    else {

      const filter = {};


      this.acount_serives.patchStateAllCustomer({ filter }, this.api_all_acount);
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
        // this.acount_serives.deleteType(id).subscribe(res => {
        //   if (res) {
        //     this.LoadAllTypeSong();
        //     this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        //   }

        // })
      }

    });
  }
  Update(item: any) {

    // const dialogRef = this.dialog.open(UpdateCustomerComponent, {
    //   height: '600px',

    //   data: { item },

    //   // panelClass:'no-padding'

    // });
    // dialogRef.afterClosed().subscribe(res => {

    //   if (res) {
    //     this.LoadAllCustomer()
    //   }
    // })

  }
  listExport: any[] = [];



  onDepartmentSelection() {

    const filter = { idsuppliers: this.selected };
    this.acount_serives.patchStateAllAcount({ filter }, this.api_all_acount);
  }
}
