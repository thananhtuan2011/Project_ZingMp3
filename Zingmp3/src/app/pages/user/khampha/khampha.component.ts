import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-khampha',
  templateUrl: './khampha.component.html',
  styleUrls: ['./khampha.component.scss']
})
export class KhamphaComponent implements OnInit {

  lit_cate: any[] = []
  constructor(private chan: ChangeDetectorRef, private _cate_services: CategoryService) {

  }

  GetRandomCate() {
    this._cate_services.GetRanDomTypeSong().subscribe(res => {
      if (res) {
        this.lit_cate = res.data;
        console.log('lit_cate', this.lit_cate)
        this.chan.detectChanges();
      }
    }
    )
  }
  ngOnInit(): void {
    this.GetRandomCate();
  }

}
