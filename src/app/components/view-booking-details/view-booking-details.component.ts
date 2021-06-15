import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from 'src/app/models/bookingModel';
import { PassengerModel } from 'src/app/models/passengerModel';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-view-booking-details',
  templateUrl: './view-booking-details.component.html',
  styleUrls: ['./view-booking-details.component.css']
})
export class ViewBookingDetailsComponent implements OnInit {
id:any;
isBookingLoading:boolean=false;
isPassengerLoading:boolean=false;
bookingDetails:BookingModel=new BookingModel();
passengerList:Array<any>=[];
  constructor(private route: ActivatedRoute,
    private bookingServices:BookingServiceService) { 
    this.id=route.snapshot.params.id;
    if(this.id!=null){
      this.getBookingDetails();
      this.getPassengerDetails();
    }
  }

  getBookingDetails(){
    this.isBookingLoading=true;
    this.bookingServices.getBookingById(this.id).subscribe((result)=>{
      this.bookingDetails=result;
      this.isBookingLoading=false
    });
  }

  getPassengerDetails(){
    this.isPassengerLoading=true;
    this.bookingServices.getPassengersByBookingId(this.id).subscribe((result)=>{
      this.passengerList=result;
      this.isPassengerLoading=false;
    })
  }

  ngOnInit(): void {
  }

}
