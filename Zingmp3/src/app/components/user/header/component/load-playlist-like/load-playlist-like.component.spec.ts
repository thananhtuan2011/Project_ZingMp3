import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPlaylistLikeComponent } from './load-playlist-like.component';

describe('LoadPlaylistLikeComponent', () => {
  let component: LoadPlaylistLikeComponent;
  let fixture: ComponentFixture<LoadPlaylistLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPlaylistLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPlaylistLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
