import { Component, OnInit } from '@angular/core';
import { AirlineServiceService } from 'src/app/services/airline-service.service';

@Component({
  selector: 'app-manage-airlines',
  templateUrl: './manage-airlines.component.html',
  styleUrls: ['./manage-airlines.component.css'],
})
export class ManageAirlinesComponent implements OnInit {
  public airlineList: any[] = [];

  constructor(private airlineServices: AirlineServiceService) {
    airlineServices.getAirlines().subscribe((result) => {
      this.airlineList = result;
    });
  }

  ngOnInit(): void {}
}
