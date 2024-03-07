import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PagesModule } from '../pages/pages.module';


@NgModule({
  declarations: [ NavbarComponent ],
  imports: [ HttpClientModule, RouterModule ],
  exports: [ NavbarComponent ]
})
export class ComponentsModule { }
