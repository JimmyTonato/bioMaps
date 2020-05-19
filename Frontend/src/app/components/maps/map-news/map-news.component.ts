import { Component, OnInit } from '@angular/core';
import { loadModules } from "esri-loader";
@Component({
  selector: 'app-map-news',
  templateUrl: './map-news.component.html',
  styleUrls: ['./map-news.component.scss']
})
export class MapNewsComponent implements OnInit {
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
    
  }

}
