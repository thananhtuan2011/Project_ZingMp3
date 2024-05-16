import { LayoutUtilsService, MessageType } from './../../../components/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  typename!: string;
  type_id!: number;
  img_update!: string;
  type_description!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UpdateCategoryComponent>
    , private _cate: CategoryService, private cdr: ChangeDetectorRef,
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
      type_description: this.type_description,
      base64: this.base64 == undefined ? "" : this.base64,
      file_name: this.filename_image == undefined ? "" : this.filename_image
    }


    this._cate.UpdateType(this.type_id, item).subscribe(res => {
      if (res) {
        this.CloseDia(res)
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }
    }
    )
  }
  base64: any
  filename_image: any
  list_image: any[] = [];
  onSelectFile_Image(event: any) {
    this.list_image = []
    const files = event.target.files;
    var reader = new FileReader();
    let base64Str: any;
    let cat: any;
    var file_name = event.target.files;
    this.filename_image = file_name[0].name;
    if (files) {
      reader.onload = (event: any) => {
        this.list_image.push(event.target.result);
        var metaIdx1 = event.target.result.toString().indexOf(';base64,');
        base64Str = event.target.result.toString().substr(metaIdx1 + 8);
        this.base64 = base64Str;
        console.log('ssss', this.base64)
        this.cdr.detectChanges();




      }
      reader.readAsDataURL(event.target.files[0]);

      //  console.log('this.list_image_Edit',this.list_image_Edit)
    }

  }

  ngOnInit(): void {
    this.list_image = [];
    this.type_id = this.data.item.type_id;
    this.typename = this.data.item.typename
    this.type_description = this.data.item.type_description
    this.img_update = this.data.item.img

  }
}
