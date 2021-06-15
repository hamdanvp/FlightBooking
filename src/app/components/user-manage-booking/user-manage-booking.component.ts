import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-manage-booking',
  templateUrl: './user-manage-booking.component.html',
  styleUrls: ['./user-manage-booking.component.css'],
})
export class UserManageBookingComponent implements OnInit {
  public bookingHistory: any[] = [];
  public currentUser: any;
  searchModel = {
    UserId: '',
    isCancelled: false,
    startDate: new Date().toISOString(),
  };

  constructor(
    private bookingService: BookingServiceService,
    private logService: LoginServiceService,
    private router: Router
  ) {
    this.getBookingList();
  }

  getBookingList() {
    this.currentUser = this.logService.getUser();
    if (this.currentUser != null) {
      this.searchModel.UserId = this.currentUser.id;
      this.bookingService.getBookings(this.searchModel).subscribe((result) => {
        this.bookingHistory = result;
      });
    }
  }

  canCancel(departureDate: string) {
    let diff = new Date().getTime() - new Date(departureDate).getTime();
    let days = Math.floor(diff / (60 * 60 * 24 * 1000));
    let hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    if (hours > 24) return true;
    else return true;
  }

  viewBookingDetails(bookingId:string){
    this.router.navigate(['bookingView/'+bookingId])
  }

  cancelBookingById(bookingId: string) {
    this.bookingService.cancelByBookingId(bookingId).subscribe((result) => {
      this.getBookingList();
    });
  }

  ngOnInit(): void {}
}
