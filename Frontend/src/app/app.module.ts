import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { MatListModule, MatSidenavModule,MatNativeDateModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule,
  MatSelectModule, MatTableModule, MatDialogModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatCardModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { ComponDialogComponent } from './components/maps/map-diseases/compon-dialog/compon-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VideoComponent } from './components/maps/map-media/video/video.component';
@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    MapNewsComponent,
    MapDiseasesComponent,
    MapMediaComponent,
    LoginComponent,
    RegisterComponent,
    ComponDialogComponent,
    VideoComponent,
   
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
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    ChartsModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatCardModule
    
  ],
  entryComponents: [
    ComponDialogComponent
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
