import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiscountApplyComponent } from './user-discount-apply.component';

describe('UserDiscountApplyComponent', () => {
  let component: UserDiscountApplyComponent;
  let fixture: ComponentFixture<UserDiscountApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDiscountApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiscountApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
