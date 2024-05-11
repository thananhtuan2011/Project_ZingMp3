import { LayoutUtilsService, MessageType } from './../../../components/crud/utils/layout-utils.service';
import { CategoryService } from './../../../services/Category/category.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
      base64: this.base64,
      file_name: this.filename_image
    }

    this._cate.CreateType(item).subscribe(res => {
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

  }

}
