import { Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from './../../../../crud/utils/layout-utils.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AcountService } from 'src/app/services/Acount/acount.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent {
  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(private dialogRef: MatDialogRef<ChangePassComponent>, private router: Router, private _services_cookies: CookieService, private fb: FormBuilder, private acount_services: AcountService, private layoutUtilsService: LayoutUtilsService,) { }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        password_old: ["", Validators.required],

        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }
  onSubmit() {

    console.log("tttt", this.registerForm.controls["password_old"].value)

    if (this.registerForm.controls["password"].value != this.registerForm.controls["confirmPassword"].value) {
      this.layoutUtilsService.showActionNotification("Mật khẩu không khớp", MessageType.Delete, 4000, true, false, 3000, 'top', 0);

    }
    else {
      this.acount_services.ChangePass(this.registerForm.controls["password_old"].value, this.registerForm.controls["password"].value).subscribe(res => {
        if (res && res.status == 1) {
          this.dialogRef.close();

          this._services_cookies.deleteAll();
          localStorage.clear();
          this.router.navigateByUrl("/login")

          this.layoutUtilsService.showActionNotification("Đổi mật khẩu thành công !", MessageType.Delete, 4000, true, false, 3000, 'top', 1);
        }
        else {
          this.layoutUtilsService.showActionNotification("Mật khẩu cũ không chính xác", MessageType.Delete, 4000, true, false, 3000, 'top', 0);
        }
      }
      )
    }

  }
}


