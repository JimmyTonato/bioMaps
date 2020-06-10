import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppNavbarComponent } from "./shared/app-navbar/app-navbar.component";
import { MapNewsComponent } from "./components/maps/map-news/map-news.component";
import { MapDiseasesComponent } from "./components/maps/map-diseases/map-diseases.component";
import { MapMediaComponent } from "./components/maps/map-media/map-media.component";
import { LoginComponent } from "./components/user/login/login.component";
import { RegisterComponent } from "./components/user/register/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";
import { ComponDialogComponent } from "./components/maps/map-diseases/compon-dialog/compon-dialog.component";
import { NgxPaginationModule } from "ngx-pagination";
import { VideoComponent } from "./components/maps/map-media/video/video.component";
import { DataComponent } from './components/maps/map-media/data/data.component';
// Angular material
import {
  MatListModule,
  MatSidenavModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatDialogModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatTooltipModule,
} from "@angular/material";
import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { NgxSpinnerModule } from "ngx-spinner";
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
    DataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    //Angular Material
    MatTooltipModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    PortalModule,
    ScrollingModule,
  ],
  entryComponents: [VideoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
