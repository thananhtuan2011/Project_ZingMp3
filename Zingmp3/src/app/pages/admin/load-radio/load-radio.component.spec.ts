import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadRadioComponent } from './load-radio.component';

describe('LoadRadioComponent', () => {
  let component: LoadRadioComponent;
  let fixture: ComponentFixture<LoadRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
