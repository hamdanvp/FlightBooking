import { scheduleModel } from "./scheduleModel";
import { UserModel } from "./user";

export class BookingModel{
    public id:string='';
    public bookingAmount:number=0;
    public discountAmount:number=0;
    public user:UserModel=new UserModel();
    public airlineSchedule:scheduleModel=new scheduleModel();
}