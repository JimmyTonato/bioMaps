import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  constructor(private httpClient: HttpClient) { }

coords(latitude, longitude, filterSelection){
    //Connection to import.py
    let url = "http://localhost:5002/mapNewsApi?latitude="+latitude+"&longitude="+longitude+"&filterSelection="+filterSelection
    return this.httpClient.get(url);
  }
}
