import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageBookingComponent } from './user-manage-booking.component';

describe('UserManageBookingComponent', () => {
  let component: UserManageBookingComponent;
  let fixture: ComponentFixture<UserManageBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManageBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
