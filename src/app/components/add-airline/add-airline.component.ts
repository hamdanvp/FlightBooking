import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AirlineModel } from "src/app/models/airlineModel"
@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  model:any;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.router.navigate(['/manageAirlines'])
  }

}
