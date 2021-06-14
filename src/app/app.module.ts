import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import {LoginServiceService} from './services/login-service.service'

import { AppComponent } from './app.component';
import { UserBookingHistoryComponent } from './components/user-booking-history/user-booking-history.component';
import { UserManageBookingComponent } from './components/user-manage-booking/user-manage-booking.component';
import { UserBookFlightComponent } from './components/user-book-flight/user-book-flight.component';
import { UserDiscountApplyComponent } from './components/user-discount-apply/user-discount-apply.component';
import { MenuComponent } from './components/menu/menu.component';
import { ManageAirlinesComponent } from './components/manage-airlines/manage-airlines.component';
import { ManageSchedulesComponent } from './components/manage-schedules/manage-schedules.component';
import { ManageDiscountsComponent } from './components/manage-discounts/manage-discounts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddAirlineComponent } from './components/add-airline/add-airline.component';
import { LoginComponent } from './components/login/login.component';
import { from } from 'rxjs';
import { AddSchedulesComponent } from './components/add-schedules/add-schedules.component';
import { AddDiscountComponent } from './components/add-discount/add-discount.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    UserBookingHistoryComponent,
    UserManageBookingComponent,
    UserBookFlightComponent,
    UserDiscountApplyComponent,
    MenuComponent,
    ManageAirlinesComponent,
    ManageSchedulesComponent,
    ManageDiscountsComponent,
    ReportsComponent,
    AddAirlineComponent,
    LoginComponent,
    AddSchedulesComponent,
    AddDiscountComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
