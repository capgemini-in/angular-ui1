import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ILogin } from '../Model/Login';
import { LoginService } from '../Services/login.service';
import { IUserLoginResponse } from '../Model/UserLoginResponse';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // loginForm;
 // user: User;
 username = new FormControl('');
 password = new FormControl('');

 title ="App";
  constructor(private toastr: ToastrService, private logInService : LoginService,private route 
  :Router,private authService :AuthService,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnInit() {
    // history.pushState(null, null, location.href);
    // window.onpopstate = function (event) {
    //   history.go(1);
    // };
  }

  login() {
     var credentials: ILogin  = {
      ssoId : this.username.value,
      password :  this.password.value
     }
     
    this.username.setValue('');
    this.password.setValue('');
    
    this.logInService
        .login(credentials)
        .subscribe(
          (response :IUserLoginResponse)=> {
           console.log("id : "+response.uid);
           if(response.status == 200){
              this.authService.setToken(response.uid);
              this.authService.setUserDetails(response);
              let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
              this.route.navigate([returnUrl || 'home']);
           }else{
            this.toastr.error("Error :"+response.message);
           }
          },
          (error)=>{
            
            this.toastr.error(error.error);
          }
  
  )


    // this.loginService.getUserbyLoginName(this.loginForm.value.username, this.loginForm.value.password)
    //   .subscribe(x => {
    //     this.user = x;
    //     this.auth.sendToken(this.user)
    //     //this.myRoute.navigate(["afterlogin"]);

    //   },
    //     error  =>  this.toastr.error("UserName and Password doesnot match"));
  }


}
