import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpTypeComponent } from './sing-up-type.component';

describe('SingUpTypeComponent', () => {
  let component: SingUpTypeComponent;
  let fixture: ComponentFixture<SingUpTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingUpTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
