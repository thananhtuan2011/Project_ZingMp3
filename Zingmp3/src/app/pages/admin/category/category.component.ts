import { LayoutUtilsService, MessageType } from './../../../components/crud/utils/layout-utils.service';
import { CategoryService } from './../../../services/Category/category.service';
import { environment } from './../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupingState } from 'src/app/models/grouping.model';
import { PaginatorState } from 'src/app/models/paginator.model';
import { SortState } from 'src/app/models/sort.model';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  pageHeight = window.innerHeight - 236;
  api = environment.HOST_API;
  api_type_song = this.api + "/api/typesong/GetAllType"
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
    public category_services: CategoryService,
    private dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  paginate(paginator: PaginatorState) {
    this.category_services.patchStateAllTypeSong({ paginator }, this.api_type_song);
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
    // this.category_services.patchStateAllCustomer({ sorting }, this.api_type_song);
  }

  LoadAllTypeSong() {
    const filter = {};
    this.category_services.patchStateAllTypeSong({ filter }, this.api_type_song);

  }
  Add() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
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
    this.paginator = this.category_services.paginator;

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

      // this.category_services.patchStateAllCustomer({ filter }, this.api_type_song);
    }
    else {

      const filter = {};


      this.category_services.patchStateAllCustomer({ filter }, this.api_type_song);
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
        this.category_services.deleteType(id).subscribe(res => {
          if (res) {
            this.LoadAllTypeSong();
            this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
          }

        })
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
    this.category_services.patchStateAllTypeSong({ filter }, this.api_type_song);
  }

}
