import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-booking-history',
  templateUrl: './user-booking-history.component.html',
  styleUrls: ['./user-booking-history.component.css'],
})
export class UserBookingHistoryComponent implements OnInit {
  public bookingHistory: any[] = [];

  constructor(private userService: UserService) {
    this.bookingHistory = userService.getBookingHistory();
  }

  ngOnInit(): void {}
}
