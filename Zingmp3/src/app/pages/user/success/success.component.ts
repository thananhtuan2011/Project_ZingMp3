import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcountService } from 'src/app/services/Acount/acount.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  user: any;
  constructor(private router: Router, private _acount_services: AcountService) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }

  ngOnInit(): void {
    this.UpdatePay()
  }
  UpdatePay() {

    this._acount_services.UpdateVip(this.user.account_id).subscribe(res => {
      if (res) {
        console.log("res", res)
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    }
    )

  }
  Goback() {
    this.router.navigate(['/home']);
  }
}
