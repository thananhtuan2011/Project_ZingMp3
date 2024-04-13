import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addplay-list',
  templateUrl: './addplay-list.component.html',
  styleUrls: ['./addplay-list.component.scss']
})
export class AddplayListComponent implements OnInit {

  nameplaylist: string = ''
  constructor(private dialogRef: MatDialogRef<AddplayListComponent>,) {

  }
  _Back() {
    this.dialogRef.close();
  }
  ngOnInit(): void {

  }

}
