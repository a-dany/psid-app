import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticsComponent } from './pages/statistics-page/statistics.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path:'', component: HomePageComponent },
    { path:'stats', component: StatisticsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }