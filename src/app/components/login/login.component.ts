import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userModel = { username: '', password: '' };
  loginSuccess = true;
  public userData: any;

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  onSubmit() {
    this.loginService
      .Login(this.userModel.username, this.userModel.password)
      .subscribe((userData) => {
        if (userData != null) {
          this.userData = userData;
          this.loginSuccess = true;
          this.loginService.setUser(userData);
          this.dialogRef.close(userData);
        }
      });
  }

  ngOnInit(): void {}
}
