import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoiVienComponent } from './add-hoi-vien.component';

describe('AddHoiVienComponent', () => {
  let component: AddHoiVienComponent;
  let fixture: ComponentFixture<AddHoiVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHoiVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHoiVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
