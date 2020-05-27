/** 
 * @name= map-news.component.html()
  @author= Mario Alonso Valencia
  @version= 1.0
  @description= Main user interface of the application
  @date = 25-05-2020
-->
*/

import { Component, OnInit } from '@angular/core';
import { loadModules } from "esri-loader";
import { NewsserviceService } from './services/newsservice.service';
import { News } from '../map-news/model/New';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-map-news',
  templateUrl: './map-news.component.html',
  styleUrls: ['./map-news.component.scss']
})


export class MapNewsComponent implements OnInit {

  //Properties
  view: any;
  latitude: number = 0;
  longitude: number = 0;
  map = ""
  totalResults: number = 0;
  country: string = "";
  new: News;
  filterSelection: string = "publishedAt";
  listNews: News[] = [];
  listFilters:string[] = ["relevancy","popularity","publishedAt"]

  //Pagination properties
  currentPage: number;
  newsPerPage: number;


  constructor(private mapNewsService: NewsserviceService,
    public dialog: MatDialog) { }

    /**
     *onFilter()
     *This method is triggered when the user clicks on an option of the select
     to sort the news
     */
    onFilter(){
      this.ngOnInit()
    }

  async ngOnInit() {

    //Pagination properties
    this.newsPerPage = 3;
    this.currentPage = 1;
    

    this.mapa()
  }

  

async mapa() {
    const [Map, MapView, webMercatorUtils, WebMap] = await loadModules(["esri/Map", "esri/views/MapView", "esri/geometry/support/webMercatorUtils", "esri/WebMap"]);
    this.map = new WebMap({
      basemap: 'streets-night-vector',
    });


    let view = new MapView({
      container: "mapa",
      map: this.map,
      zoom: 1,
      highlightOptions: {
        fillOpacity: 0,
        color: [50, 50, 50]
      },
      constraints: {
        maxScale: 35000
      }
    });

    /**
    *This method is triggered when the user clicks in any part of
    the map.
    It gets the latitude and longitude values of the place that the
    user clicks and the sort method that the user chooses 
    and calls to the coords() method
    */
    view.on("click", function (evt) {

      this.listNews = [];
      let pt = view.toMap({ x: evt.x, y: evt.y })

      this.latitude = pt.latitude
      this.longitude = pt.longitude
      
      this.coords(pt.latitude, pt.longitude, this.filterSelection)

    }.bind(this));

    


  }

  /**
   * This method is called by the funcion view.on.
   * It sends the latitude, longitude and sort filter values
   * to the server.
   * The server sends this values to the app.py application, that returns
   * all the news relationated with the values that receives
   *
   * @param {*} latitude
   * @param {*} longitude
   * @param {*} filterSelection
   */
  coords(latitude, longitude, filterSelection) { 
    
    this.mapNewsService.coords(latitude, longitude, filterSelection).subscribe((news: any[]) => {
      this.totalResults = news["totalResults"]

      if (this.totalResults > 20) {
        this.totalResults = 20;
      }


      for (let i = 0; i < this.totalResults; i++) {
        //Generating the array of the object New
        this.listNews.push(
          new News(news["articles"][i]["title"], news["articles"][i]["description"], news["articles"][i]["url"],
            news["articles"][i]["urlToImage"], news["articles"][i]["publishedAt"])
        )
      }

      
    })
  }


}











