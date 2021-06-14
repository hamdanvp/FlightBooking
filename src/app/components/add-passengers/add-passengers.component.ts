import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { PassengerModel } from 'src/app/models/passengerModel';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-add-passengers',
  templateUrl: './add-passengers.component.html',
  styleUrls: ['./add-passengers.component.css']
})
export class AddPassengersComponent implements OnInit {
public model:BookingViewmodel=new BookingViewmodel();
public passengerList:[PassengerModel]=[new PassengerModel()];
  constructor(
    private loginServices:LoginServiceService,
    private router:Router
  ) {
    this.model=loginServices.getCurrentBooking();
   }

  ngOnInit(): void {
  }

  addPassengerRow(){
    this.passengerList.push(new PassengerModel());
  }

  onSubmit(){
    this.model.passengers=this.passengerList;
    this.loginServices.setCurrentBooking(this.model);
    this.router.navigate(['/applyDiscount']);
  }

}
