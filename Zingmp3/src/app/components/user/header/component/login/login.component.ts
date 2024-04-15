import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
const DOMAIN = environment.DOMAIN_COOKIES
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  radiovalue!: any;
  name!: string;
  email!: string;
  lastname!: string;
  firstname!: string
  username!: string;
  password!: string;
  pass!: string;
  badUserNamePass: boolean;
  verificationPending: boolean;
  constructor(private router: Router,
    private cookieService: CookieService,
    private auth: AuthService
  ) {
    this.badUserNamePass = false;
    this.verificationPending = false;
  }
  @ViewChild('container') container: ElementRef | undefined;

  toggleActiveState() {
    if (this.container) {
      this.container.nativeElement.classList.add('active');
    }
  }

  toggleInactiveState() {
    if (this.container) {
      this.container.nativeElement.classList.remove('active');
    }
  }

  BackHome() {
    this.router.navigate(['']);
  }

  // ItemAccount(): AcountModel {

  //   const item = new AcountModel();
  //   item.firstName = this.firstname;
  //   item.lastName = this.lastname;
  //   item.username = this.username;
  //   item.email = this.email;
  //   item.password = this.pass;
  //   item.role = this.radiovalue

  //   return item
  // }
  login() {

    this.auth
      .Login(this.username, this.password)
      .subscribe((obj: any) => {
        console.log("objobj", obj)
        // if (obj.status === 'success') {
        //   this.cookieService.set("access_token", 'tét', 365, '/', DOMAIN);
        //   localStorage.setItem("roles", JSON.stringify(obj.role));
        //   localStorage.setItem("user", JSON.stringify(obj.result));

        //     this.router.navigate(['Home']);

        // } 
      });


  }

  register() {
    // if (this.radiovalue) {


    //   let item = this.ItemAccount();
    //   this.userService.createUser(item).subscribe(res => {
    //     if (res.status == 1) {
    //       alert("success");
    //       this.password = item.password
    //       this.toggleInactiveState();
    //     }
    //     else {
    //       alert("username is inval");
    //     }
    //   })
    // }
    // else {
    //   alert("Please choose roles");
    // }
  }
  radioChange() {
    // console.log("ffff", this.radiovalue)
  }
}