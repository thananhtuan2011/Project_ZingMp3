import { Component } from '@angular/core';
import { PaymentService } from 'src/app/services/payment_.service';
import { LayoutUtilsService, MessageType } from '../../crud/utils/layout-utils.service';

@Component({
  selector: 'app-add-hoi-vien',
  templateUrl: './add-hoi-vien.component.html',
  styleUrls: ['./add-hoi-vien.component.scss']
})
export class AddHoiVienComponent {
  amount!: number;
  user: any;
  constructor(private payment_services: PaymentService) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }

  Pay() {
    this.payment_services.Payment(this.amount).subscribe(res => {

      window.open(res, "_blank")
    }
    )
  }
}
