import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-airlines',
  templateUrl: './manage-airlines.component.html',
  styleUrls: ['./manage-airlines.component.css'],
})
export class ManageAirlinesComponent implements OnInit {
  public airlineList: any[] = [];

  constructor(private adminServices: AdminService) {
    adminServices.getAirlines().subscribe((result) => {
      this.airlineList = result;
    });
  }

  ngOnInit(): void {}
}
