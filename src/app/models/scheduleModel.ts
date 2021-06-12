import { AirlineModel } from "./airlineModel";

export class scheduleModel{
    id:string="";
    from:string="";
    to:string="";
    price:number=0;
    sheduleDate:Date=new Date;
    airline:AirlineModel=new AirlineModel();
}