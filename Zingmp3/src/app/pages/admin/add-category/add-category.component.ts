import { LayoutUtilsService, MessageType } from './../../../components/crud/utils/layout-utils.service';
import { CategoryService } from './../../../services/Category/category.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  typename!: string;
  type_description!: string;
  constructor(private dialogRef: MatDialogRef<AddCategoryComponent>
    , private _cate: CategoryService,
    private layoutUtilsService: LayoutUtilsService,
  ) {

  }
  _Back() {
    this.dialogRef.close();
  }
  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  Add() {
    let item = {
      typename: this.typename,
      type_description: this.type_description
    }

    this._cate.CreateType(item).subscribe(res => {
      if (res) {
        this.CloseDia(res)
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }
    }
    )
  }

  ngOnInit(): void {

  }

}
