import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { ScheduleViewModel } from 'src/app/models/scheduleViewModel';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { DiscountServicesService } from 'src/app/services/discount-services.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-discount-apply',
  templateUrl: './user-discount-apply.component.html',
  styleUrls: ['./user-discount-apply.component.css'],
})
export class UserDiscountApplyComponent implements OnInit {
  isRoundTrip: boolean = false;
  discountCode: string = '';
  orginalAmount: number = 0;
  totalAmount: number = 0;
  discountAmount: number = 0;
  booking: BookingViewmodel = new BookingViewmodel();
  ownwardSchedule: ScheduleViewModel = new ScheduleViewModel();
  returnSchedule: ScheduleViewModel = new ScheduleViewModel();
  constructor(
    private bookingService: BookingServiceService,
    private discountService: DiscountServicesService,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.booking = loginService.getCurrentBooking();
    if (this.booking.userId.trim() == '') {
      router.navigate(['/']);
    }
    this.ownwardSchedule = this.booking.schedules[0];
    if (this.booking.schedules.length == 2) {
      this.isRoundTrip = true;
      this.returnSchedule = this.booking.schedules[1];
    }
    for (let i = 0; i < this.booking.schedules.length; i++) {
      this.orginalAmount = this.booking.schedules[i].bookingPrice;
    }
    this.calculateTotal();
  }

  ngOnInit(): void {}

  applyDiscount() {
    if (this.discountCode.trim() != '')
      this.discountService
        .getDiscountByCode(this.discountCode)
        .subscribe((result) => {
          this.discountAmount = result.discountAmount;
          this.booking.discountAmount = result.discountAmount;
          this.calculateTotal();
          alert('Discount ' + this.discountAmount + ' added successfully.');
        });
  }

  onSubmit() {
    this.booking.schedules.length = 0;
    this.booking.schedules.push(this.ownwardSchedule);
    if (this.isRoundTrip) this.booking.schedules.push(this.returnSchedule);
    this.bookingService.addBooking(this.booking).subscribe((result) => {
      alert('Booking added succesfully');
      this.loginService.setCurrentBooking(new BookingViewmodel());
      this.router.navigate(['/']);
    });
  }

  calculateTotal() {
    this.totalAmount = this.orginalAmount - this.discountAmount;
  }

  onReturnSeatChange() {}
}
