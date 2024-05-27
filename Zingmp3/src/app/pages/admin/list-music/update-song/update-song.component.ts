import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LayoutUtilsService, MessageType } from 'src/app/components/crud/utils/layout-utils.service';
import { CategoryService } from 'src/app/services/Category/category.service';
import { MusicService } from 'src/app/services/Music/music.service';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.scss']
})
export class UpdateSongComponent implements OnInit {
  isuploadfile: boolean = false
  image_default!: string;
  song_name_default!: string;
  namesinger!: string;
  files: File[] = [];
  radioSelected: any = 0
  listGroup: any = [
    {
      vip: "VIP", value: 1
    },
    {
      vip: "Normal", value: 0
    },
  ]
  selected_customer: any
  filename_image!: string;
  selectedcode: any;
  selectedreview: any;
  selectedtype: any = "Phiếu thu";
  selectedpay: any = "Tiền mặt";
  selectedplan: any;;
  customer: any;
  lyrics!: string;
  user: any;
  listAllCategory: any[] = [];
  listStatus: any[] = [];
  formGroup!: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateSongComponent>,
    private cdr: ChangeDetectorRef,
    private music_services: MusicService,
    public category_services: CategoryService,
    private layoutUtilsService: LayoutUtilsService,
  ) { }

  CloseDia(data = undefined) {
    this.dialogRef.close(data);
  }
  _Back() {
    this.dialogRef.close();
  }
  getAll_category() {
    let body = {
      "filter": {
      },
      "paginator": {
        "total": 0,
        "totalpage": 0,
        "page": 1,
        "pageSize": 10000,
        "pageSizes": [
          0
        ]
      },

      "searchTerm": "string",
      "sorting": {
        "column": "",
        "direction": ""
      }
    }
    this.category_services.getAll_category(body).subscribe(res => {
      this.listAllCategory = res.data;
      console.log("listAllCategory", this.listAllCategory)
      this.cdr.detectChanges();
    })
  }

  ngOnInit(): void {
    this.base64 = "";
    this.getAll_category();
    console.log("Update dataa", this.data)
    // formData.append("singer_name", this.namesinger);
    // formData.append("base64", this.base64);
    // formData.append("file_name_image", this.filename_image);
    // formData.append("type_id", this.selectedcode);
    // formData.append("vip", this.radioSelected);
    // formData.append("lyrics", this.lyrics);
    // formData.append("song_name", this.list_music[0]);
    this.radioSelected = this.data.item.vip == true ? 1 : 0
    this.namesinger = this.data.item.singer_name
    this.image_default = this.data.item.image
    this.lyrics = this.data.item.lyrics
    this.selectedcode = this.data.item.type_id
    this.selectedcode = this.data.item.type_id
    this.song_name_default = this.data.item.song_name

  }


  Save() {

    const formData = new FormData();

    [...this.files].forEach((file) => {
      formData.append("file", file, file.name);
    });

    formData.append("singer_name", this.namesinger);
    formData.append("base64", this.base64);
    formData.append("id_song", this.data.item.id_song);
    formData.append("file_name_image", this.filename_image);
    formData.append("type_id", this.selectedcode);
    formData.append("vip", this.radioSelected);
    formData.append("lyrics", this.lyrics);
    if (this.song_name_default) {
      formData.append("song_name", this.song_name_default);
    }
    else {
      formData.append("song_name", this.list_music[0]);

    }
    // this._thuchi_services.UploadFile(formData).subscribe(res => {

    // })

    // let item = [{
    //   singer_name: this.namesinger,
    //   type_id: this.selectedcode,
    //   song_name: this.list_music[0],
    //   file: formData
    // }]
    this.music_services.UpdateSong(formData).subscribe(res => {
      if (res) {
        this.CloseDia(res)
        this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
      }
    }
    )
  }




  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }


  onDepartmentSelection() {

  }
  base64: any
  list_image: any[] = [];
  onSelectFile_Image(event: any) {
    this.list_image = []
    this.isuploadfile = true;
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
      this.files = files;
    }

  }

  list_music: any[] = [];
  onSelectFile_PDF(event: any) {
    this.list_music = []
    this.isuploadfile = true;
    const files = event.target.files;
    var reader = new FileReader();
    let cat: any;
    var file_name = event.target.files;
    // this.filename = file_name[0].name;
    this.list_music.push(file_name[0].name)
    console.log("thisss music", this.list_music)
    // if (files) {
    //   reader.onload = (event: any) => {
    //     this.list_music.push(event.target.result);
    //     this.cdr.detectChanges();




    //   }
    //   reader.readAsDataURL(event.target.files[0]);

    //   //  console.log('this.list_music_Edit',this.list_music_Edit)
    //   this.files = files;
    // }
    this.files = files;
  }
  onUpload() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append("files", file, file.name);
      });

      // this._thuchi_services.UploadFile(formData).subscribe(res => {

      // })


    }
  }

}
