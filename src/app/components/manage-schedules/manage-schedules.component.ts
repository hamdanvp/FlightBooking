import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.css'],
})
export class ManageSchedulesComponent implements OnInit {
  public scheduleList: any[] = [];
  public airlineList: any[] = [];
  searchModel={
    airlineName:'',
    flightNo:''
  }
  constructor(private adminServices: AdminService) {
    adminServices.getAirlines().subscribe((result) => {
      this.airlineList = result;
    });
    adminServices.getSchedules().subscribe((result) => {
      this.scheduleList = result;
    });
  }

  onSearch(){    
    this.adminServices.getSchedules(this.searchModel).subscribe((result) => {
      this.scheduleList = result;
    });
  }

  ngOnInit(): void {}
}
