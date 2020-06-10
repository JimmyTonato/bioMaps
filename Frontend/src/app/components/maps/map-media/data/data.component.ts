import { Component, OnInit } from "@angular/core";
import { YoutubeApiService } from "../services/youtube-api.service";
import { Video } from "../model/Video";
import { Color } from "ng2-charts";
import { ChartDataSets } from "chart.js";
import { NgxSpinnerService } from "ngx-spinner";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.scss"],
})
export class DataComponent implements OnInit {
  data_videos: Video[] = null;
  titles: any[] = [];
  graficsDone = false;
  barChartLabels;
  barChartData;
  barChartData1;
  barChartData2;
  barChartData3;
  controllerSrc: SafeResourceUrl;
  video_index;
  constructor(
    private youtubeSerivice: YoutubeApiService,
    private spinner: NgxSpinnerService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);

    this.youtubeSerivice.get_videos().subscribe((result) => {
      if (result) {
        this.data_videos = result;
        this.createGrafics();
      }
    });
    let url =
      "https://www.youtube.com/embed/" +
      this.data_videos[0].$VideoId +
      "?autoplay=1";
    this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.video_index = this.data_videos[0];
  }

  createGrafics() {
    console.log("comienzo-> ", this.data_videos, " <- fin");
    this.barChartLabels = [];
    this.barChartData = [{ data: [], label: "Views" }];
    this.barChartData1 = [{ data: [], label: "Like" }];
    this.barChartData2 = [{ data: [], label: "Dislike" }];
    this.barChartData3 = [{ data: [], label: "Comments" }];

    this.data_videos.forEach((element: Video, i) => {
      let sortTitle = `V.${i + 1}`;
      this.barChartLabels.push(sortTitle);
      this.titles.push({ sortTitle: sortTitle, title: element.$Title });
      this.barChartData[0].data.push(element.$viewCount);
      this.barChartData1[0].data.push(element.$likeCount);
      this.barChartData2[0].data.push(element.$dislikeCount);
      this.barChartData3[0].data.push(element.$commentCount);
    });
    console.log(this.barChartLabels);
    console.log(this.barChartData);

    this.graficsDone = true;
  }

  barChartOptions = {
    onClick: function (e, chart) {
      let indexVideo = chart[0]._index;
      let url =
        "https://www.youtube.com/embed/" +
        this.data_videos[indexVideo].$VideoId +
        "?autoplay=1";
      this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.video_index = this.data_videos[indexVideo];
    }.bind(this),
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
      xAxes: [{}],
    },
  };

  barChartType = "bar";
  barChartLegend = true;
  // 1r graf

  lineChartColors: Color[] = [
    {
      borderColor: "white",
      backgroundColor: "rgba(999, 999, 999, 0.3)",
    },
  ];

  // 2r graf
  lineChartColors1: Color[] = [
    {
      borderColor: "white",
      backgroundColor: "blue",
    },
  ];
  // 3r graf
  lineChartColors2: Color[] = [
    {
      borderColor: "white",
      backgroundColor: "red",
    },
  ];
  // 3r graf

  lineChartColors3: Color[] = [
    {
      borderColor: "yellow",
      backgroundColor: "green",
    },
  ];

  lineChartData: ChartDataSets[] = [
    {
      borderColor: "black",
      borderWidth: 1.5,
      hoverBackgroundColor: "rgba(111, 999, 241, 0.9)",
      hoverBorderWidth: 2,
      hoverBorderColor: "white",
    },
  ];
}
