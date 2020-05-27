/*
@name= login.component.ts
  @author= Mario Alonso Valencia
  @version= 1.0
  @description= Main user interface of the application
  @date = 25-05-2020
*/

//Imports
import { Component, OnInit } from '@angular/core';
import { User } from './model/User';
import { LoginserviceService } from './services/loginservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   //Properties
  username: string = "";
  password: string = "";
  flag: boolean;




   user : User;

  constructor(private LoginService: LoginserviceService) { }

  ngOnInit() {
    
   
  }


  userlogin(){
    
    this.user = new User(this.username,this.password);

    this.LoginService.login(this.username, this.password).subscribe((users: any[]) => {
      
      if(users.length == 0){
        this.flag = false;
      } else {
        this.flag = true;
      }
      
      
    })  
  }
}
