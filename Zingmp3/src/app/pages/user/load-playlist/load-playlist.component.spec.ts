import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPlaylistComponent } from './load-playlist.component';

describe('LoadPlaylistComponent', () => {
  let component: LoadPlaylistComponent;
  let fixture: ComponentFixture<LoadPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
