import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
=======
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog'; 



>>>>>>> 66385db3cfa99721e4e2f8317de513e8a320be49
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
<<<<<<< HEAD
import { MatListModule, MatSidenavModule,MatNativeDateModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule,
  MatSelectModule, MatTableModule, MatDialogModule, MatTabsModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { ComponDialogComponent } from './components/maps/map-diseases/compon-dialog/compon-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
=======
import { MatSidenavModule,MatNativeDateModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule

} from '@angular/material';



>>>>>>> 66385db3cfa99721e4e2f8317de513e8a320be49
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
<<<<<<< HEAD
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
    NgxPaginationModule
    
=======
    NgxPaginationModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
>>>>>>> 66385db3cfa99721e4e2f8317de513e8a320be49
  ],
  entryComponents: [
    ComponDialogComponent
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
