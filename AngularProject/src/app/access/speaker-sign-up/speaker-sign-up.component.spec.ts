import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSignUpComponent } from './speaker-sign-up.component';

describe('SpeakerSignUpComponent', () => {
  let component: SpeakerSignUpComponent;
  let fixture: ComponentFixture<SpeakerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
