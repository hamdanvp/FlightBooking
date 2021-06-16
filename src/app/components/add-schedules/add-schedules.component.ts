import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { scheduleModel } from 'src/app/models/scheduleModel';
import { AirlineServiceService } from 'src/app/services/airline-service.service';
import { ScheduleServiceService } from 'src/app/services/schedule-service.service';

@Component({
  selector: 'app-add-schedules',
  templateUrl: './add-schedules.component.html',
  styleUrls: ['./add-schedules.component.css'],
})
export class AddSchedulesComponent implements OnInit {
  model: scheduleModel = new scheduleModel();
  public airlineList: any[] = [];
  public locationList: any[] = [];

  constructor(
    private router: Router,
    private scheduleService: ScheduleServiceService,
    private airlineServices: AirlineServiceService
  ) {
    this.locationList = airlineServices.getLocation();
    airlineServices.getAirlines().subscribe((result) => {
      this.airlineList = result;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.model.flightNo.trim() != '') {
      if (this.model.id.trim() == '')
        this.model.id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
      this.scheduleService.addSchedule(this.model).subscribe((result) => {
        this.router.navigate(['/manageSchedules']);
      });
    }
  }
}
