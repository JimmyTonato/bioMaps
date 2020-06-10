import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private httpClient: HttpClient) { }

  login(usernametmp, passwordtmp){
  //Connection to login.py
  let url = "http://localhost:5000/login"
  return this.httpClient.post(url, {username:usernametmp, password: passwordtmp});


  }

}
