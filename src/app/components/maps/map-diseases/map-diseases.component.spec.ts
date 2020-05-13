import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDiseasesComponent } from './map-diseases.component';

describe('MapDiseasesComponent', () => {
  let component: MapDiseasesComponent;
  let fixture: ComponentFixture<MapDiseasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDiseasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
