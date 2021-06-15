import { scheduleModel } from "./scheduleModel";
import { UserModel } from "./user";

export class BookingModel{
    public id:string='3fa85f64-5717-4562-b3fc-2c963f66afa6';
    public bookingAmount:number=0;
    public discountAmount:number=0;
    public user:UserModel=new UserModel();
    public airlineSchedule:scheduleModel=new scheduleModel();
}