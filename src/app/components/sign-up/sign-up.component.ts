import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model:UserModel=new UserModel();
  constructor(
    private loginService:LoginServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.model.confirmPasword===this.model.password){
      this.loginService.addUser(this.model).subscribe((result)=>{
        // this.loginService.setUser(this.model);
        this.router.navigate(['']);
      })
    }
    else{
      alert('Password and Confirm password mismatch.')
    }
  }

}
