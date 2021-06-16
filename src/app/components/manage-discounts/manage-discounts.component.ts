import { Component, OnInit } from '@angular/core';
import { DiscountModel } from 'src/app/models/discountModel';
import { DiscountServicesService } from 'src/app/services/discount-services.service';

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css'],
})
export class ManageDiscountsComponent implements OnInit {
  discountList: any[] = [];
  constructor(discountService: DiscountServicesService) {
    discountService.getDiscount().subscribe((result) => {
      this.discountList = result;
    });
  }

  ngOnInit(): void {}
}
