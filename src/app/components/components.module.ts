import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ NavbarComponent, StatisticsComponent ],
  imports: [ CommonModule, HttpClientModule ],
  exports: [ NavbarComponent, StatisticsComponent        
  ]
})
export class ComponentsModule { }
