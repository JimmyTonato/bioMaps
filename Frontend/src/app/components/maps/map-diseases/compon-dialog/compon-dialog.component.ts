import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-compon-dialog',
  templateUrl: './compon-dialog.component.html',
  styleUrls: ['./compon-dialog.component.scss']
})
export class ComponDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public allData: any) { }

  labels = []
  data = []

  colors = { "Confirmed": "rgba(255, 99, 132,", "Deaths": "rgba(196, 99, 255,", "Recovered": "rgba(99, 153, 255," }

  /*---------------------------------------------------------------------------*/
  /*----------------------- design of the donuts graphic------------------------*/
  lineChartData: ChartDataSets[] = [{
    borderColor: 'black',
    borderWidth: 1.5,
    hoverBackgroundColor: this.colors[this.allData.type] + "0.9)",
    hoverBorderWidth: 2,
    hoverBorderColor: 'white'
  }
  ];
  lineChartLabels: Label[] = []
  lineChartOptions: ChartOptions = {
    legend: {
      display: false,
      labels: {
        fontColor: '#ffffff'
      }
    },
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)', //give the needful color
          display: true,
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#FFFFFF',
        },
        scaleLabel: {
          display: true,
          labelString: this.allData.type,
          fontColor: "#FFFFFF"
        }
      }]
      , xAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#FFFFFF',

        },
        gridLines: {
          color: '#FFFFFF', //give the needful color
          display: false,
        },
        scaleLabel: {
          display: true,
          labelString: "Countries",
          fontColor: "#FFFFFF"
        }
      }]
    }
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: this.colors[this.allData.type] + "0.6)",
    },
  ];
  lineChartLegend = true;
  lineChartType = 'bar';
  lineChartPlugins = [];

  /*------------------------------------------------------------------------------ */
  /*------------------------------------------------------------------------------- */

  ngOnInit() {
    this.datasForDonuts()
  }
  /**
   *This function is the one that aggregates all the data by selecting 
   */
  datasForDonuts() {
    let tempFilter = {}
    //Here we pick up the variable that we use to pass the data and 
    //here we put a variable in which of the classic types and thus we 
    //already have the type to make the graph only of the one

    let type = this.allData.type.toLowerCase()

    //we add up all the data only of the type and  we keep the country as a label
    this.allData.data.forEach(element => {
      if (type == 'deaths') {
        type = 'death'
      }
      if (tempFilter[element.nameCountry]) {
        tempFilter[element.nameCountry] += element[type]
      } else {
        tempFilter[element.nameCountry] = element[type]
      }
    });


    //In order to make our graphics look better, 
    //we ordered both the results and the labels

    let tmpLabel = Object.keys(tempFilter).sort(function (a, b) { return tempFilter[a] - tempFilter[b] })
    // we turn the wires into an array
    Object.keys(tmpLabel).map(function (key) { this.lineChartLabels.push(tmpLabel[key]) }.bind(this));
    //we collect the data only from the values to order 
    let tmpData = Object.values(tempFilter)
    //we pass it to an array for easy ordering
    Object.keys(tmpData).map(function (key) { this.data.push(tmpData[key]) }.bind(this));
    //save datas
    this.data = this.data.sort(function (a, b) { return a - b })
  }

}
