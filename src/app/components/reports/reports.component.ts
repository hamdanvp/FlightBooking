import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  public bookingHistory: any[] = [];
  public currentUser: any;
  searchModel = {};
  constructor(
    private bookingService: BookingServiceService,
    private logService: LoginServiceService,
    private router: Router
  ) {
    bookingService.getBookings().subscribe((result) => {
      this.bookingHistory = result;
    });
  }

  viewBookingDetails(bookingId: string) {
    this.router.navigate(['bookingView/' + bookingId]);
  }

  ngOnInit(): void {}
}
