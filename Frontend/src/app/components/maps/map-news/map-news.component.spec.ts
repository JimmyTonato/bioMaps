import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapNewsComponent } from './map-news.component';

describe('MapNewsComponent', () => {
  let component: MapNewsComponent;
  let fixture: ComponentFixture<MapNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
