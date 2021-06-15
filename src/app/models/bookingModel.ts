import { scheduleModel } from "./scheduleModel";
import { UserModel } from "./user";

export class BookingModel{
    public id:string='3fa85f64-5717-4562-b3fc-2c963f66afa6';
    public orginalAmount:number=0;
    public bookingAmount:number=0;
    public discountAmount:number=0;
    public name:string='';
    public contactAddress:string='';
    public contactNumber:string='';
    public mealType:string='';
    public classType:string='';
    public bookedSeats:number=0;
    public isCancelled:boolean=false;
    public pnr:string='';
    public user:UserModel=new UserModel();
    public airlineSchedule:scheduleModel=new scheduleModel();
}