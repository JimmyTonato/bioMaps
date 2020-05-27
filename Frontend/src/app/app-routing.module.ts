import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { MapNewsComponent } from './components/maps/map-news/map-news.component';
import { MapDiseasesComponent } from './components/maps/map-diseases/map-diseases.component';
import { MapMediaComponent } from './components/maps/map-media/map-media.component';
import { AppNavbarComponent } from './shared/components/app-navbar/app-navbar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: AppNavbarComponent,
    children: [{ path: 'mapNews', component: MapNewsComponent },
    { path: 'mapDiseases', component: MapDiseasesComponent },
    { path: 'mapMedia', component: MapMediaComponent }]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }