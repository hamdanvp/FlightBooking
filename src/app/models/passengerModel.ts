import { BookingModel } from "./bookingModel";

export class PassengerModel{
    public id:string='3fa85f64-5717-4562-b3fc-2c963f66afa6';
    public name:string='';
    public gender:string='';
    public age:number=0;
    public booking:BookingModel=new BookingModel();
}