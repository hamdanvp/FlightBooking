import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserBookFlightComponent } from './components/user-book-flight/user-book-flight.component';
import { UserBookingHistoryComponent } from './components/user-booking-history/user-booking-history.component';
import { UserManageBookingComponent } from './components/user-manage-booking/user-manage-booking.component';
import { ManageAirlinesComponent } from './components/manage-airlines/manage-airlines.component';
import { ManageDiscountsComponent } from './components/manage-discounts/manage-discounts.component';
import { ManageSchedulesComponent } from './components/manage-schedules/manage-schedules.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddAirlineComponent } from './components/add-airline/add-airline.component';
import { AddSchedulesComponent } from './components/add-schedules/add-schedules.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddDiscountComponent } from './components/add-discount/add-discount.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddPassengersComponent } from './components/add-passengers/add-passengers.component';
import { UserDiscountApplyComponent } from './components/user-discount-apply/user-discount-apply.component';
import { ViewBookingDetailsComponent } from './components/view-booking-details/view-booking-details.component';

const routes: Routes = [
  { path: '', component: UserBookFlightComponent },
  { path: 'bookFlights', component: UserBookFlightComponent },
  { path: 'bookHistory', component: UserBookingHistoryComponent },
  { path: 'manageBooking', component: UserManageBookingComponent },
  { path: 'manageAirlines', component: ManageAirlinesComponent },
  { path: 'manageSchedules', component: ManageSchedulesComponent },
  { path: 'manageDiscount', component: ManageDiscountsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'addAirline', component: AddAirlineComponent },
  { path: 'addSchedule', component: AddSchedulesComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'addPassenger', component: AddPassengersComponent },
  { path: 'addDiscount', component: AddDiscountComponent },
  { path: 'applyDiscount', component: UserDiscountApplyComponent },
  { path: 'bookingView/:id', component: ViewBookingDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
