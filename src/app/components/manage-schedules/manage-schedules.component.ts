import { Component, OnInit } from '@angular/core';
import { AirlineServiceService } from 'src/app/services/airline-service.service';
import { ScheduleServiceService } from 'src/app/services/schedule-service.service';

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
  constructor(private airlineService: AirlineServiceService,
    private scheduleService:ScheduleServiceService) {
    airlineService.getAirlines().subscribe((result) => {
      this.airlineList = result;
    });
    scheduleService.getSchedules().subscribe((result) => {
      this.scheduleList = result;
    });
  }

  onSearch(){    
    this.scheduleService.getSchedules(this.searchModel).subscribe((result) => {
      this.scheduleList = result;
    });
  }

  ngOnInit(): void {}
}
