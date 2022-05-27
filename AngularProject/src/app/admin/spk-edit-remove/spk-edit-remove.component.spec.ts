import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpkEditRemoveComponent } from './spk-edit-remove.component';

describe('SpkEditRemoveComponent', () => {
  let component: SpkEditRemoveComponent;
  let fixture: ComponentFixture<SpkEditRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpkEditRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpkEditRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
