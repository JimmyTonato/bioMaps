import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";
import { YoutubeApiService } from "./services/youtube-api.service";
import { MatDialog } from "@angular/material/dialog";
import { VideoComponent } from "../map-media/video/video.component";
import { Videos } from './model/Videos';

@Component({
  selector: "app-map-media",
  templateUrl: "./map-media.component.html",
  styleUrls: ["./map-media.component.scss"],
})
export class MapMediaComponent implements OnInit {
  view: any;
  data_videos: Videos[] = [];

  constructor(
    private youtubeSerivice: YoutubeApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.map(null, null);

  }

  async map(longitude, latitude) {
    const [Map, MapView, Graphic] = await loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
    ]);
    var point = {
      type: "point", // autocasts as new Point()
      longitude: longitude,
      latitude: latitude,
    };
    var markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2,
      },
    };
    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });
    const mapProperties = {
      basemap: "streets-night-vector",
    };

    const map = new Map(mapProperties);

    const mapViewProperties = {
      container: "mapa",
      center: [0.1278, 51.5074],
      zoom: 1,
      map: map,
    };

    const view = new MapView(mapViewProperties);

    view.on(
      "click",
      function (evt) {
        let pt = view.toMap({ x: evt.x, y: evt.y });
        this.get_videos(pt.latitude, pt.longitude);
        // this.getDataVideos();
      }.bind(this)
    );

    view.graphics.addMany([pointGraphic]);

  }

  get_videos(latitude, longitude) {
    this.map(longitude, latitude);
    this.youtubeSerivice
      .youtube(latitude, longitude)
      .subscribe((result: any[]) => {
        console.log(result);
      });
  }

  //Open pop-up in other component
  openDialog() {
    const dialogRef = this.dialog.open(VideoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // getDataVideos(){
  //   this.youtubeSerivice.youtube_get_data().subscribe(
  //     (result: any []) => {
  //       var data = result;
  //       for (let index = 0; index < data.length; index++) {
  //         let video = new Videos(
  //           data[index].id,
  //           data[index].Contry,
  //           data[index].VideoId,
  //           data[index].ChannelId,
  //           data[index].ChannelTitle,
  //           data[index].Title,
  //           data[index].Description,
  //           data[index].img,
  //           data[index].PublishTime
  //         )
  //         this.data_videos.push(video);
  //       }
  //       console.log(this.data_videos);

  //       // if (result[0] == true) {

  //       // } else {
  //       //   this.data_videos = [];
  //       //   console.log(
  //       //     'Not data found, server error: ' + JSON.stringify(data[1])
  //       //   );
  //       // }
  //     },
  //     (error) => {
  //       console.log(
  //         'Not data found, while getting access to the server: ' +
  //           JSON.stringify(error)
  //       );
  //     }
  //   );
  // }


}
