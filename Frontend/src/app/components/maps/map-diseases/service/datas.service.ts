import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatasService {

  constructor(private httpClient: HttpClient) { }

/*
what we're going to get is a json from every country we put on the list
*/
loadDatacountries(listCountries: any){
    let url = "http://localhost:5000/mapDiseades/covid-19/jsondataMap?countries="+ listCountries
    return this.httpClient.get(url);
  }
  
/*
what we avoid to receive here is a json with information of all the countries
 grouped by date and added their things 
*/
datasByGraficAll(listCountries: any){
 let url = "http://localhost:5000//mapDiseades/covid-19/resultsAll?countries=" + listCountries
 return this.httpClient.get(url);
}

}
