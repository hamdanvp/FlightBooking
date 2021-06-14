import { BookingModel } from "./bookingModel";

export class PassengerModel{
    public id:string='';
    public name:string='';
    public gender:string='';
    public age:number=0;
    public booking:BookingModel=new BookingModel();
}