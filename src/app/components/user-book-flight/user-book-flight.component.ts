import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { UserDiscountApplyComponent } from '../user-discount-apply/user-discount-apply.component';
import { scheduleModel } from 'src/app/models/scheduleModel';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserModel } from 'src/app/models/user';
import { ScheduleServiceService } from 'src/app/services/schedule-service.service';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { AirlineServiceService } from 'src/app/services/airline-service.service';
import { ScheduleViewModel } from 'src/app/models/scheduleViewModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-book-flight',
  templateUrl: './user-book-flight.component.html',
  styleUrls: ['./user-book-flight.component.css'],
})
export class UserBookFlightComponent implements OnInit {
  public ownwardJourneyList: any[] = [];
  public returnJourneyList:  any[] = [];
  public locationList:  any[] = [];
  public totalPrice: number = 0;
  public oneWayPrice: number = 0;
  public returnPrice: number = 0;
  setReturnPrice: Function;
  selectedReturnRowIndex!: Number;
  setOnewayPrice: Function;
  selectedOneWayRowIndex!: Number;
  startDate = new Date();
  tripType: string = 'oneWay';
  fromLocation: string = '';
  toLocation: string = '';
  ownwardSchedule: ScheduleViewModel = new ScheduleViewModel();
  returnSchedule: ScheduleViewModel = new ScheduleViewModel();
  public onwardDate: Date = new Date();
  public returnDate: Date = new Date();
  booking:BookingViewmodel=new BookingViewmodel();

  constructor(
    private scheduleService: ScheduleServiceService,
    private airlineService: AirlineServiceService,
    private dialog: MatDialog,
    private router:Router,
    private logService: LoginServiceService
  ) {
    
    this.locationList=airlineService.getLocation();
    this.getOwnwardJourney();
    this.setReturnPrice = function (index: Number, returnPrice: number,scheduleId:string) {
      if (this.selectedReturnRowIndex == index) {
        this.selectedReturnRowIndex = -1;
        this.returnPrice = 0;
        this.returnSchedule.scheduleId='';
        this.returnSchedule.bookingPrice=0;
      } else {
        this.selectedReturnRowIndex = index;
        this.returnPrice = returnPrice;
        this.returnSchedule.scheduleId=scheduleId;
        this.returnSchedule.bookingPrice=returnPrice;
      }
      this.calculateTotal();
    };

    this.setOnewayPrice = function (index: Number, price: number,scheduleId:string) {
      if (this.selectedOneWayRowIndex == index) {
        this.selectedOneWayRowIndex = -1;
        this.oneWayPrice = 0;
        this.ownwardSchedule.bookingPrice=0;
        this.ownwardSchedule.scheduleId='';
      } else {
        this.selectedOneWayRowIndex = index;
        this.oneWayPrice = price;
        this.ownwardSchedule.scheduleId=scheduleId;
        this.ownwardSchedule.bookingPrice=price;
      }
      this.calculateTotal();
    };
  }

  getOwnwardJourney() {
    let searchModel = {
      FromLocation: this.fromLocation,
      ToLocation: this.toLocation,
      ScheduleDate: this.onwardDate.toISOString(),
    };
    this.scheduleService
      .getSchedules(searchModel)
      .subscribe((data: [scheduleModel]) => {
        this.ownwardJourneyList = data;
      });
  }

  getReturnJourney() {
    let searchModel = {
      FromLocation: this.toLocation,
      ToLocation: this.fromLocation,
      ScheduleDate: this.returnDate.toISOString(),
    };
    this.scheduleService
      .getSchedules(searchModel)
      .subscribe((data: [scheduleModel]) => {
        this.returnJourneyList = data;
      });
  }

  public calculateTotal() {
    this.totalPrice = this.oneWayPrice + this.returnPrice;
  }
  isActive(price: number) {
    return this.oneWayPrice === price;
  }

  fromLocationChange() {
      if (this.toLocation.trim() == '') return;
      else {
        this.getOwnwardJourney();
        if (this.tripType == 'roundTrip') {
          this.getReturnJourney();
        }
      }
  }

  toLocationChange() {
      if (this.fromLocation.trim() == '') return;
      else {
        this.getOwnwardJourney();
        if (this.tripType == 'roundTrip') {
          this.getReturnJourney();
        }
      }
  }

  public openDiscountDialog(): void {
    this.booking.schedules.length=0;
    if(this.ownwardSchedule.scheduleId.trim()==''){
      alert("Please select ownward journey");
      return;
    }
    else{
      this.booking.schedules.push(this.ownwardSchedule);
    }
    if(this.returnSchedule.scheduleId.trim()=='' && this.tripType=='roundTrip'){
      alert('Please select return journey');
      return;
    }
    else if(this.returnSchedule.scheduleId.trim()!='' && this.tripType=='roundTrip'){
      this.booking.schedules.push(this.returnSchedule);
    }

    
    let userData: any=this.logService.getUser();
    if (userData != null) {
      this.booking.userId=userData.id;
      this.logService.setCurrentBooking(this.booking);
      this.router.navigate(['/addPassenger'])
    } else {
      alert('Please login.');
      return;
    }
  }

  changeTripType(event: any) {
    this.tripType = event.target.value;
    if(this.tripType=='roundTrip'){
      this.getReturnJourney();
    }
    else{
      this.returnSchedule.scheduleId='';
      this.returnPrice=0;
      this.calculateTotal();
    }
  }

  onwardDateChange(event: any) {
    this.onwardDate = new Date(event);
    this.getOwnwardJourney();
  }

  returnDateChange(event: any) {
    this.returnDate = new Date(event);
    this.getOwnwardJourney();
  }

  ngOnInit(): void {}
}
