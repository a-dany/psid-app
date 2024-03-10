import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticsComponent } from './pages/statistics-page/statistics.component';
import { NgModule } from '@angular/core';
import { MapPageComponent } from './pages/map-page/map-page.component';

export const routes: Routes = [
    { path:'', component: HomePageComponent },
    { path:'stats', component: StatisticsComponent },
    { path:'map', component: MapPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }