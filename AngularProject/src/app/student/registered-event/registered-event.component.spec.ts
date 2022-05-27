import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredEventComponent } from './registered-event.component';

describe('RegisteredEventComponent', () => {
  let component: RegisteredEventComponent;
  let fixture: ComponentFixture<RegisteredEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
