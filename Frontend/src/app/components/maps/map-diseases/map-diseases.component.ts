import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from "esri-loader";
import { CountryService } from 'src/app/components/maps/map-diseases/service/country.service';
import { Country } from 'src/app/components/maps/map-diseases/model/country';
import { DataCountry } from 'src/app/components/maps/map-diseases/model/data-country';
import { DatasService } from 'src/app/components/maps/map-diseases/service/datas.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponDialogComponent } from './compon-dialog/compon-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-map-diseases',
  templateUrl: './map-diseases.component.html',
  styleUrls: ['./map-diseases.component.scss']
})
export class MapDiseasesComponent implements OnInit {
  // Used in the part of the table when we show all the information

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private dataServiceFlags: CountryService,
    private dataServiceCountries: DatasService,
    public dialog: MatDialog,
  ) { }

  //Variables needed by our pager and our table

  tmpDataSource: DataCountry[] = []
  displayedColumns: string[] = ['nameCountry', "nameProvince", "confirmed", "death", "recovered", "date"];
  dataSource: MatTableDataSource<DataCountry>;


  //variables of the different cases
  totalConfirmed: number = 0
  totalDeaths: number = 0
  totalRecovered: number = 0

  //list of all countries
  listFlags: Country[] = [];

  //array of all countries selected
  searchCountries: String[] = [];

  //initialize the map
  maps = ""

  ngOnInit() {
    this.loadFlags();
  }

  // event to collect the selective
  onNgModelChange($event) {
    this.searchCountries = $event;
  }
  /*
  This function is to click and this would make the matyoria of things that makes the web
  */
  buttonSend() {
    //Reinstatement of varibals for new applications
    this.totalConfirmed = 0
    this.totalDeaths = 0
    this.totalRecovered = 0
    this.tmpDataSource = []
    this.map()
    this.loadDataCountries()

  }
  /*
  This function is for a verification of the number since in the data there are some 
  data that are in null or none because we verified it and if it is one of those
  two values make a return of 0
  */
  verificationValueNumber(value: any) {
    if (value == null || value == "None") {
      return 0
    }
    return value
  }

  /*This function is the one that calls the service to collect all the information of 
  all selected countries */
  loadDataCountries() {
    this.dataServiceCountries.loadDatacountries(this.searchCountries).subscribe((dataCountries: any[]) => {

      dataCountries.forEach(element => {
        let province = element['Province/State']

        let date = new Date(element["Date"])

        let confirmed = this.verificationValueNumber(element["Confirmed"])
        let deaths = this.verificationValueNumber(element['Deaths'])
        let recovered = this.verificationValueNumber(element["Recovered"])


        this.totalConfirmed = this.totalConfirmed + confirmed
        this.totalDeaths = this.totalDeaths + deaths
        this.totalRecovered = this.totalRecovered + recovered

        //There are some countries that do not have their city and they are equal to an unknown
        if (province == null || province == "None") {
          province = "Unknown"
        }
        let dataCountry = new DataCountry(element['id'], element["Country/Region"], province, date, confirmed, deaths, recovered)
        this.tmpDataSource.push(dataCountry)
      })
      // This is the part of the table and let's match the necessary parameters
      this.dataSource = new MatTableDataSource(this.tmpDataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.graficadonus()
      this.convertInformationForGrafic()
      this.createInformationForCountry()

    })

  }

  /*
  This is where we call the flag service so we can 
  make the choice 
   */
  loadFlags() {
    this.dataServiceFlags.allFlags().subscribe((listFlag: any[]) => {
      listFlag.forEach(element => {
        let flag = new Country(element['id'], element["Country/Region"], element["imgCount"])
        this.listFlags.push(flag)
      });
      this.listFlags = this.listFlags.sort((a, b) => (a.$name > b.$name) ? 1 : -1)
      this.map()
    })

  }

  //------------------------------------------------------------------------------------------------------
  //--------------------------------START OF THE MAP ------------------------------------------------------
  /*Configuration to create the map 
  This map uses a csv file to do the analysis so you should have 
  in the backend a section where with all the selected list we pass a csv of the data of 
  only from the list*/
  async map() {
    let [Map, MapView, CSVLayer, WebMap] = await loadModules(["esri/Map", "esri/views/MapView", "esri/layers/CSVLayer", "esri/WebMap"]);

    let url = "http://127.0.0.1:5000/mapDiseades/covid-19/csvdataMap?countries=" + this.searchCountries;
    let csvLayer = new CSVLayer({
      title: "Hurricanes",
      url: url,
      copyright: "NOAA",
      popupTemplate: {
        title: "{Country/Region}",
        content: [{
          type: "text",
          text: "This information is from the date: : {Date}"
        }, {
          type: "fields",
          fieldInfos: [{
            fieldName: "Confirmed",
            label: "Cases Confirmed: "
          }]
        },
        {
          type: "fields",
          fieldInfos: [{
            fieldName: "Deaths",
            label: "Cases Deaths:"
          }]
        },
        {
          type: "fields",
          fieldInfos: [{
            fieldName: "Recovered",
            label: "Cases Recovered: "
          }]
        }]
      },
      renderer: {
        type: "simple",
        field: "All",
        symbol: {
          type: "simple-marker",
          size: 3.5,
          color: "#fc3232",
          outline: {
            color: [50, 50, 50]
          }
        },
        value: 'yes'
      }
    });

    this.maps = new WebMap({
      basemap: 'streets-night-vector',
      layers: [csvLayer]
    });
    let view = new MapView({
      container: "mapa",
      map: this.maps,
      zoom: 1,
      highlightOptions: {
        fillOpacity: 0,
        color: [50, 50, 50]
      },
      constraints: {
        maxScale: 35000
      }
    });
  }
  /*-------------------------------END OF MAP----------------------------------- */
  /*----------------------------------------------------------------------------------------------------- */


  /*----------------------------------------------------------------------------------------------------- */
  /*------------------------------START OF THE DOUGHNUT CHART --------------------*/
  doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw(chart) {
      const ctx = chart.ctx;
      var txt1 = 'You Can Click Me';

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

      ctx.fillStyle = 'white';
      // Draw text in center
      ctx.font = 6 + 'vw';
      ctx.fillText(txt1, centerX, centerY + 10);
    }
  }];
  //Variables with the doughnut data
  doughnutChartData: MultiDataSet = [];
  doughnutChartLabels: Label[] = ['Confirmed', 'Deaths', 'Recovered'];
  doughnutChartType: ChartType = 'doughnut';
  lineChartColors: Color[] = [{
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(196, 99, 255, 0.8)',
      'rgba(99, 153, 255, 0.8)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(196, 99, 255, 1)',
      'rgba(99, 153, 255, 1)'
    ],
    borderWidth: 1
  },
  ];

  lineChartOptions = {
    //Charts.js has a pickup functionality to pick up your event
    // what we do is pick up the event so we can then pass it on to the popup that typo 
    //selection and to show us information of only that type
    onClick: function (e, chart) {
      if (chart.length != 0) {
        let idxLabel = chart[0]._index
        this.openPopup(idxLabel);
      }
    }.bind(this),
    responsive: true,
    cutoutPercentage: 50,
    legend: {
      display: true,
      fullWidth: false,
      labels: {
        fontSize: 13,
        fontColor: '#FFFFFF',
      }
    },
  };
  /*We use this function is to update the graph when there are more selected */
  graficadonus() {
    this.doughnutChartData = [[this.totalConfirmed, this.totalDeaths, this.totalRecovered]]
  }

  /*function where we open the popum and send you all the information both the 
  type as all country information */
  openPopup(idxLabel: number) {

    setTimeout(() => this.dialog.open(ComponDialogComponent, {
      maxWidth: '150vh',
      maxHeight: '100vh',
      data: { type: this.doughnutChartLabels[idxLabel], data: this.tmpDataSource }
    }))
  }

  /*--------------------END OF GRAPHICS DONUTS AND THEIR CONFIGURATIONS--------------------------------
  --------------------------------------------------------------------------------------------*/




  /*------------------------------START OF THE GLOBAL CHART--------------------------------
  --------------------------------------------------------------------------------------------*/

  chartType: string = 'line';

  chartData = [{
    data: [0],
    label: 'Confirmed',
    fill: false,
    borderColor: 'rgba(255, 99, 132, 0.8)',
    backgroundColor: 'transparent',
    pointBorderColor: 'orange',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 3,
    pointStyle: 'star'
  },
  {
    data: [0],
    label: 'Deaths',
    fill: false,
    borderColor: 'rgba(196, 99, 255, 0.8)',
    backgroundColor: 'transparent',
    pointBorderColor: 'orange',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 3,
    pointStyle: 'star'
  },
  {
    data: [0],
    label: 'Recovered',
    fill: false,
    borderColor: 'rgba(99, 153, 255, 0.8)',
    backgroundColor: 'transparent',
    pointBorderColor: 'orange',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 3,
    pointStyle: 'star'
  }
  ];
  chartLabels = [];

  chartOptions = {
    legend: {
      display: true,
      labels: {
        boxWidth: 80,
        fontColor: 'white'
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
          borderDash: [2, 5],
        },
        scaleLabel: {
          display: true,
          labelString: "Dates",
          fontColor: "#FFFFFF"
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#FFFFFF',
        },
        type: "time",
        time: {
          unit: 'day',
          unitStepSize: 10,
          round: 'day',
          tooltipFormat: "MMM D",
          displayFormats: {
            day: 'MMM DD'
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#FFFFFF',
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0.4)",
          borderDash: [2, 5],
        },
        scaleLabel: {
          display: true,
          labelString: "Persons",
          fontColor: "#FFFFFF"
        }
      }]
    }


  }

  /*
  We do all the management to be able to create the data and put them in the graph
  */
  convertInformationForGrafic() {
    //What we're going to do here is add up each case every 10 dates because if not, the jinx
    //It would be too long and visually bad

    let labelDate = []
    let listConfirmed = []
    let listDeaths = []
    let listRecovered = []
    let confirmed = 0
    let deaths = 0
    let recovered = 0
    let tmp = 0

    // we call the service where it returns to us all the countries grouped by dates and added up each
    // one of your data
    this.dataServiceCountries.datasByGraficAll(this.searchCountries).subscribe((listResult: any[]) => {
      listResult.forEach(function (values, index) {

        confirmed += values.confirmed
        deaths += values.deaths
        recovered += values.recovered
        // here by default we must always take the first and last date as mandatory
        if (tmp < 10 && (index == 1 || index == (listResult.length - 1))) {
          labelDate.push(values.date)
          listConfirmed.push(confirmed)
          listDeaths.push(deaths)
          listRecovered.push(recovered)
        }
        if (tmp == 10) {
          labelDate.push(values.date)
          listConfirmed.push(confirmed)
          listDeaths.push(deaths)
          listRecovered.push(recovered)

          tmp = 0
        }
        tmp += 1
      });
      //We fill in the data on the chart
      this.chartLabels = labelDate
      this.chartData[0]['data'] = listConfirmed
      this.chartData[1]['data'] = listDeaths
      this.chartData[2]['data'] = listRecovered

    })

  }

  //----------------------------------------------------------------------------------------------------
  //-------------------------------END OF GLOBAL GRAPHIC-----------------------------------------




  //----------------------------------------------------------------------------------------------------
  //------------------------------START OF INDIVIDUAL CHART -----------------------------------------
  chartType2: string = 'line';

  chartOptions2 = {
    legend: {
      display: true,
      labels: {
        boxWidth: 40,
        fontColor: 'white'
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
          borderDash: [2, 5],
        },
        scaleLabel: {
          display: true,
          labelString: "Dates",
          fontColor: "#FFFFFF"
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#FFFFFF',
          fontSize: 10
        },
        type: "time",
        time: {
          unit: 'day',
          unitStepSize: 8,
          round: 'day',
          tooltipFormat: "MMM D",
          displayFormats: {
            day: 'MMM DD'
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#FFFFFF',
          fontSize: 10
        },
        gridLines: {
          color: "rgba(255, 255, 255, 0.4)",
          borderDash: [2, 5],
        },
        scaleLabel: {
          display: true,
          labelString: "Persons",
          fontColor: "#FFFFFF"
        }
      }]
    }


  }
  //varibale where we are going to save the data and its graphical configuration of each
  // one of your countries
  countriesComplete = []

  createInformationForCountry() {

    this.countriesComplete = []
    this.listFlags.forEach(element => {
      if (this.searchCountries.includes(element.$name)) {

        let labelDate = []
        let listConfirmed = []
        let listDeaths = []
        let listRecovered = []
        let confirmed = 0
        let deaths = 0
        let recovered = 0
        let tmp = 0
        let tmpDesing = {}
        // we call the service that groups us by date and the only thing we will pass on to you is 
        // one of the selected countries
        this.dataServiceCountries.datasByGraficAll(element.$name).subscribe((listResult: any[]) => {
          listResult.forEach(function (values, index) {
            confirmed += values.confirmed
            deaths += values.deaths
            recovered += values.recovered

            if (tmp < 10 && (index == 1 || index == (listResult.length - 1))) {
              labelDate.push(values.date)
              listConfirmed.push(confirmed)
              listDeaths.push(deaths)
              listRecovered.push(recovered)
            }
            if (tmp == 10) {
              labelDate.push(values.date)
              listConfirmed.push(confirmed)
              listDeaths.push(deaths)
              listRecovered.push(recovered)

              tmp = 0
            }
            tmp += 1
          });
          //recreate the object with all the country information
          tmpDesing = { title: element, label: labelDate, dataChart: this.modelChartData(listConfirmed, listDeaths, listRecovered) }

          this.countriesComplete.push(tmpDesing)

        })
      }
    });

  }

  /*
  What this function does is to recreate the design of each of the graphics of each country
  and then you can go through them.
  */
  modelChartData(listConfirmed: number[], listDeaths: number[], listRecovered: number[]) {
    return [{
      data: listConfirmed,
      label: 'Confirmed',
      fill: false,
      borderColor: 'rgba(255, 99, 132, 0.8)',
      backgroundColor: 'transparent',
      pointBorderColor: 'orange',
      pointRadius: 3,
      pointHoverRadius: 5,
      pointHitRadius: 15,
      pointBorderWidth: 1.5,
      pointStyle: 'star'
    },
    {
      data: listDeaths,
      label: 'Deaths',
      fill: false,
      borderColor: 'rgba(196, 99, 255, 0.8)',
      backgroundColor: 'transparent',
      pointBorderColor: 'orange',
      pointRadius: 3,
      pointHoverRadius: 5,
      pointHitRadius: 15,
      pointBorderWidth: 1.5,
      pointStyle: 'star'
    },
    {
      data: listRecovered,
      label: 'Recovered',
      fill: false,
      borderColor: 'rgba(99, 153, 255, 0.8)',
      backgroundColor: 'transparent',
      pointBorderColor: 'orange',
      pointRadius: 3,
      pointHoverRadius: 5,
      pointHitRadius: 15,
      pointBorderWidth: 1.5,
      pointStyle: 'star'
    }
    ];

  }

  //----------------------------------------------------------------------------------------------------
  //-------------------------------END OF INDIVIDUAL CHART -----------------------------------------

}

