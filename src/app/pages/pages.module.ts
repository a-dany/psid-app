import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { StatisticsComponent } from './statistics-page/statistics.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [HomePageComponent, StatisticsComponent],
  imports: [ ComponentsModule ],
  exports: [HomePageComponent, StatisticsComponent],

})
export class PagesModule { }
