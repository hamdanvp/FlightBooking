import { AirlineModel } from './airlineModel';

export class scheduleModel {
  id: string = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  flightNo: string = '';
  from: string = '';
  to: string = '';
  nonBusinessClassPrice: number = 0;
  businessClassPrice: number = 0;
  totalSeats: number = 0;
  arrivalDate: Date = new Date();
  departureDate: Date = new Date();
  airline: AirlineModel = new AirlineModel();
}
