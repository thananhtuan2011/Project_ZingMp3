import { LayoutUtilsService } from 'src/app/components/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AcountService } from 'src/app/services/Acount/acount.service';

@Component({
  selector: 'app-infor-user',
  templateUrl: './infor-user.component.html',
  styleUrls: ['./infor-user.component.scss']
})
export class InforUserComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  user: any;
  username!: string;
  InforUser: any;
  name!: string;
  phone!: string;
  address!: string;
  files: File[] = [];
  firstUserState: any;
  subscriptions: Subscription[] = [];
  avatarPic = 'none';

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _acount_services: AcountService,
    private layoutUtilsService: LayoutUtilsService,
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);


  }


  // GetInfor() {
  //   this.profile_serices.GetInforUser(this.user._id).subscribe(res => {

  //     console.log("resss", res)

  //   })
  // }
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
  list_image: any[] = []
  filename: any;
  onSelectFile_PDF(event: any) {
    const files = event.target.files;
    var reader = new FileReader();
    let cat: any;
    var file_name = event.target.files;
    this.filename = file_name[0].name;
    if (files) {
      reader.onload = (event: any) => {
        this.list_image.push(event.target.result);
        this.cdr.detectChanges();



      }
      reader.readAsDataURL(event.target.files[0]);

      //  console.log('this.list_image_Edit',this.list_image_Edit)
      this.files = files;
    }

  }
  GetInforUser() {
    this._acount_services.GetInforUser().subscribe(res => {
      console.log("rssss", res)
      if (res) {
        this.InforUser = res.data;
        this.address = Object.keys(this.InforUser.address).length == 0 ? "" : this.InforUser.address
        this.phone = Object.keys(this.InforUser.phone).length == 0 ? "" : this.InforUser.phone
        this.name = this.InforUser.full_name
        this.username = this.InforUser.user_name
        console.log("InforUser", this.InforUser)
      }
    }
    )
  }
  ngOnInit(): void {

    this.GetInforUser();

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      fullname: [this.user.fullname, Validators.required],
      phone: [this.user.phone, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
    });
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;
    this.user = Object.assign(this.user, formValues);

    // Do request to your server for user update, we just imitate user update there
    // setTimeout(() => {
    //   // update
    //   let item = {
    //     email: this.formGroup.controls['email'].value,
    //     fullname: this.formGroup.controls['fullname'].value,
    //     phone: this.formGroup.controls['phone'].value,
    //     avatar: "http://localhost:3000/uploads/" + this.filename,
    //   }
    //   this.profile_serices.updateAcount(item, this.user.account_id).subscribe(res => {
    //     if (res) {

    //       if (this.list_image.length > 0) {
    //         this.onUpload();
    //       }

    //       localStorage.setItem("user", JSON.stringify(res));
    //       this.profile_serices.ReloadData$.next(true)
    //       this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
    //     }

    //   })
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);
  }
  // submit() {
  //   let datee = new Date()
  //   let item = {
  //     email: this.email,
  //     fullname: this.tennv,
  //     phone: this.phone,
  //     department_id: this.selected,
  //     createdAt: datee,
  //     updatedAt: null
  //     // departmentName: this.tenphongban
  //   }
  //   this._acount_services.updateAcount(item, this.data.item.account_id).subscribe(res => {
  //     if (res) {
  //       this.layoutUtilsService.showActionNotification("Successfully", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
  //       this.CloseDia(res);
  //     }

  //   })
  // }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  getPic() {
    if (!this.user.pic) {
      return 'none';
    }

    return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = '';
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
}