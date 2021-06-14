import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingViewmodel } from 'src/app/models/bookingViewmodel';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { DiscountServicesService } from 'src/app/services/discount-services.service';

@Component({
  selector: 'app-user-discount-apply',
  templateUrl: './user-discount-apply.component.html',
  styleUrls: ['./user-discount-apply.component.css']
})
export class UserDiscountApplyComponent implements OnInit {
isRoundTrip:boolean=false;
discountCode:string='';
discountAmount:number=0;
booking:BookingViewmodel=new BookingViewmodel();
  constructor(
    private bookingService:BookingServiceService,
    private discountService:DiscountServicesService,
    public dialogRef: MatDialogRef<UserDiscountApplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data!=null){
      if(data.triptype=='roundTrip'){
        this.isRoundTrip=true;
      }
      if(data.booking!=null){
        this.booking=data.booking;
      }
    }
   }

  ngOnInit(): void {
  }

  applyDiscount(){
    if(this.discountCode.trim()!='')
    this.discountService.getDiscountByCode(this.discountCode).subscribe((result)=>{
      this.discountAmount=result.discountAmount;
      this.booking.discountAmount=result.discountAmount;
      alert('Discount '+this.discountAmount+' added successfully.');
    });
  }

  onSubmit(){
    this.bookingService.addBooking(this.booking).subscribe((result)=>{
      alert('Booking added succesfully');
      this.dialogRef.close(result);
    });
  }

}
