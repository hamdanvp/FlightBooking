import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-booking-history',
  templateUrl: './user-booking-history.component.html',
  styleUrls: ['./user-booking-history.component.css'],
})
export class UserBookingHistoryComponent implements OnInit {
  public bookingHistory: any[] = [];
  public currentUser: any;
  searchModel = {
    UserId: '',
  };

  constructor(
    private bookingService: BookingServiceService,
    private logService: LoginServiceService,
    private router: Router
  ) {
    this.currentUser = this.logService.getUser();
    if (this.currentUser != null) {
      this.searchModel.UserId = this.currentUser.id;
      bookingService.getBookings().subscribe((result) => {
        this.bookingHistory = result;
      });
    }
  }

  viewBookingDetails(bookingId: string) {
    this.router.navigate(['bookingView/' + bookingId]);
  }

  ngOnInit(): void {}
}
