import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AirlineModel } from 'src/app/models/airlineModel';
import { AirlineServiceService } from 'src/app/services/airline-service.service';
@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css'],
})
export class AddAirlineComponent implements OnInit {
  model: AirlineModel = new AirlineModel();
  public instrumentList: any[] = [];

  constructor(
    private router: Router,
    private airlineService: AirlineServiceService
  ) {
    this.instrumentList = airlineService.getInstrument();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.model.airlineName.trim() != '') {
      if (this.model.id.trim() == '')
        this.model.id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
      this.airlineService.addAirlines(this.model).subscribe((result) => {
        this.router.navigate(['/manageAirlines']);
      });
    }
  }
}
