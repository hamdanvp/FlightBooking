import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { PassengerModel } from 'src/app/models/passengerModel';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-add-passengers',
  templateUrl: './add-passengers.component.html',
  styleUrls: ['./add-passengers.component.css'],
})
export class AddPassengersComponent implements OnInit {
  public model: BookingViewmodel = new BookingViewmodel();
  public passengerList: Array<PassengerModel> = [];
  passenger: PassengerModel = new PassengerModel();
  constructor(
    private loginServices: LoginServiceService,
    private router: Router
  ) {
    this.model = loginServices.getCurrentBooking();
    if (this.model.userId.trim() == '') {
      router.navigate(['/']);
    }
    this.passengerList = this.model.passengers;
  }

  ngOnInit(): void {}

  addPassengerRow() {
    this.passengerList.push(this.passenger);
    this.passenger = new PassengerModel();
  }

  onSubmit() {
    if (this.passengerList.length == 0) {
      alert('Add passengers pls');
      return;
    }
    this.model.passengers = this.passengerList;
    this.loginServices.setCurrentBooking(this.model);
    this.router.navigate(['/applyDiscount']);
  }
}
