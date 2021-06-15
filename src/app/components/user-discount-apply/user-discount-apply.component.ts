import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { DiscountModel } from 'src/app/models/discountModel';
import { scheduleModel } from 'src/app/models/scheduleModel';
import { ScheduleViewModel } from 'src/app/models/scheduleViewModel';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { DiscountServicesService } from 'src/app/services/discount-services.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ScheduleServiceService } from 'src/app/services/schedule-service.service';

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
  discountList: [DiscountModel] = [new DiscountModel()];
  booking: BookingViewmodel = new BookingViewmodel();
  ownwardSchedule: ScheduleViewModel = new ScheduleViewModel();
  returnSchedule: ScheduleViewModel = new ScheduleViewModel();
  constructor(
    private bookingService: BookingServiceService,
    private discountService: DiscountServicesService,
    private loginService: LoginServiceService,
    private scheduleService: ScheduleServiceService,
    private router: Router
  ) {
    this.booking = loginService.getCurrentBooking();
    if (this.booking.userId.trim() == '') {
      router.navigate(['/']);
    }
    this.getDiscountList();
    this.ownwardSchedule = this.booking.schedules[0];
    if (this.booking.schedules.length == 2) {
      this.isRoundTrip = true;
      this.returnSchedule = this.booking.schedules[1];
    }
    this.calculateOrginalPrice();
  }

  ngOnInit(): void {}

  getDiscountList() {
    let searchmodel = {
      startDate: new Date().toISOString(),
    };
    this.discountService.getDiscount(searchmodel).subscribe((result) => {
      this.discountList = result;
    });
  }

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

  calculateOrginalPrice(){
    this.orginalAmount=this.ownwardSchedule.bookingPrice+this.returnSchedule.bookingPrice;
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.orginalAmount - this.discountAmount;
  }

  ownwardScheduleChange(){
    this.scheduleService.getScheduleById(this.ownwardSchedule.scheduleId).subscribe((result)=>{
      if(this.ownwardSchedule.classType=="Non-Business"){
        this.ownwardSchedule.bookingPrice=result.nonBusinessClassPrice;
        this.ownwardSchedule.isBusinessClass=false;
        this.calculateOrginalPrice();
      }
      else{
        this.ownwardSchedule.bookingPrice=result.businessClassPrice;
        this.ownwardSchedule.isBusinessClass=false;
        this.calculateOrginalPrice();
      }
    });    
  }

  returnScheduleChange(){
    this.scheduleService.getScheduleById(this.ownwardSchedule.scheduleId).subscribe((result)=>{
      if(this.returnSchedule.classType=="Non-Business"){
        this.returnSchedule.bookingPrice=result.nonBusinessClassPrice;
        this.returnSchedule.isBusinessClass=false;
        this.calculateOrginalPrice();
      }
      else{
        this.returnSchedule.bookingPrice=result.businessClassPrice;
        this.returnSchedule.isBusinessClass=false;
        this.calculateOrginalPrice();
      }
    });    
  }
}
