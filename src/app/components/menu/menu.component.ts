import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public logButtonName="Log In";
  public userData: any;
  public isLogin=false;

  constructor(
    public loginService:LoginServiceService,
    public dialog: MatDialog,
    public router:Router
  ) {
    this.userData= loginService.getUser();
    if(this.userData!=null){
      this.logButtonName="Log Out";
      this.isLogin=true;
    }
   }

  onLogClick(){
    if(this.userData!=null){
      this.userData=null;
      this.loginService.logOut();
      this.isLogin=false;
      this.logButtonName="Log in";
      this.router.navigate(['/']);
    }
    else{
      this.openDialog();
    }
  }

  onSignUpClick(){
    this.router.navigate(['/signUp']);
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userData = result;
      this.isLogin=true;
      this.logButtonName="Log Out";
      if(this.userData.isAdmin){
        this.router.navigate(['/manageSchedule'])
      }
    });
  }

  ngOnInit(): void {
  }

}
