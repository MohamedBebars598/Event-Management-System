import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpeakerFormComponent } from './edit-speaker-form.component';

describe('EditSpeakerFormComponent', () => {
  let component: EditSpeakerFormComponent;
  let fixture: ComponentFixture<EditSpeakerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpeakerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpeakerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
