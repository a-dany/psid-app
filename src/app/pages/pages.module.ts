import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { StatisticsComponent } from './statistics-page/statistics.component';
import { ComponentsModule } from '../components/components.module';
import { MapPageComponent } from './map-page/map-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicStatsPageComponent } from './dynamic-stats-page/dynamic-stats-page.component';



@NgModule({
  declarations: [HomePageComponent, StatisticsComponent, MapPageComponent, DynamicStatsPageComponent],
  imports: [ CommonModule, ComponentsModule, FormsModule ],
  exports: [HomePageComponent, StatisticsComponent, MapPageComponent, DynamicStatsPageComponent],

})
export class PagesModule { }
