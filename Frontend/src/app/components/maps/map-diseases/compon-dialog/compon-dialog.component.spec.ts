import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponDialogComponent } from './compon-dialog.component';

describe('ComponDialogComponent', () => {
  let component: ComponDialogComponent;
  let fixture: ComponentFixture<ComponDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
