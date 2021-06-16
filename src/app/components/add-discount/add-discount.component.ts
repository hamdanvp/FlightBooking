import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountModel } from 'src/app/models/discountModel';
import { DiscountServicesService } from 'src/app/services/discount-services.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css'],
})
export class AddDiscountComponent implements OnInit {
  model: DiscountModel = new DiscountModel();
  constructor(
    private discountServices: DiscountServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.model.couponCode.trim() != '') {
      if (this.model.id.trim() == '')
        this.model.id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
      this.discountServices.addDiscount(this.model).subscribe((result) => {
        this.router.navigate(['/manageDiscount']);
      });
    }
  }
}
