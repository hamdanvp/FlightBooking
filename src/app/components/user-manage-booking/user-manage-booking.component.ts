import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-manage-booking',
  templateUrl: './user-manage-booking.component.html',
  styleUrls: ['./user-manage-booking.component.css']
})
export class UserManageBookingComponent implements OnInit {
  public bookingHistory:any[]=[];

  constructor(
    private userService:UserService
  ) { 
    this.bookingHistory=userService.getBookingHistory();
  }

  ngOnInit(): void {
  }

}
