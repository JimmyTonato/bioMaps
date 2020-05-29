import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { loadModules } from "esri-loader";
import { YoutubeApiService } from "./services/youtube-api.service";
import { MatDialog } from "@angular/material/dialog";
import { VideoComponent } from "../map-media/video/video.component";
import { Videos } from "./model/Videos";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-map-media",
  templateUrl: "./map-media.component.html",
  styleUrls: ["./map-media.component.scss"],
})
export class MapMediaComponent implements OnInit {
  view: any;
  data_videos: Videos[] = [];

  key_API: string = "AIzaSyBSThxrcmvFJcgGtiQmU1gRZtNiExYeBR4";
  date_start = "0";
  date_end = "0";
  tmpdate1 = new FormControl();
  tmpdate2 = new FormControl();
  limit: number = 6;
  oneSearch: string = "crisis";
  twoSearch: string[] = ["covid"];
  MAX_videos_search: number = 20;
  CategoryID: number = 25;

  //Imput Search
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ItemsCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  allItems: string[] = [
    "covid",
    "vaccine",
    "face masks",
    "desinfectant",
    "gloves",
  ];
  latitude = 41.418758952017185;
  longitude = 2.1623306396477138;
  @ViewChild("itemInput", { static: true }) itemInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: true }) matAutocomplete: MatAutocomplete;

  constructor(
    private youtubeSerivice: YoutubeApiService,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {
    this.filteredItems = this.ItemsCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item ? this._filter(item) : this.allItems.slice()
      )
    );
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

    this.map(this.longitude, this.latitude);
    this.get_videos(this.latitude, this.longitude);
  }

  ///////////////////////////////////////////////////
  // Filter date get the BBDD
  //////////////////////////////////////////////////

  //Reset Date form
  resetDate() {
    this.date_start = "0";
    this.date_end = "0";
  }

  //get date form
  getDate() {
    this.date_start = new Date(this.tmpdate1.value)
      .toLocaleDateString("fr-CA")
      .split("-")
      .join("");
    this.date_end = new Date(this.tmpdate2.value)
      .toLocaleDateString("fr-CA")
      .split("-")
      .join("");
    this.get_videos(this.latitude, this.longitude);
    console.log(this.date_start, this.date_end);
  }

  ///////////////////////////////////////////////////
  // Add Map y configuration
  //////////////////////////////////////////////////

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
        this.longitude = pt.longitude;
        this.latitude = pt.latitude;
        this.get_videos(this.latitude, this.longitude);
      }.bind(this)
    );

    view.graphics.addMany([pointGraphic]);
  }

  /////////////////////////////////////////////////////
  // Set and Get parameters, the service connect python
  /////////////////////////////////////////////////////

  get_videos(latitude, longitude) {
    this.data_videos = [];
    this.map(longitude, latitude);
    this.youtubeSerivice
      .youtube(
        latitude,
        longitude,
        this.date_start,
        this.date_end,
        this.limit,
        this.oneSearch,
        this.twoSearch,
        this.MAX_videos_search,
        this.CategoryID,
        this.key_API
      )
      .subscribe(
        (result: any[]) => {
          console.log(result);
          result.forEach((element) => {
            let controllerSrc: SafeResourceUrl;
            controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
              element.IMG
            );
            let tmpDate = new Date(element.PublishTime);
            let video = new Videos(
              element.id,
              element.Country,
              element.VideoId,
              element.ChannelId,
              element.ChannelTitle,
              element.Title,
              element.Description,
              controllerSrc,
              tmpDate
            );
            this.data_videos.push(video);
          });
          console.log(this.data_videos);
        },
        (error) => {
          console.log(
            "Not data found, while getting access to the server: " +
              JSON.stringify(error)
          );
        }
      );
  }

  ///////////////////////////////////////////////////
  //Open pop-up in other component
  //////////////////////////////////////////////////

  openDialog(videos) {
    const dialogRef = this.dialog.open(VideoComponent, {
      data: videos,
    });
  }

  ///////////////////////////////////////////////////
  // Imput Autocomplete
  //////////////////////////////////////////////////

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || "").trim()) {
      this.twoSearch.push(value.trim());
    }
    if (input) {
      input.value = "";
    }
    this.ItemsCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.twoSearch.indexOf(fruit);
    if (index >= 0) {
      this.twoSearch.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.twoSearch.push(event.option.viewValue);
    this.itemInput.nativeElement.value = "";
    this.ItemsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
