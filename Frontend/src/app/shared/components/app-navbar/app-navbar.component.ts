import { Component, OnInit } from '@angular/core';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
  providers: [{ provide: TooltipConfig }]
})
export class AppNavbarComponent implements OnInit {
  public collapsed = false;
  constructor() { }

  ngOnInit() {
  }
  classNews = false
  classMedia = false
  classDeseases = false
  clickEvent(number) {
    switch (number) {
      case 1: {
        this.classNews = !this.classNews
        this.classMedia = false
        this.classDeseases = false
        break;
      }
      case 2: {
        this.classMedia = !this.classMedia
        this.classDeseases = false
        this.classNews = false

        break;
      }
      case 3: {
        this.classDeseases = !this.classDeseases
        this.classMedia = false
        this.classNews = false
        break;
      }
    }
  }
}

