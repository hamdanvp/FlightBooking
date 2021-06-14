import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-booking-history',
  templateUrl: './user-booking-history.component.html',
  styleUrls: ['./user-booking-history.component.css'],
})
export class UserBookingHistoryComponent implements OnInit {
  public bookingHistory:any[]=[];
  public currentUser:any;
  searchModel = {
    UserId:''
  };

  constructor(
    private bookingService:BookingServiceService,
    private logService: LoginServiceService) {
    this.currentUser=this.logService.getUser();
    if(this.currentUser!=null){
      this.searchModel.UserId=this.currentUser.id;
      bookingService.getBookings().subscribe((result)=>{
        this.bookingHistory=result;
      });
  }
}

  ngOnInit(): void {}
}
