import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsToEventComponent } from './add-students-to-event.component';

describe('AddStudentsToEventComponent', () => {
  let component: AddStudentsToEventComponent;
  let fixture: ComponentFixture<AddStudentsToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsToEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
