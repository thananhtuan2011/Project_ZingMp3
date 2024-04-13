import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplayListComponent } from './addplay-list.component';

describe('AddplayListComponent', () => {
  let component: AddplayListComponent;
  let fixture: ComponentFixture<AddplayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddplayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
