import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpeakerToEventComponent } from './add-speaker-to-event.component';

describe('AddSpeakerToEventComponent', () => {
  let component: AddSpeakerToEventComponent;
  let fixture: ComponentFixture<AddSpeakerToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpeakerToEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpeakerToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
