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


    const [Map, MapView, CSVLayer, WebMap] = await loadModules(["esri/Map", "esri/views/MapView", "esri/layers/CSVLayer", "esri/WebMap"]);


    const url = "http://127.0.0.1:5000/";

    const csvLayer = new CSVLayer({
      title: "Hurricanes",
      url: url,
      copyright: "NOAA",
      popupTemplate: {
        title: "{Name}",
        content: [{
          type: "text",
          text: "Category {Confirmed} storm with that occurred at {Deaths}."
        }, {
          type: "fields",
          fieldInfos: [{
            fieldName: "wmo_pres",
            label: "Pressure"
          }, {
            fieldName: "wmo_wind",
            label: "Wind Speed (mph)"
          }]
        }],
        fieldInfos: [{
          fieldName: "ISO_time",
          format: {
            dateFormat: "short-date-short-time"
          }
        }]
      },
      renderer: {
        type: "unique-value",
        field: "nada",
        uniqueValueInfos: this.createUniqueValueInfos()
      }
    });

    const map = new WebMap({
      // contains a basemap with a South Pole Stereographic projection
      // the CSVLayer coordinates will re-project client-side
      // with the Projection Engine to match the view's Spatial Reference
      basemap: 'streets-night-vector',
      layers: [csvLayer]
    });
    const view = new MapView({
      container: "mapa",
      map: map,
      zoom: 1,
      highlightOptions: {
        fillOpacity: 0,
        color: [50, 50, 50]
      },
      popup: {
        dockEnabled: true,
        dockOptions: {
          position: "top-right",
          breakpoint: false
        }
      },
      constraints: {
        maxScale: 35000
      }
    });

  }
  createUniqueValueInfos() {
    const fireflyImages = [
        "cat1.png"
    ];

    const baseUrl =
        "https://arcgis.github.io/arcgis-samples-javascript/sample-data/";

    return fireflyImages.map(function(url, i) {
        return {
            value: 1, // Category number
            symbol: {
                type: "picture-marker",
                url: baseUrl + url
            }
        };
    });
}

}
