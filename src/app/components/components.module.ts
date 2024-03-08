import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [ NavbarComponent, MapComponent ],
  imports: [ HttpClientModule, RouterModule ],
  exports: [ NavbarComponent , MapComponent ]
})
export class ComponentsModule { }
