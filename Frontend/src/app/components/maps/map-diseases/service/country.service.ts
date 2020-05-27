import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }
/*
What we will receive from this function is an array with all
 the countries and their flags to be used in the select
*/
  allFlags(){
    let url = "http://localhost:5000/mapDiseades/covid-19/registeredcountries"
    return this.httpClient.get(url);
  }
}
