import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdEditRemoveComponent } from './std-edit-remove.component';

describe('StdEditRemoveComponent', () => {
  let component: StdEditRemoveComponent;
  let fixture: ComponentFixture<StdEditRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdEditRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdEditRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
