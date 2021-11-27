import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  error = "";
  hide= true;
  userId= 0;
  account_name = "";
  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
  }

  getUsernameErrorMessage(){
    if (this.username.hasError('required')) {
      return 'Username is required';
    }
    return true;
  }
  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    return true;
  }
  login() {
    var isvalidusername = true;
    var isvalidpassword = true;
    if (this.username.hasError('required')) {
      this.username.markAllAsTouched();
      isvalidusername = false;
    }
    if (this.password.hasError('required')) {
      this.password.markAllAsTouched();
      isvalidpassword = false;
    }
    if(!isvalidusername || !isvalidpassword){
      return false;
    }
    var requestData = { username: this.username.value, password: this.password.value }
    return this.http.post("https://bookcart.azurewebsites.net/api/login", requestData).subscribe(result => {
      var data:any = result;
      var token = data['token'];
      var userDetails = data['userDetails'];
      localStorage.setItem("authToken",token);
      localStorage.setItem("userId",userDetails['userId']);
      this.userId = userDetails['userId']
      this.router.navigateByUrl("/account");
    },error=>{
      if(error.status==401){
        this.error = "Username or Password is incorrect.";
      }
    });
  }
}
