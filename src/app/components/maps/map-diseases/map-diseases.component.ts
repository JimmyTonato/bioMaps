import { Component, OnInit } from '@angular/core';
import { loadModules } from "esri-loader";
@Component({
  selector: 'app-map-diseases',
  templateUrl: './map-diseases.component.html',
  styleUrls: ['./map-diseases.component.scss']
})
export class MapDiseasesComponent implements OnInit {
  view: any;
  constructor() { }
  async ngOnInit() {
    const [Map, MapView] = await loadModules(["esri/Map", "esri/views/MapView"]);
    const mapProperties = {
      basemap: "streets-night-vector"
    };

    const map = new Map(mapProperties);

    const mapViewProperties = {
      container: "mapa",
      center: [0.1278, 51.5074],
      zoom: 3,
      map: map
    };

    this.view = new MapView(mapViewProperties);
    this.view.on("click", function(event) {
      console.log("click event: ", event.mapPoint);
    });
    
  }



}
