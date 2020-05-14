import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMediaComponent } from './map-media.component';

describe('MapMediaComponent', () => {
  let component: MapMediaComponent;
  let fixture: ComponentFixture<MapMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
