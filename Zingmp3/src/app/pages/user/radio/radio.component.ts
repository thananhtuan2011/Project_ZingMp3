import { RadioServiceService } from './../../../services/Radio/radio-service.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  list_radio: any[] = []
  constructor(private _radio_services: RadioServiceService, private change: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.GetAllRadio();
  }

  GetAllRadio() {
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
    this._radio_services.GetAllRadio(body).subscribe(res => {
      console.log("ress", res)

      this.list_radio = res.data;
      this.change.detectChanges();

    }
    )
  }


}
