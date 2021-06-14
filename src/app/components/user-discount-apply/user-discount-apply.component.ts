import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { scheduleModel } from 'src/app/models/scheduleModel';
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
  constructor(
    private bookingService: BookingServiceService,
    private discountService: DiscountServicesService,
    private loginService: LoginServiceService,
    private router:Router
  ) {
    this.booking = loginService.getCurrentBooking();
    if(this.booking.schedules.length==2){
      this.isRoundTrip=true;
    }
    // for (let i = 0; i < this.booking.schedules.length; i++) {
    //   this.orginalAmount=this.booking.schedules[i].bookingPrice;
    // }
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
    this.bookingService.addBooking(this.booking).subscribe((result) => {
      alert('Booking added succesfully');
      this.loginService.setCurrentBooking(new BookingViewmodel);
      this.router.navigate(['/']);
    });
  }

  calculateTotal(){
    this.totalAmount=this.orginalAmount-this.discountAmount;
  }
}
