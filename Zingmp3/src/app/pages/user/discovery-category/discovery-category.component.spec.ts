import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryCategoryComponent } from './discovery-category.component';

describe('DiscoveryCategoryComponent', () => {
  let component: DiscoveryCategoryComponent;
  let fixture: ComponentFixture<DiscoveryCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
