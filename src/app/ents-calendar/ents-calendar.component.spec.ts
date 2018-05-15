import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntsCalendarComponent } from './ents-calendar.component';

describe('EntsCalendarComponent', () => {
  let component: EntsCalendarComponent;
  let fixture: ComponentFixture<EntsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
