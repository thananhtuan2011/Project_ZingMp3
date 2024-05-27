import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlaySongComponent } from './detail-play-song.component';

describe('DetailPlaySongComponent', () => {
  let component: DetailPlaySongComponent;
  let fixture: ComponentFixture<DetailPlaySongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPlaySongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPlaySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
