import { PassengerModel } from "./passengerModel";
import { ScheduleViewModel } from "./scheduleViewModel";

export class BookingViewmodel{
userId:string='';
name:string='';
contactNumber:string='';
contactAddress:string='';
schedules:Array<ScheduleViewModel>=[];
passengers:Array<PassengerModel>=[];
discountAmount:number=0;
}