import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userId=0;
  account_name = "";
  constructor() { }

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem("userId") || "0");
    var authToken = localStorage.getItem("authToken") || "";
    if(authToken!=""){
      var user_details = JSON.parse(atob(authToken.split(".")[1]));
      this.account_name = user_details['sub'];
    }
  }

}
