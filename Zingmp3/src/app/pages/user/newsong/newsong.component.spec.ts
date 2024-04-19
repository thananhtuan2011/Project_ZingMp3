import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsongComponent } from './newsong.component';

describe('NewsongComponent', () => {
  let component: NewsongComponent;
  let fixture: ComponentFixture<NewsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
