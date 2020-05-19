import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './shared/components/app-navbar/app-navbar.component';
import { MapNewsComponent } from './components/maps/map-news/map-news.component';
import { MapDiseasesComponent } from './components/maps/map-diseases/map-diseases.component';
import { MapMediaComponent } from './components/maps/map-media/map-media.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule,MatNativeDateModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    MapNewsComponent,
    MapDiseasesComponent,
    MapMediaComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
