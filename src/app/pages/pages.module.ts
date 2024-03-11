import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { StatisticsComponent } from './statistics-page/statistics.component';
import { ComponentsModule } from '../components/components.module';
import { MapPageComponent } from './map-page/map-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomePageComponent, StatisticsComponent, MapPageComponent],
  imports: [ ComponentsModule, FormsModule ],
  exports: [HomePageComponent, StatisticsComponent, MapPageComponent],

})
export class PagesModule { }
