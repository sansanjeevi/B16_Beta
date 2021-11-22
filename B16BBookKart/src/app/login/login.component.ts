import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  unamePattern = "^[a-z0-9_-]{8,15}$"

   myform =new FormGroup({

     username: new FormControl("", [Validators.required, Validators.pattern(this.unamePattern)]),
     password: new FormControl("", Validators.required)


   })

   SubmitDetails() {
    console.log(this.myform);
   // console.log(this.myform.value["username"]);
   // console.log(this.myform.value["password"]);


   }


  constructor() { }

  ngOnInit(): void {
  }

}
