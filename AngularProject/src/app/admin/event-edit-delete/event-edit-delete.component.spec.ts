import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditDeleteComponent } from './event-edit-delete.component';

describe('EventEditDeleteComponent', () => {
  let component: EventEditDeleteComponent;
  let fixture: ComponentFixture<EventEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEditDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
