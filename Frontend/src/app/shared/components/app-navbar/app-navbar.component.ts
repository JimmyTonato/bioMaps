import { Component, OnInit } from '@angular/core';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
  providers: [{ provide: TooltipConfig}]
})
export class AppNavbarComponent implements OnInit {
  public collapsed = false;
  constructor() { }

  ngOnInit() {
  }

}

