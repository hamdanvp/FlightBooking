import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { UserService } from 'src/app/services/user.service';
import { UserDiscountApplyComponent } from '../user-discount-apply/user-discount-apply.component';
import { scheduleModel } from 'src/app/models/scheduleModel';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserModel } from 'src/app/models/user';
import { ScheduleServiceService } from 'src/app/services/schedule-service.service';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';

@Component({
  selector: 'app-user-book-flight',
  templateUrl: './user-book-flight.component.html',
  styleUrls: ['./user-book-flight.component.css'],
})
export class UserBookFlightComponent implements OnInit {
  public ownwardJourneyList: any[] = [];
  public returnJourneyList:  any[] = [];
  public totalPrice: number = 0;
  public oneWayPrice: number = 0;
  public returnPrice: number = 0;
  setReturnPrice: Function;
  selectedReturnRowIndex!: Number;
  setOnewayPrice: Function;
  selectedOneWayRowIndex!: Number;
  startDate = new Date();
  tripType: string = 'oneWay';
  oldValue: string = '';
  fromLocation: string = '';
  toLocation: string = '';
  ownwardScheduleId: string = '';
  returnScheduleId: string = '';
  public onwardDate: Date = new Date();
  public returnDate: Date = new Date();
  booking:BookingViewmodel=new BookingViewmodel();

  constructor(
    private scheduleService: ScheduleServiceService,
    private dialog: MatDialog,
    private logService: LoginServiceService
  ) {
    this.getOwnwardJourney();
    this.setReturnPrice = function (index: Number, returnPrice: number,scheduleId:string) {
      if (this.selectedReturnRowIndex == index) {
        this.selectedReturnRowIndex = -1;
        this.returnPrice = 0;
        this.returnScheduleId='';
      } else {
        this.selectedReturnRowIndex = index;
        this.returnPrice = returnPrice;
        this.returnScheduleId=scheduleId;
      }
      this.calculateTotal();
    };

    this.setOnewayPrice = function (index: Number, price: number,scheduleId:string) {
      if (this.selectedOneWayRowIndex == index) {
        this.selectedOneWayRowIndex = -1;
        this.oneWayPrice = 0;
        this.ownwardScheduleId='';
      } else {
        this.selectedOneWayRowIndex = index;
        this.oneWayPrice = price;
        this.ownwardScheduleId=scheduleId;
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

  focusFunction(event: any) {
    this.oldValue = event.target.value;
  }

  fromFocusOut(event: any) {
    let newValue = event.target.value;
    if (newValue != this.oldValue) {
      this.fromLocation = newValue;
      if (this.toLocation.trim() == '') return;
      else {
        this.getOwnwardJourney();
        if (this.tripType == 'roundTrip') {
          this.getReturnJourney();
        }
      }
    }
  }

  toFocusOut(event: any) {
    let newValue = event.target.value;
    if (newValue != this.oldValue) {
      this.toLocation = newValue;
      if (this.fromLocation.trim() == '') return;
      else {
        this.getOwnwardJourney();
        if (this.tripType == 'roundTrip') {
          this.getReturnJourney();
        }
      }
    }
  }

  public openDiscountDialog(): void {
    this.booking.scheduleIds.length=0;
    if(this.ownwardScheduleId.trim()==''){
      alert("Please select ownward journey");
      return;
    }
    else{
      this.booking.scheduleIds.push(this.ownwardScheduleId);
    }
    if(this.returnScheduleId.trim()=='' && this.tripType=='roundTrip'){
      alert('Please select return journey');
      return;
    }
    else if(this.returnScheduleId.trim()!='' && this.tripType=='roundTrip'){
      this.booking.scheduleIds.push(this.returnScheduleId);
    }

    
    let userData: any=this.logService.getUser();
    if (userData != null) {
      this.booking.userId=userData.id;
      let dialogRef = this.dialog.open(UserDiscountApplyComponent, {
        width: '500px',
        data: {
          triptype:this.tripType,
          booking: this.booking
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        let data = result;
      });
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
      this.returnScheduleId='';
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
